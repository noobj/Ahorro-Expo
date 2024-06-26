import { Alert, BackHandler, AppState } from 'react-native';
import * as LocalAuthentication from 'expo-local-authentication';
import { useRef, useEffect } from 'react';

export default function NativeEventHandlers() {
  const isTemporaryBackground = useRef(false);
  const appState = useRef(AppState.currentState);
  async function bioAuth() {
    isTemporaryBackground.current = true;
    const isEnrolled = await LocalAuthentication.isEnrolledAsync();

    if (!isEnrolled) {
      isTemporaryBackground.current = false;
      await LocalAuthentication.cancelAuthenticate();
      Alert.alert(
        'Bio Auth failed',
        'please enrol the biometric authentication!',
        [
          {
            text: 'Confirm',
            onPress: () => {
              isTemporaryBackground.current = false;
              BackHandler.exitApp();
            },
          },
        ],
      );
      return;
    }
    const r1esult = await LocalAuthentication.authenticateAsync();

    if (!r1esult.success) {
      await LocalAuthentication.cancelAuthenticate();
      Alert.alert('Bio Auth failed', 'Wrong bio info!', [
        {
          text: 'Confirm',
          onPress: () => {
            isTemporaryBackground.current = false;
            BackHandler.exitApp();
          },
        },
      ]);
    }
  }
  useEffect(() => {
    const subscription = AppState.addEventListener('change', nextAppState => {
      if (
        appState.current.match(/inactive|background/) &&
        nextAppState === 'active' &&
        !isTemporaryBackground.current
      ) {
        bioAuth();
      } else if (
        appState.current.match(/inactive|background/) &&
        nextAppState === 'active' &&
        isTemporaryBackground.current
      ) {
        isTemporaryBackground.current = false;
      }
      appState.current = nextAppState;
    });

    return () => {
      subscription.remove();
    };
  }, []);

  useEffect(() => {
    const messaging = require('@react-native-firebase/messaging');
    messaging
      .getMessaging()
      .subscribeToTopic('weather')
      .then(() => console.log('Subscribed to topic!'));
    const unsubscribe = messaging
      .getMessaging()
      .onMessage(async (remoteMessage: any) => {
        Alert.alert(
          'A new FCM message arrived!',
          JSON.stringify(remoteMessage),
        );
      });

    return unsubscribe;
  }, []);
}
