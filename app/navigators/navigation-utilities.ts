import {
  NavigationAction,
  NavigationState,
  PartialState,
  createNavigationContainerRef,
} from "@react-navigation/native"
import { useEffect, useRef, useState } from "react"
import { BackHandler, Platform } from "react-native"
import Config from "../config"
import type { PersistNavigationConfig } from "../config/config.base"
import { useIsMounted } from "../utils/is-mounted"


export const RootNavigation = {
  navigate(_name: string, _params?: any) {},
  goBack() {},
  resetRoot(_state?: PartialState<NavigationState> | NavigationState) {},
  getRootState(): NavigationState {
    return {} as any
  },
  dispatch(_action: NavigationAction) {},
}


export const navigationRef = createNavigationContainerRef()

/**
 * Gets the current screen from any navigation state.
 */
export function getActiveRouteName(state: NavigationState | PartialState<NavigationState>) {
  const route = state.routes[state.index]

  
  if (!route.state) return route.name

  
  return getActiveRouteName(route.state)
}

/**
 * Hook that handles Android back button presses and forwards those on to
 * the navigation or allows exiting the app.
 */
export function useBackButtonHandler(canExit: (routeName: string) => boolean) {
  
  if (Platform.OS === "ios") return

  
  
  const canExitRef = useRef(canExit)

  useEffect(() => {
    canExitRef.current = canExit
  }, [canExit])

  useEffect(() => {
    
    const onBackPress = () => {
      if (!navigationRef.isReady()) {
        return false
      }

      
      const routeName = getActiveRouteName(navigationRef.getRootState())

      
      if (canExitRef.current(routeName)) {
        
        BackHandler.exitApp()
        return true
      }

      
      if (navigationRef.canGoBack()) {
        navigationRef.goBack()
        return true
      }

      return false
    }

    
    BackHandler.addEventListener("hardwareBackPress", onBackPress)

    
    return () => BackHandler.removeEventListener("hardwareBackPress", onBackPress)
  }, [])
}

/**
 * This helper function will determine whether we should enable navigation persistence
 * based on a config setting and the __DEV__ environment (dev or prod).
 */
function navigationRestoredDefaultState(persistNavigation: PersistNavigationConfig) {
  if (persistNavigation === "always") return false
  if (persistNavigation === "dev" && __DEV__) return false
  if (persistNavigation === "prod" && !__DEV__) return false

  
  return true
}

/**
 * Custom hook for persisting navigation state.
 */
export function useNavigationPersistence(storage: any, persistenceKey: string) {
  const [initialNavigationState, setInitialNavigationState] = useState()
  const isMounted = useIsMounted()

  const initNavState = navigationRestoredDefaultState(Config.persistNavigation)
  const [isRestored, setIsRestored] = useState(initNavState)

  const routeNameRef = useRef<string | undefined>()

  const onNavigationStateChange = (state) => {
    const previousRouteName = routeNameRef.current
    const currentRouteName = getActiveRouteName(state)

    if (previousRouteName !== currentRouteName) {
      
      if (__DEV__) {
        console.tron.log(currentRouteName)
      }
    }

    
    routeNameRef.current = currentRouteName

    
    storage.save(persistenceKey, state)
  }

  const restoreState = async () => {
    try {
      const state = await storage.load(persistenceKey)
      if (state) setInitialNavigationState(state)
    } finally {
      if (isMounted()) setIsRestored(true)
    }
  }

  useEffect(() => {
    if (!isRestored) restoreState()
  }, [isRestored])

  return { onNavigationStateChange, restoreState, isRestored, initialNavigationState }
}

/**
 * use this to navigate without the navigation
 * prop. If you have access to the navigation prop, do not use this.
 * More info: https:
 */
export function navigate(name: any, params?: any) {
  if (navigationRef.isReady()) {
    navigationRef.navigate(name as never, params as never)
  }
}

export function goBack() {
  if (navigationRef.isReady() && navigationRef.canGoBack()) {
    navigationRef.goBack()
  }
}

export function resetRoot(params = { index: 0, routes: [] }) {
  if (navigationRef.isReady()) {
    navigationRef.resetRoot(params)
  }
}
