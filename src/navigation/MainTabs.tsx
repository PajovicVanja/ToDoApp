import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import TasksStack from './TasksStack';
import SettingsScreen from '../screens/SettingsScreen';
import { BottomTabParamList } from '../types/taskTypes';

const Tab = createBottomTabNavigator<BottomTabParamList>();

const MainTabs: React.FC = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Tasks" component={TasksStack} />
      <Tab.Screen name="Settings" component={SettingsScreen} />
    </Tab.Navigator>
  );
};

export default MainTabs;
