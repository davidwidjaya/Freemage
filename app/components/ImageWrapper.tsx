import { imageRegistry } from "app/theme/images"
import React, { useEffect, useState } from "react"
import { Image, ImageSourcePropType } from "react-native"
import FastImage, { FastImageProps, Source } from "react-native-fast-image"

export interface ImageWrapperProps extends FastImageProps { }

/**
 * Image component wrapper
 */
export const ImageWrapper = (imageWrapperProps: ImageWrapperProps) => {
  const {
    defaultSource = imageRegistry.default_img,
    source,
    ...props
  } = imageWrapperProps

  const [imgSource, setImgSource] = useState<number | Source>(imageRegistry.default_img);
  const resolvedSource = Image.resolveAssetSource(source as ImageSourcePropType);

  useEffect(() => {
    if (!!resolvedSource.uri) {
      setImgSource(source);
    } else {
      setImgSource(defaultSource);
    }
  }, [source])

  return (
    <FastImage
      defaultSource={defaultSource}
      source={imgSource}
      onError={() => setImgSource(defaultSource)}
      {...props}
    />
  )
}