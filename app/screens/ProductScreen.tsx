import React, { FC, useEffect, useState } from "react"
import { observer } from "mobx-react-lite"
import { ActivityIndicator, FlatList, ImageStyle, TextStyle, Image, View, ViewStyle, TouchableOpacity } from "react-native"
import { DemoTabScreenProps } from "@navigators"
import { Card, EmptyState, Screen, Text } from "@components"
import { useNavigation } from "@react-navigation/native"
import { useStores } from "@models"
import { colors, spacing } from "@theme"
import { isRTL } from "@i18n"
import { Product } from "@models/product/Product"
import { delay } from "@utils/delay"
import Helper from "@utils/helper"
import { useImageViewer } from "@utils/hooks"
import { ImageSource } from "react-native-image-viewing/dist/@types"
interface ProductCardProps extends Product {
  onPressImage?: (imgSource: ImageSource) => void
}

export const ProductScreen = observer(function ProductScreen(
  _props: DemoTabScreenProps<"DemoProductList">
) {
  // Pull in one of our MST stores
  const { productStore } = useStores();

  //use image viewer
  const { ImageViewer, setImageViewerList, setImageViewerVisible } = useImageViewer();

  //state
  const [refreshing, setRefreshing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Pull in navigation via hook
  const navigation = useNavigation();

  useEffect(() => {
    ; (async function load() {
      setIsLoading(true)
      await productStore.fetchProducts(1)
      setIsLoading(false)
    })()
  }, [productStore])

  // simulate a longer refresh, if the refresh is too fast for UX
  async function manualRefresh() {
    setRefreshing(true);
    await Promise.all([productStore.fetchProducts(1), delay(750)]);
    setRefreshing(false);
  }

  const onPressImage = (imgSource: ImageSource) => {
    setImageViewerList([imgSource]);
    setImageViewerVisible(true);
  }

  return (
    <Screen style={$screenContentContainer} preset="fixed" safeAreaEdges={["top"]}>
      <ImageViewer />

      <FlatList<Product>
        data={productStore.products}
        // data={[]}
        contentContainerStyle={$flatListContentContainer}
        refreshing={refreshing}
        onRefresh={manualRefresh}
        ListEmptyComponent={
          isLoading ? (
            <ActivityIndicator />
          ) : (
            <EmptyState
              preset="generic"
              style={$emptyState}
              headingTx={"demoProductListScreen.emptyState.heading"}
              contentTx={"demoProductListScreen.emptyState.content"}
              button={null}
              buttonOnPress={manualRefresh}
              imageStyle={$emptyStateImage}
              ImageProps={{ resizeMode: "contain" }}
            />
          )
        }
        ListHeaderComponent={
          <View style={$heading}>
            <Text preset="heading" tx="demoProductListScreen.title" />
          </View>
        }
        renderItem={({ item }) => (
          <ProductCard
            {...item}
            onPressImage={onPressImage}
          />
        )}
      />
    </Screen>
  )
})

const ProductCard = observer(function ProductCard({
  name_product,
  image_main_product,
  desc_product,
  onPressImage
}: ProductCardProps) {

  const imgProduct = "https://api.vanverglobal.com/storage/image_product/VVPR0222441028/image_main/image-0NPOt.jpg";

  const handlePressCard = () => {

  }

  return (
    <Card
      style={$item}
      verticalAlignment="force-footer-bottom"
      onPress={handlePressCard}
      HeadingComponent={
        <View style={$metadata}>
          <Text
            weight="semiBold"
            style={$metadataText}
            size="sm"
          >
            {name_product}
          </Text>
        </View>
      }
      content={Helper.limitString(desc_product, 30)}
      RightComponent={
        <TouchableOpacity onPress={() => {
          if (onPressImage) {
            onPressImage({uri: imgProduct})
          }
        }}>
          <Image source={{ uri: imgProduct }} style={$itemThumbnail} />
        </TouchableOpacity>
      }
    />
  )
})

//styles
const ICON_SIZE = 14;

const $screenContentContainer: ViewStyle = {
  flex: 1,
}

const $flatListContentContainer: ViewStyle = {
  paddingHorizontal: spacing.large,
  paddingTop: spacing.large + spacing.extraLarge,
  paddingBottom: spacing.large,
}

const $heading: ViewStyle = {
  marginBottom: spacing.medium,
}

const $item: ViewStyle = {
  padding: spacing.medium,
  marginTop: spacing.medium,
  minHeight: 120,
}

const $itemThumbnail: ImageStyle = {
  marginTop: spacing.small,
  borderRadius: 50,
  alignSelf: "flex-start",
  width: 100,
  height: 100
}

const $metadata: TextStyle = {
  color: colors.textDim,
  marginTop: spacing.extraSmall,
  flexDirection: "row",
}

const $metadataText: TextStyle = {
  color: colors.textDim,
  marginRight: spacing.medium,
  marginBottom: spacing.extraSmall,
}

const $unFavoriteButton: ViewStyle = {
  borderColor: colors.palette.primary100,
  backgroundColor: colors.palette.primary100,
}

const $emptyState: ViewStyle = {
  marginTop: spacing.huge,
}

const $emptyStateImage: ImageStyle = {
  transform: [{ scaleX: isRTL ? -1 : 1 }],
}
