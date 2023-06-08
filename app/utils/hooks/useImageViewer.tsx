import React, { useState } from "react"
import ImageView from "react-native-image-viewing"
import { ImageSource } from "react-native-image-viewing/dist/@types"

export const useImageViewer = () => {
    const [imageViewerList, setImageViewerList] = useState<ImageSource[]>([]);
    const [imageViewerVisible, setImageViewerVisible] = useState<boolean>(false);

    const ImageViewer = () => {
        return (
            <ImageView
                images={imageViewerList}
                imageIndex={0}
                visible={imageViewerVisible}
                onRequestClose={() => setImageViewerVisible(false)}
            />
        )
    }

    return {
        ImageViewer,
        setImageViewerList, 
        setImageViewerVisible
    }

}