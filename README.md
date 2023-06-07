# Welcome to your new ignited app!

[![CircleCI](https://circleci.com/gh/infinitered/ignite.svg?style=svg)](https://circleci.com/gh/infinitered/ignite)

## The latest and greatest boilerplate for Infinite Red opinions

This is the boilerplate that [Infinite Red](https://infinite.red) uses as a way to test bleeding-edge changes to our React Native stack.

Currently includes:

- React Native
- React Navigation
- MobX State Tree
- TypeScript
- And more!

## Quick Start

The Ignite boilerplate project's structure will look similar to this:

```
ignite-project
├── app
│   ├── components
│   ├── i18n
│   ├── utils
│   ├── models
│   ├── navigators
│   ├── screens
│   ├── services
│   ├── theme
│   ├── app.tsx
├── test
│   ├── __snapshots__
│   ├── mock-i18n.ts
│   ├── mock-reactotron.ts
│   ├── setup.ts
├── README.md
├── android
│   ├── app
│   ├── build.gradle
│   ├── gradle
│   ├── gradle.properties
│   ├── gradlew
│   ├── gradlew.bat
│   ├── keystores
│   └── settings.gradle
├── ignite
│   └── templates
|       |── app-icon
│       ├── component
│       ├── model
│       ├── navigator
│       └── screen
├── index.js
├── ios
│   ├── IgniteProject
│   ├── IgniteProject-tvOS
│   ├── IgniteProject-tvOSTests
│   ├── IgniteProject.xcodeproj
│   └── IgniteProjectTests
├── .env
└── package.json

```

### ./app directory

Included in an Ignite boilerplate project is the `app` directory. This is a directory you would normally have to create when using vanilla React Native.

The inside of the src directory looks similar to the following:

```
app
│── components
│── i18n
├── models
├── navigators
├── screens
├── services
├── theme
├── utils
└── app.tsx
```

**components**
MAVERICKTODO: update this documentation

**i18n**
This is where your translations will live if you are using `react-native-i18n`.

**models**
This is where your app's models will live. Each model has a directory which will contain the `mobx-state-tree` model file, test file, and any other supporting files like actions, types, etc.

**navigators**
This is where your `react-navigation` navigators will live.

**screens**
This is where your screen components will live. A screen is a React component which will take up the entire screen and be part of the navigation hierarchy. Each screen will have a directory containing the `.tsx` file, along with any assets or other helper files.

**services**
Any services that interface with the outside world will live here (think REST APIs, Push Notifications, etc.).

**theme**
Here lives the theme for your application, including spacing, colors, and typography.

**utils**
This is a great place to put miscellaneous helpers and utilities. Things like date helpers, formatters, etc. are often found here. However, it should only be used for things that are truely shared across your application. If a helper or utility is only used by a specific component or model, consider co-locating your helper with that component or model.

**app.tsx** This is the entry point to your app. This is where you will find the main App component which renders the rest of the application.

### ./ignite directory

The `ignite` directory stores all things Ignite, including CLI and boilerplate items. Here you will find templates you can customize to help you get started with React Native.

### ./test directory

This directory will hold your Jest configs and mocks.

## Running Detox end-to-end tests

Read [Detox setup instructions](./detox/README.md).

## Previous Boilerplates

- [2018 aka Bowser](https://github.com/infinitered/ignite-bowser)
- [2017 aka Andross](https://github.com/infinitered/ignite-andross)
- [2016 aka Ignite 1.0](https://github.com/infinitered/ignite-ir-boilerplate-2016)

## Additional Notes

### Ignite CLI Generator
some generator may be broken in old ignite-cli version, please use next or latest version of ignite-cli.

```
npx ignite-cli@next generate ...
```
or
```
npx ignite-cli@latest generate ...
```

### Components
- Bottom menu bar : using react navigation's TabNavigator, located in ./app/navigators/
- splash screen : generated using available generator, view more in docs.
- app icon : generated using available generator, view more in docs.
- image viewer : using react-native-image-viewing, examples are available at ./app/screens/DemoPodcastListScreen

### Utils & Services
- API : ./app/services/api

### Data structure & Model
Using MST (MobX State Tree), located in ./app/models/

### Storage
Storage key prefix :
- all settings : SETTING_
- all tokens : TOKEN_

### Bundler Identifier (IOS)
related bundler identifier locations :
[main target & OneSignalNotificationServiceExtension]
- .xworkspace -> general -> identity -> bundle identifier
- .xworkspace -> signing & capabilities -> signing -> bundle identifier
- .xworkspace -> signing & capabilities -> app groups

### Common IOS error and how to fix
- expomodulescore :Incremental compilation has been disabled : ..., solution : pod install/update
- PhaseScriptExecution error caused by .xcode.env.local, solution : read at https://github.com/infinitered/ignite/issues/2103, or set export command below to ios/.xcode.env or ios/.xcode.env.local
```
export NODE_BINARY=$(command -v node)
```

"# Freemage" 
