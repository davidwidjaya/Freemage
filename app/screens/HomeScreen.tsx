import { ImageWrapper, Screen } from "@components";
import { AppStackScreenProps } from "@navigators";
import { api } from "@services/api";
import { ApiFetchPhotosResponse } from "@services/api/module/photo.types";
import { FlashList, ListRenderItem } from "@shopify/flash-list";
import { colors } from "@theme";
import { useDebounce, useImageViewer } from "@utils/hooks";
import { deviceHeight, horizontalScale, verticalScale } from "@utils/metrics";
import { observer } from "mobx-react-lite";
import React, { FC, useEffect, useState } from "react";
import { ActivityIndicator, RefreshControl, TextInput, ToastAndroid, TouchableOpacity, View } from "react-native";
import FastImage from "react-native-fast-image";

interface SearchPhotosParams {
  query: string
  page?: number
  per_page?: number
  order_by?: string
}

export const HomeScreen: FC<AppStackScreenProps<'Home'>> = observer(function HomeScreen(props) {
  const [photoList, setPhotoList] = useState<ApiFetchPhotosResponse[]>([])
  const [isLoading, setLoading] = useState<boolean>(false)
  const { ImageViewer, setImageViewerList, setImageViewerVisible, setImageDetail } = useImageViewer();
  const [refreshing, setRefreshing] = useState(false);
  const [search, setSearch] = useState<string>("")
  const debouncedSearchTerm: string = useDebounce<string>(search, 500)
  const [page, setPage] = useState<number>(1)
  const [modalVisible, setModalVisible] = useState<boolean>(false)

  useEffect(() => {
    _fetchPhotos()
  }, [])

  useEffect(() => {
    onSearch(debouncedSearchTerm)
  }, [debouncedSearchTerm])

  const showToast = (text: string) => {
    ToastAndroid.showWithGravity(
      text,
      ToastAndroid.SHORT,
      ToastAndroid.CENTER,
    );
  };

  const onRefresh = () => {
    _fetchPhotos()
  }

  const onSearch = (query: string) => {
    setSearch(query)
    if (query !== "") {
      _searchPhotos({ query: query, page: 1 })
    } else {
      _fetchPhotos()
    }
  }

  const onEndReached = () => {
    if (search !== "") {
      _searchPhotos({ query: search, page: page + 1 })
    } else {
      _fetchPhotos(page + 1)
    }
  }

  const _searchPhotos = async ({ query, order_by = "relevant", page = 1, per_page = 20 }: SearchPhotosParams) => {
    setLoading(true)
    const res = await api.photo.searchPhotos({
      query: query,
      page: page,
      order_by: order_by,
      per_page: per_page
    })

    if (res.kind === "ok") {
      setPage(page)

      if (page > 1) {
        setPhotoList([...photoList, ...res.data.results as ApiFetchPhotosResponse[]])
      } else {
        setPhotoList(res.data.results as ApiFetchPhotosResponse[])
      }
      setLoading(false)
      showToast("Success")
    } else {
      setLoading(false)
      showToast(res.message[0])
    }
  }

  const _fetchPhotos = async (page: number = 1) => {
    setLoading(true)
    const res = await api.photo.fetchPhotos({ per_page: 20, page: page })

    if (res.kind === "ok") {
      setPage(page)
      if (page > 1) {
        setPhotoList([...photoList, ...res.data as ApiFetchPhotosResponse[]])
      } else {
        setPhotoList(res.data as ApiFetchPhotosResponse[])
      }
      setLoading(false)

    } else {
      setLoading(false)
      showToast(res.message[0])
    }
  }

  const onPressImage = (item: ApiFetchPhotosResponse) => {
    const source = { uri: item?.urls?.regular }
    setImageViewerList([source]);
    setImageDetail(item)
    setImageViewerVisible(true);
  }

  const renderItem: ListRenderItem<ApiFetchPhotosResponse> = ({ item, index }) => {
    return (

      <TouchableOpacity onPress={() => onPressImage(item)} activeOpacity={0.7} style={{ width: horizontalScale(110), height: verticalScale(110), marginTop: 5 }}>
        <ImageWrapper
          source={{ uri: item?.urls?.thumb, priority: FastImage.priority.normal }}
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
      <View style={{ height: deviceHeight - 20 }}>
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
          onEndReached={onEndReached}
          showsVerticalScrollIndicator={false}
          ListHeaderComponent={
            <TextInput
              placeholder={"Search your images"}
              placeholderTextColor={colors.palette.neutral500}
              style={{
                flex: 1,
                backgroundColor: "#efefef",
                borderRadius: 7,
                paddingHorizontal: 20,
                marginBottom: 10
              }}
              onChangeText={(text) => setSearch(text)}>
            </TextInput>
          }
          ListFooterComponent={isLoading && <ActivityIndicator size={50} color={"red"} />}
          renderItem={renderItem}
          estimatedItemSize={288}
        />

      </View>
      <ImageViewer />



    </Screen>
  )
})