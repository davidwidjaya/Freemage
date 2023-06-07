/**
 * Welcome to the main entry point of the app. In this file, we'll
 * be kicking off our app.
 *
 * Most of this file is boilerplate and you shouldn't need to modify
 * it very often. But take some time to look through and understand
 * what is going on here.
 *
 * The app navigation resides in ./app/navigators, so head over there
 * if you're interested in adding screens and navigators.
 */
import "@i18n"
import "@utils/ignore-warnings"
import { useFonts } from "expo-font"
import React from "react"
import { initialWindowMetrics, SafeAreaProvider } from "react-native-safe-area-context"
import { useInitialRootStore } from "@models"
import { AppNavigator, useNavigationPersistence } from "@navigators"
import { ErrorBoundary } from "@screens"
import * as storage from "@utils/storage"
import { customFontsToLoad } from "@theme"
import { setupReactotron } from "@services/reactotron"
import Config from "@config"
import { Config as RNBootSplashHideConfig } from "react-native-bootsplash"
import OneSignal from "react-native-onesignal"
import CodePush from "react-native-code-push"

// Set up Reactotron, which is a free desktop app for inspecting and debugging
// React Native apps. Learn more here: https://github.com/infinitered/reactotron
setupReactotron({
  // clear the Reactotron window when the app loads/reloads
  clearOnLoad: true,
  // generally going to be localhost
  host: Config.REACTOTRON_HOST,
  // Reactotron can monitor AsyncStorage for you
  useAsyncStorage: true,
  // log the initial restored state from AsyncStorage
  logInitialState: true,
  // log out any snapshots as they happen (this is useful for debugging but slow)
  logSnapshots: false,
})

export const NAVIGATION_PERSISTENCE_KEY = "NAVIGATION_STATE"

interface AppProps {
  hideSplashScreen: (config: RNBootSplashHideConfig) => Promise<void>
}

async function initOneSignal() {
  // const onesignalToken = "2bf580b3e96e6f6cea66ba4c697d69134JO";
  const onesignalToken = await storage.load("TOKEN_ONESIGNAL");
  if (!onesignalToken) {
    return;
  }

  //OneSignal Init Code
  OneSignal.setLogLevel(6, 0);
  OneSignal.setAppId(Config.ONESIGNAL_ID);
  OneSignal.setExternalUserId(onesignalToken, response => {
    console.log("SET_EXTERNAL_ONESIGNAL_USER_ID", response);
  });
  //END OneSignal Init Code

  //Prompt for push on iOS
  OneSignal.promptForPushNotificationsWithUserResponse(response => {
    // console.log("Prompt response:", response);
  });

  //Method for handling notifications received while app in foreground
  OneSignal.setNotificationWillShowInForegroundHandler(notificationReceivedEvent => {
    // console.log("OneSignal: notification will show in foreground:", notificationReceivedEvent);
    // let notification = notificationReceivedEvent.getNotification();
  });

  //Method for handling notifications opened
  OneSignal.setNotificationOpenedHandler(result => {
    // const { notification } = result;
    // if (notification.additionalData) {
    //   console.log("NOTIF_ADDITIONAL_DATA", notification.additionalData);
    //   setTimeout(() => {

    //     if (notification.additionalData && notification.additionalData.jenis && notification.additionalData.jenis.includes("trans_")) {
    //       navigationRef.current.navigate("transaction_detail_hybrid", { transUUID: notification.additionalData.post_uuid });
    //     }
    //     else {
    //       navigationRef.current.navigate("notification");
    //     }

    //   }, 2000);
    // }
  });
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
    // This runs after the root store has been initialized and rehydrated.

    // If your initialization scripts run very fast, it's good to show the splash screen for just a bit longer to prevent flicker.
    // Slightly delaying splash screen hiding for better UX; can be customized or removed as needed,
    // Note: (vanilla Android) The splash-screen will not appear if you launch your app via the terminal or Android Studio. Kill the app and launch it normally by tapping on the launcher icon. https://stackoverflow.com/a/69831106
    // Note: (vanilla iOS) You might notice the splash-screen logo change size. This happens in debug/development mode. Try building the app for release.
    setTimeout(() => {
      if (hideSplashScreen) {
        hideSplashScreen({ fade: true })
      }
    }, 500)
    
    initOneSignal();
  })

  // Before we show the app, we have to wait for our state to be ready.
  // In the meantime, don't render anything. This will be the background
  // color set in native by rootView's background color.
  // In iOS: application:didFinishLaunchingWithOptions:
  // In Android: https://stackoverflow.com/a/45838109/204044
  // You can replace with your own loading component if you wish.
  if (!rehydrated || !isNavigationStateRestored || !areFontsLoaded) return null;

  // otherwise, we're ready to render the app
  return (
    <SafeAreaProvider initialMetrics={initialWindowMetrics}>
      <ErrorBoundary catchErrors={Config.catchErrors}>
        <AppNavigator
          initialState={initialNavigationState}
          onStateChange={onNavigationStateChange}
        />
      </ErrorBoundary>
    </SafeAreaProvider>
  )
}

// const CodePushOptions = {
//   checkFrequency: CodePush.CheckFrequency.ON_APP_RESUME,
//   installMode: CodePush.InstallMode.ON_NEXT_RESUME
// }

// export default CodePush(CodePushOptions)(App)

export default App
