
## React Native Init Setup Guide

This guide walks through the some user level setup for a React Native project. Which is necessary to make react native init setup complete
Follow the instructions below to configure paths, enable new architecture, and adjust navigation settings.

---

### 1. Absolute Path Setup

To simplify imports using absolute paths, configure `tsconfig.json` and `babel.config.js` with the following settings.

#### Update `babel.config.js`

Add the following `plugins` section to your `babel.config.js`:

```js
plugins: [
  [
    'module-resolver',
    {
      alias: {
        '@': './src',
        '@assets': './assets',
      },
    },
  ],
],
```

#### Update `tsconfig.json`

Modify the `compilerOptions` in your `tsconfig.json` to set the base URL and paths:

```json
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["src/*"],
      "@assets/*": ["./assets/*"]
    }
  },
  "include": [
    "./src/**/*.ts",
    "./src/**/*.tsx"
  ]
}
```

This will allow you to import files with aliases like `@/components/Button` or `@assets/images/logo.png`.

---

### 2. Enable New Architecture with `react-native-mmkv`

To enable the new architecture for `react-native-mmkv`, you need to update the `gradle.properties` file.

#### Update `gradle.properties`

Add the following line to `android/gradle.properties`:

```properties
newArchEnabled=true
```

This enables the new architecture and unlocks improved performance and features.

---

### 3. Navigation Changes in `MainActivity.kt`

When setting up navigation (e.g., using React Navigation), you may need to modify `MainActivity.kt` to handle navigation correctly.

#### Modify `MainActivity.kt`

1. Add the following import statement at the top of this `MainActivity.kt` file:

   ```kotlin
   import android.os.Bundle;
   ```

2. Add the highlighted code to the body of MainActivity class:

   ```kotlin
   override fun onCreate(savedInstanceState: Bundle?) {
     super.onCreate(null)
   }
   ```

---
### 4. Set path for `react-native-vector-icons`

To make font management smoother on Android and IOS, you need to update the `android/app/build.gradle` file and `ios/Podfile`.

#### Update `gradle.properties`

Add the following line to `android/app/gradle.properties` at the end of file:

```properties
apply from: file("../../node_modules/react-native-vector-icons/fonts.gradle")
```

### Update `Podfile`

Add the following line to `ios/Podfile`
```properties
pod 'RNVectorIcons', :path => '../node_modules/react-native-vector-icons'
```

This change is required and necessary to properly handle navigation within your React Native application.

---

By following these steps, you'll have your project set up with absolute paths, the new architecture, and proper navigation handling.
You can know more about the architecture and features available here: [REACT NATIVE Documentation](./REACTNATIVE.md)