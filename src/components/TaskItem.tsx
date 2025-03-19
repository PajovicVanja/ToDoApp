import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Task } from '../types/taskTypes';
import globalStyles from '../styles/globalStyles';

interface TaskItemProps {
  task: Task;
  onPress: () => void;
}

const TaskItem: React.FC<TaskItemProps> = ({ task, onPress }) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={globalStyles.taskItem}>
        <Text style={globalStyles.taskTitle}>{task.title}</Text>
        <Text style={globalStyles.taskDueDate}>
          Due: {task.dueDate.toLocaleDateString()}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default TaskItem;
