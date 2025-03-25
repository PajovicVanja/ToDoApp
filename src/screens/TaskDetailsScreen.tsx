import React from 'react';
import { View, Text } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { TasksStackParamList } from '../types/taskTypes';
import globalStyles from '../styles/globalStyles';

type Props = NativeStackScreenProps<TasksStackParamList, 'TaskDetails'>;

const TaskDetailsScreen: React.FC<Props> = ({ route }) => {
  const { task } = route.params;
  const dueDate = new Date(task.dueDate);
  const reminderDate = new Date(task.reminderDate);

  return (
    <View style={globalStyles.container}>
      <Text style={globalStyles.detailTitle}>{task.title}</Text>
      <Text style={globalStyles.detailText}>Description: {task.description}</Text>
      <Text style={globalStyles.detailText}>Category: {task.category}</Text>
      <Text style={globalStyles.detailText}>Due Date: {dueDate.toLocaleDateString()}</Text>
      <Text style={globalStyles.detailText}>Reminder Date: {reminderDate.toLocaleDateString()}</Text>
    </View>
  );
};

export default TaskDetailsScreen;
