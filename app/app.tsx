
import Config from "@config"
import "@i18n"
import { useInitialRootStore } from "@models"
import { AppNavigator, useNavigationPersistence } from "@navigators"
import { setupReactotron } from "@services/reactotron"
import { customFontsToLoad } from "@theme"
import "@utils/ignore-warnings"
import * as storage from "@utils/storage"
import { useFonts } from "expo-font"
import React from "react"
import { Config as RNBootSplashHideConfig } from "react-native-bootsplash"
import { SafeAreaProvider, initialWindowMetrics } from "react-native-safe-area-context"



setupReactotron({

  clearOnLoad: true,

  host: Config.REACTOTRON_HOST,

  useAsyncStorage: true,

  logInitialState: true,

  logSnapshots: false,
})

export const NAVIGATION_PERSISTENCE_KEY = "NAVIGATION_STATE"

interface AppProps {
  hideSplashScreen: (config: RNBootSplashHideConfig) => Promise<void>
}

/**
 * This is the root component of our app.
 */
function App(props: AppProps) {
  const { hideSplashScreen } = props
  const {
    initialNavigationState,
    onNavigationStateChange,
    isRestored: isNavigationStateRestored,
  } = useNavigationPersistence(storage, NAVIGATION_PERSISTENCE_KEY)

  const [areFontsLoaded] = useFonts(customFontsToLoad)

  const { rehydrated } = useInitialRootStore(() => {
    setTimeout(() => {
      if (hideSplashScreen) {
        hideSplashScreen({ fade: true })
      }
    }, 500)
  })

  if (!rehydrated || !isNavigationStateRestored || !areFontsLoaded) return null;


  return (
    <SafeAreaProvider initialMetrics={initialWindowMetrics}>
      <AppNavigator
        initialState={initialNavigationState}
        onStateChange={onNavigationStateChange}
      />
    </SafeAreaProvider>
  )
}








export default App
