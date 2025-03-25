import React, { useEffect } from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { TaskProvider } from './src/context/TaskContext';
import AppNavigator from './src/navigation/AppNavigator';
import firebaseConfig from './src/config/firebaseConfig';
import { initializeApp, getApps } from '@react-native-firebase/app';
import { Alert } from 'react-native';
import messaging from '@react-native-firebase/messaging';

if (getApps().length === 0) {
  initializeApp(firebaseConfig);
}

console.log('Firebase apps:', getApps());

const App: React.FC = () => {
  useEffect(() => {
    // Request notification permission
    const requestPermission = async () => {
      try {
        const authStatus = await messaging().requestPermission();
        const enabled =
          authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
          authStatus === messaging.AuthorizationStatus.PROVISIONAL;
        if (enabled) {
          console.log('Notification permission enabled:', authStatus);
        }
      } catch (error) {
        console.log('Notification permission error:', error);
      }
    };
    requestPermission();
  }, []);

  useEffect(() => {
    // Listen for foreground messages
    const unsubscribe = messaging().onMessage(async remoteMessage => {
      console.log('A new FCM message arrived!', remoteMessage);
      Alert.alert(
        remoteMessage.notification?.title || 'Motivational Message',
        remoteMessage.notification?.body || ''
      );
    });
    return unsubscribe;
  }, []);

  useEffect(() => {
    // Retrieve the FCM registration token
    const fetchFCMToken = async () => {
      try {
        const token = await messaging().getToken();
        console.log('FCM Registration Token:', token);
      } catch (error) {
        console.log('Error fetching FCM token:', error);
      }
    };
    fetchFCMToken();
  }, []);

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <TaskProvider>
        <AppNavigator />
      </TaskProvider>
    </GestureHandlerRootView>
  );
};

export default App;