import React from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { TaskProvider } from './src/context/TaskContext';
import AppNavigator from './src/navigation/AppNavigator';
import { initializeApp, getApps } from '@react-native-firebase/app';

const firebaseConfig = {
  apiKey: "AIzaSyCAd3-zsvGIZEvx_swr42ouiReYf5c9dQo",
  authDomain: "to-do-app-fb6f9.firebaseapp.com",
  projectId: "to-do-app-fb6f9",
  storageBucket: "to-do-app-fb6f9.firebasestorage.app",
  messagingSenderId: "647438249977",
  appId: "1:647438249977:android:5e5f5b9b4069c1e1be5728",
};

if (getApps().length === 0) {
  initializeApp(firebaseConfig);
}

console.log('Firebase apps:', getApps());

const App: React.FC = () => {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <TaskProvider> 
        <AppNavigator /> {/* Ensure AppNavigator is inside TaskProvider */}
      </TaskProvider>
    </GestureHandlerRootView>
  );
};

export default App;
