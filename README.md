# Welcome to Freemage!

## This is an app for anyone who need to find free photos which has been integrated  with Unsplash API.

## Quick Start

The Ignite boilerplate project's structure will look similar to this:

1. clone this project by doing:
```git clone https://github.com/davidwidjaya/Freemage.git```
2. please make sure you have already install yarn on your computer, if not then please install by doing : ```npm install --global yarn```
3. open current project directory and run ```yarn``` command in terminal. Project path example: ```C:/Downloads/freemage```
4. after that, there will be node_modules folder inside your project.
5. please do some modification inside node_modules because there's conflict version expo-device patch, steps below:
    - open /node_modules/expo-device/android/src/main/java/expo/modules/device/DeviceModule.kt
    - replace from this:
    ```
    "osName" to systemName,
    "osVersion" to Build.VERSION.RELEASE,
    "osBuildId" to Build.DISPLAY,
    "osInternalBuildId" to Build.ID,
    "osBuildFingerprint" to Build.FINGERPRINT,
    "platformApiLevel" to Build.VERSION.SDK_INT,
    "deviceName" to Settings.Secure.getString(mContext.contentResolver, "bluetooth_name")
    ```
    into this below
    ```
    "osName" to systemName,
    "osVersion" to Build.VERSION.RELEASE,
    "osBuildId" to Build.DISPLAY,
    "osInternalBuildId" to Build.ID,
    "osBuildFingerprint" to Build.FINGERPRINT,
    "platformApiLevel" to Build.VERSION.SDK_INT,
    "deviceName" to ""
    ```
    - the only different just changed the ```"deviceName" to ""``` 
    - more info visit https://github.com/expo/expo/issues/18738


"# Freemage" 
