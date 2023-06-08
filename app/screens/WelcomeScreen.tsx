import { Screen } from "@components";
import { AppStackScreenProps } from "@navigators"; // @demo remove-current-line
import { api } from "@services/api";
import { observer } from "mobx-react-lite";
import React from "react";
import { Text, TouchableOpacity } from "react-native";
interface WelcomeScreenProps extends AppStackScreenProps<"Welcome"> { } // @demo remove-current-line

export const WelcomeScreen = observer(function WelcomeScreen(
  props: WelcomeScreenProps, // @demo remove-current-line
) {

  const _fetchPhotos = async () => {
    const res = await api.photo.fetchPhotos({})

    if (res.kind === "ok") {
      console.log(res)
    } else {
      console.log("FAILED")
      console.log(res)
    }
  }

  return (
    <Screen
      preset="auto"
      safeAreaEdges={["top", "bottom"]}
    // backgroundColor={}
    >
      <TouchableOpacity onPress={() => _fetchPhotos()}>
        <Text style={{ fontSize: 25, color: "red" }} >Get Data</Text>
      </TouchableOpacity>
    </Screen>
  )
})