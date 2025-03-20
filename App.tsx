// App.tsx
import React from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { TaskProvider } from './src/context/TaskContext';
import AppNavigator from './src/navigation/AppNavigator';
import firebaseConfig from './src/config/firebaseConfig';
import { initializeApp, getApps } from '@react-native-firebase/app';

if (getApps().length === 0) {
  initializeApp(firebaseConfig);
}

console.log('Firebase apps:', getApps());

const App: React.FC = () => {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <TaskProvider>
        <AppNavigator />
      </TaskProvider>
    </GestureHandlerRootView>
  );
};

export default App;
