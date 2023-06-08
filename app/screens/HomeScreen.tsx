import { ImageWrapper, Screen } from "@components";
import { AppStackScreenProps } from "@navigators";
import { api } from "@services/api";
import { ApiFetchPhotosResponse } from "@services/api/module/photo.types";
import { FlashList, ListRenderItem } from "@shopify/flash-list";
import { colors } from "@theme";
import { useImageViewer } from "@utils/hooks";
import { deviceHeight, horizontalScale, verticalScale } from "@utils/metrics";
import { observer } from "mobx-react-lite";
import React, { FC, useEffect, useState } from "react";
import { ActivityIndicator, RefreshControl, TextInput, TouchableOpacity, View } from "react-native";
import FastImage from "react-native-fast-image";
import { ImageSource } from "react-native-image-viewing/dist/@types";

interface SearchPhotosParams {
  query: string
  page?: number
  per_page?: number
  order_by?: string
}

export const HomeScreen: FC<AppStackScreenProps<'Home'>> = observer(function HomeScreen(props) {
  const [photoList, setPhotoList] = useState<ApiFetchPhotosResponse[]>([])
  const [isLoading, setLoading] = useState<boolean>(false)
  const { ImageViewer, setImageViewerList, setImageViewerVisible } = useImageViewer();
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    _fetchPhotos()
  }, [])

  const onRefresh = () => {
    _fetchPhotos()
  }

  const _searchPhotos = async ({ query, order_by, page, per_page }: SearchPhotosParams) => {
    setLoading(true)
    const res = await api.photo.searchPhotos({
      query: query,
      page: page,
      order_by: order_by,
      per_page: per_page
    })

    if (res.kind === "ok") {
      setPhotoList(res.data as ApiFetchPhotosResponse[])
      // console.log('success: ', res.data)
      setLoading(false)

    } else {
      // console.log("failed: ", res.message)
      setLoading(false)
    }
  }

  const _fetchPhotos = async () => {
    setLoading(true)
    const res = await api.photo.fetchPhotos({})

    if (res.kind === "ok") {
      setPhotoList(res.data as ApiFetchPhotosResponse[])
      // console.log('success: ', res.data)
      setLoading(false)

    } else {
      // console.log("failed: ", res.message)
      setLoading(false)
    }
  }

  const onPressImage = (imgSource: ImageSource) => {
    setImageViewerList([imgSource]);
    setImageViewerVisible(true);
  }

  const renderItem: ListRenderItem<ApiFetchPhotosResponse> = ({ item, index }) => {
    return (

      <TouchableOpacity onPress={() => onPressImage({ uri: item?.urls?.full })} activeOpacity={0.7} style={{ width: horizontalScale(110), height: verticalScale(110), marginTop: 5 }}>
        <ImageWrapper
          source={{ uri: item?.urls?.full, priority: FastImage.priority.normal }}
          style={{ flex: 1 }}
          resizeMode={FastImage.resizeMode.cover}
        />
      </TouchableOpacity>
    )
  }

  return (
    <Screen
      preset="auto"
      safeAreaEdges={["top", "bottom"]}
      backgroundColor={"white"}
    >
      <View style={{ height: deviceHeight }}>
        <FlashList<ApiFetchPhotosResponse>
          numColumns={3}
          data={photoList}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
            />
          }
          onEndReachedThreshold={0.0001}
          onEndReached={() => console.log("on end reached")}
          showsVerticalScrollIndicator={false}
          ListHeaderComponent={
            <TextInput
              placeholder={"Search your images"}
              placeholderTextColor={colors.palette.neutral500}
              // secureTextEntry={isSecureTextEntry}
              // editable={!disabled}
              style={{
                flex: 1,
                backgroundColor: "#efefef",
                borderRadius: 7,
                paddingHorizontal: 20,
                marginBottom: 10
              }}
              onChangeText={(text) => _searchPhotos({ query: text })}>
            </TextInput>
          }
          ListEmptyComponent={isLoading && <ActivityIndicator size={50} color={"red"} />}
          renderItem={renderItem}
          estimatedItemSize={288}
        />

      </View>
      <ImageViewer />

    </Screen>
  )
})