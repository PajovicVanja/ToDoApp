import React, { useState, useLayoutEffect } from 'react';
import { View, Text, TouchableOpacity, FlatList, Alert } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import auth from '@react-native-firebase/auth';
import { RootStackParamList, Task } from '../types/taskTypes';
import TaskItem from '../components/TaskItem';
import globalStyles from '../styles/globalStyles';
import { Swipeable } from 'react-native-gesture-handler';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useTaskContext } from '../context/TaskContext';

type Props = NativeStackScreenProps<RootStackParamList, 'TaskList'>;

const TaskListScreen: React.FC<Props> = ({ navigation }) => {
  const { tasks, deleteTask } = useTaskContext();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity onPress={handleLogout} style={{ marginRight: 10 }}>
          <Text style={{ color: 'red' }}>Logout</Text>
        </TouchableOpacity>
      ),
    });
  }, [navigation]);

  const handleLogout = async () => {
    try {
      await auth().signOut();
      navigation.replace('Login');
    } catch (error) {
      console.error('Logout Error:', error);
    }
  };

  const confirmDeleteTask = (task: Task) => {
    Alert.alert(
      "Delete Task",
      "Are you sure you want to delete this task?",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Delete",
          onPress: async () => {
            await deleteTask(task.id);
          },
          style: "destructive"
        }
      ]
    );
  };

  const renderRightActions = (task: Task) => {
    return (
      <TouchableOpacity
        style={globalStyles.swipeDeleteContainer}
        onPress={() => confirmDeleteTask(task)}
      >
        <MaterialIcons name="delete" size={28} color="white" />
      </TouchableOpacity>
    );
  };

  return (
    <View style={globalStyles.container}>
      <Text style={globalStyles.header}>Your Tasks</Text>
      <FlatList
        data={tasks}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={{ paddingBottom: 80 }}
        renderItem={({ item }) => (
          <Swipeable renderRightActions={() => renderRightActions(item)}>
            <TaskItem
              task={item}
              onPress={() =>
                navigation.navigate('TaskDetails', {
                  task: {
                    ...item,
                    dueDate: item.dueDate.toISOString(),
                    reminderDate: item.reminderDate.toISOString(),
                  },
                })
              }
            />
          </Swipeable>
        )}
        ListEmptyComponent={
          <Text style={globalStyles.emptyText}>No tasks added yet.</Text>
        }
      />
      {/* Floating Add Task Button */}
      <TouchableOpacity
        style={{
          position: 'absolute',
          bottom: 30,
          right: 30,
          width: 60,
          height: 60,
          borderRadius: 30,
          backgroundColor: '#2ECC71',
          justifyContent: 'center',
          alignItems: 'center',
          elevation: 5,
        }}
        onPress={() => navigation.navigate('AddTask')}
      >
        <Text style={{ color: '#FFFFFF', fontSize: 30, fontWeight: 'bold' }}>+</Text>
      </TouchableOpacity>
    </View>
  );
};

export default TaskListScreen;
