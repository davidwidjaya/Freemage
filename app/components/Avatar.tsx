import { ImageWrapper } from "@components"
import { colors } from "@theme"
import React from "react"
import { StyleProp, View, ViewStyle } from "react-native"
import { ImageStyle as FastImageStyle, Source } from "react-native-fast-image"

export interface AvatarProps {
  /**
   * Maximum image width
   */
  maxWidth?: number
  /**
   * Maximum image height
   */
  maxHeight?: number
  /**
   * Image source
   */
  source: number | Source
  /**
   * An optional style override useful for padding & margin.
   */
  style?: StyleProp<ViewStyle>
}

/**
 * Describe your component here
 */
export const Avatar = (props: AvatarProps) => {
  const {
    maxWidth = 100,
    maxHeight = 100,
    source,
  } = props

  const $styles = [
    $baseContainer,
    {
      width: maxWidth,
      height: maxHeight,
      borderRadius: maxWidth / 2,
    },
  ];


  const $image: FastImageStyle = {
    aspectRatio: 1,
    minHeight: maxHeight - (0.0536 * maxHeight),
    height: maxHeight - (0.0536 * maxHeight),
    width: maxWidth - (0.0536 * maxWidth),
    borderRadius: maxWidth / 2,
  }

  return (
    <View style={$styles}>
        <ImageWrapper
          source={source}
          style={[$image]}
        />
    </View>
  )
}

const $baseContainer: ViewStyle = {
  borderWidth: 2,
  borderColor: colors.transparent,
  position: "relative",
  justifyContent: "center",
  alignItems: "center",
}