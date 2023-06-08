import { Avatar } from "@components";
import { useStores } from "@models";
import { ApiFetchPhotosResponse } from "@services/api/module/photo.types";
import { horizontalScale, verticalScale } from "@utils/metrics";
import React, { useState } from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import ImageView from "react-native-image-viewing";
import { ImageSource } from "react-native-image-viewing/dist/@types";

export const useImageViewer = () => {
    const [imageViewerList, setImageViewerList] = useState<ImageSource[]>([]);
    const [imageViewerVisible, setImageViewerVisible] = useState<boolean>(false);
    const [imageDetail, setImageDetail] = useState<ApiFetchPhotosResponse>()
    const [isSaved, setSaved] = useState<boolean>(false)
    const { userStore: {
        savedList,
        setSavedList
    } } = useStores()

    const saving = () => {
        setSavedList(imageDetail.id)
        setSaved(!isSaved)
    }

    const ImageViewer = () => {
        return (
            <ImageView
                images={imageViewerList}
                imageIndex={0}
                visible={imageViewerVisible}
                animationType="fade"
                onRequestClose={() => setImageViewerVisible(false)}
                FooterComponent={
                    () => {
                        return (
                            <View style={{ height: verticalScale(120), padding: 10, }}>
                                <View style={{ flexDirection: "row", alignItems: "center" }}>
                                    <Avatar
                                        maxWidth={50}
                                        maxHeight={50}
                                        source={{ uri: imageDetail?.user?.profile_image?.small }}
                                    />
                                    <Text numberOfLines={1} style={{ fontSize: 18, fontWeight: "500", color: "white", marginLeft: 10 }}>
                                        {imageDetail?.user?.name}
                                    </Text>

                                    <TouchableOpacity onPress={() => saving()} activeOpacity={0.8}>
                                        <Image
                                            style={{
                                                width: 30,
                                                height: 35,
                                                marginLeft: horizontalScale(30),
                                                tintColor: "white"
                                            }}
                                            source={savedList?.length > 0 && savedList.find((item) => item === imageDetail?.id) ? require("./../../../assets/icons/bookmark.png") : require("./../../../assets/icons/bookmark_border.png")}
                                        />
                                    </TouchableOpacity>
                                </View>
                                <Text numberOfLines={2} style={{ fontSize: 14, color: "white" }}>
                                    {
                                        imageDetail?.description
                                    }
                                </Text>
                            </View>
                        )
                    }
                }
            />
        )
    }

    return {
        ImageViewer,
        setImageViewerList,
        setImageViewerVisible,
        setImageDetail
    }

}