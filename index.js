import '@expo/metro-runtime';

import { App } from 'expo-router/build/qualified-entry';
import { renderRootComponent } from 'expo-router/build/renderRootComponent';
// import messaging from '@react-native-firebase/messaging';

// messaging().setBackgroundMessageHandler(async remoteMessage => {
//   console.log('Message11 handled in the background!', remoteMessage);
// });

// This file should only import and register the root. No components or exports
// should be added here.
renderRootComponent(App);
