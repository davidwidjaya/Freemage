import React, { useEffect, useState } from "react"
import * as Application from "expo-application"
import { Linking, Platform, TextStyle, View, ViewStyle } from "react-native"
import { Button, ListItem, Screen, Text, Toggle, ToggleProps } from "@components"
import { DemoTabScreenProps } from "@navigators"
import { colors, spacing } from "@theme"
import { isRTL } from "@i18n"
import { loadString, saveString } from "@utils/storage"
import RNRestart from "react-native-restart"

function openLinkInBrowser(url: string) {
  Linking.canOpenURL(url).then((canOpen) => canOpen && Linking.openURL(url))
}

function ControlledToggle(props: ToggleProps) {
  const [value, setValue] = React.useState(props.value || false)
  return <Toggle {...props} value={value} onPress={() => setValue(!value)} />
}

export function DemoDebugScreen(_props: DemoTabScreenProps<"DemoDebug">) {
  const usingHermes = typeof HermesInternal === "object" && HermesInternal !== null;
  const [selectedLang, setSelectedLang] = useState<string>("en");

  useEffect(() => {
    loadString("SETTING_LANGUAGE").then(lang => setSelectedLang(lang || "en"));
  }, []);

  const _saveSettings = () => {
    saveString("SETTING_LANGUAGE", selectedLang);
    setTimeout(() => {
      RNRestart.Restart();
    }, 500);
  }

  const demoReactotron = React.useMemo(
    () => async () => {
      console.tron.display({
        name: "DISPLAY",
        value: {
          appId: Application.applicationId,
          appName: Application.applicationName,
          appVersion: Application.nativeApplicationVersion,
          appBuildVersion: Application.nativeBuildVersion,
          hermesEnabled: usingHermes,
        },
        important: true,
      })
    },
    [],
  )

  return (
    <Screen preset="scroll" safeAreaEdges={["top"]} contentContainerStyle={$container}>
      <Text
        style={$reportBugsLink}
        tx="demoDebugScreen.reportBugs"
        onPress={() => openLinkInBrowser("https://github.com/infinitered/ignite/issues")}
      />
      <Text style={$title} preset="heading" tx="demoDebugScreen.title" />
      <View style={$itemsContainer}>
        <ListItem
          LeftComponent={
            <View style={$item}>
              <Text preset="bold">App Id</Text>
              <Text>{Application.applicationId}</Text>
            </View>
          }
        />
        <ListItem
          LeftComponent={
            <View style={$item}>
              <Text preset="bold">App Name</Text>
              <Text>{Application.applicationName}</Text>
            </View>
          }
        />
        <ListItem
          LeftComponent={
            <View style={$item}>
              <Text preset="bold">App Version</Text>
              <Text>{Application.nativeApplicationVersion}</Text>
            </View>
          }
        />
        <ListItem
          LeftComponent={
            <View style={$item}>
              <Text preset="bold">App Build Version</Text>
              <Text>{Application.nativeBuildVersion}</Text>
            </View>
          }
        />
        <ListItem
          LeftComponent={
            <View style={$item}>
              <Text preset="bold">Hermes Enabled</Text>
              <Text>{String(usingHermes)}</Text>
            </View>
          }
        />
      </View>
      <View style={$buttonContainer}>
        <Button style={$button} tx="demoDebugScreen.reactotron" onPress={demoReactotron} />
        <Text style={$hint} tx={`demoDebugScreen.${Platform.OS}ReactotronHint` as const} />
      </View>

      <Text style={$title} preset="heading" text="Settings" />
      <ListItem
        LeftComponent={
          <View style={$item}>
            <Text preset="bold">Language</Text>
            <View>
              <Toggle
                variant="radio"
                label="AR"
                containerStyle={$radioContainer}
                value={selectedLang === "ar"}
                onPress={() => setSelectedLang("ar")}
              />
              <Toggle
                variant="radio"
                label="EN"
                containerStyle={$radioContainer}
                value={selectedLang === "en"}
                onPress={() => setSelectedLang("en")}
              />
            </View>
          </View>
        }
      />
      <View style={$buttonContainer}>
        <Button style={$button} text="Save" onPress={() => _saveSettings()} />
      </View>
    </Screen>
  )
}

const $container: ViewStyle = {
  paddingTop: spacing.large + spacing.extraLarge,
  paddingBottom: spacing.huge,
  paddingHorizontal: spacing.large,
}

const $title: TextStyle = {
  marginBottom: spacing.huge,
}

const $reportBugsLink: TextStyle = {
  color: colors.tint,
  marginBottom: spacing.large,
  alignSelf: isRTL ? "flex-start" : "flex-end",
}

const $item: ViewStyle = {
  marginBottom: spacing.medium,
}

const $itemsContainer: ViewStyle = {
  marginBottom: spacing.extraLarge,
}

const $button: ViewStyle = {
  marginBottom: spacing.extraSmall,
}

const $buttonContainer: ViewStyle = {
  marginBottom: spacing.medium,
}

const $hint: TextStyle = {
  color: colors.palette.neutral600,
  fontSize: 12,
  lineHeight: 15,
  paddingBottom: spacing.large,
}

const $radioContainer: ViewStyle = {
  marginTop: 5,
  marginBottom: 5
}

// @demo remove-file
