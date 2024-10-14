
## React Native

### Initialize a React Native Project

Run the following command to set up a React Native project with the correct folder structure:

```bash
rc init -rn
```

---

### 📂 Folder Structure

Once initialized, your project will follow this structure:

```
root/
├── src/
│   ├── api/               # Handles API calls and requests
│   ├── config/            # Project configuration files
│   ├── constants/         # App-wide constant values
│   ├── hooks/             # Custom React hooks
│   ├── i18n/              # Internationalization setup
│   ├── navigation/        # Navigation and routing setup
│   ├── screens/           # Screen components for the app
│   ├── services/          # Services like network, storage, etc.
│   ├── store/             # State management (e.g., Zustand)
│   ├── theme/             # Theme settings and styles
│   ├── types/             # TypeScript types and interfaces
│   └── utils/             # Utility functions
│   └── App.tsx            # Main entry point of the application
├── assets/                # Images, fonts, icons, etc.
│   ├── images/
│   ├── fonts/
│   └── icons/
├── android/               # Android platform-specific files
├── ios/                   # iOS platform-specific files
```

---

### 📚 Libraries

Here is a list of external libraries that are included in this setup:

- **@hookform/resolvers**: Resolver for `react-hook-form` validations.
- **@react-native-community/netinfo**: For network state detection.
- **@react-navigation/native**: Core library for navigation between screens.
- **@react-navigation/native-stack**: Stack-based navigation for React Native.
- **@tanstack/query-sync-storage-persister**: Syncs query data with storage.
- **@tanstack/react-query**: Powerful data-fetching and caching library.
- **@tanstack/react-query-persist-client**: Persist `react-query` data.
- **axios**: Promise-based HTTP client for making API requests.
- **date-fns**: Modern JavaScript date utility library.
- **i18next**: Internationalization framework.
- **react-hook-form**: Form management library.
- **react-i18next**: React bindings for `i18next`.
- **react-native-mmkv**: High-performance storage for React Native.
- **react-native-safe-area-context**: Handles safe area boundaries.
- **react-native-screens**: Optimized navigation transitions.
- **react-native-svg**: SVG library for rendering scalable graphics.
- **react-native-unistyles**: Unified style system for React Native.
- **react-native-vector-icons**: Popular vector icons for React Native.
- **zod**: TypeScript-first schema validation.
- **zustand**: Lightweight state management library.

---

### ✨ Features

- **Initialize Project Setup**: Set up a React Native project with the required structure and configurations in one command.
- **Component Generation**: Quickly generate React Native components with automatic TypeScript and StyleSheet setup.
- **State Management**: Supports `zustand` for state management.
- **Localization**: Integrated `i18next` and `react-i18next` for localization support.
- **Data Fetching & Caching**: Utilizes `react-query` for API calls and caching.
- **Efficient Storage**: Includes `react-native-mmkv` for high-performance key-value storage.
- **Navigation**: Configured with `React Navigation` for easy screen management.
- **Absolute Imports**: Supports absolute path imports using `babel-plugin-module-resolver`.
