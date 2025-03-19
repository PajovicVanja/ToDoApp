import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Picker } from '@react-native-picker/picker';
import DatePicker from 'react-native-date-picker';
import { useTaskContext } from '../context/TaskContext';
import { RootStackParamList } from '../types/taskTypes';
import globalStyles from '../styles/globalStyles';

type Props = NativeStackScreenProps<RootStackParamList, 'AddTask'>;

const AddTaskScreen: React.FC<Props> = ({ navigation }) => {
  const { addTask } = useTaskContext();

  const [title, setTitle] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [category, setCategory] = useState<string>('Work');
  const [dueDate, setDueDate] = useState<Date>(new Date());
  const [reminderDate, setReminderDate] = useState<Date>(new Date());
  const [openDue, setOpenDue] = useState<boolean>(false);
  const [openReminder, setOpenReminder] = useState<boolean>(false);

  const handleAddTask = async () => {
    if (!title.trim()) {
      Alert.alert('Please enter a task name');
      return;
    }
  
    const newTask = {
      title,
      description,
      category,
      dueDate,
      reminderDate,
    };
  
    await addTask(newTask);
    navigation.goBack();
  };
  

  return (
    <View style={globalStyles.container}>
      <Text style={globalStyles.header}>Add New Task</Text>

      <TextInput
        placeholder="Task Name"
        value={title}
        onChangeText={setTitle}
        style={globalStyles.input}
      />
      
      <TextInput
        placeholder="Task Description"
        value={description}
        onChangeText={setDescription}
        style={[globalStyles.input, { height: 80 }]}
        multiline
      />

      <Text style={globalStyles.label}>Category:</Text>
      <View style={globalStyles.pickerContainer}>
        <Picker selectedValue={category} onValueChange={(itemValue) => setCategory(itemValue)}>
          <Picker.Item label="Work" value="Work" />
          <Picker.Item label="Personal" value="Personal" />
          <Picker.Item label="Other" value="Other" />
        </Picker>
      </View>

      <TouchableOpacity style={globalStyles.dateButton} onPress={() => setOpenDue(true)}>
        <Text style={globalStyles.dateButtonText}>Select Due Date</Text>
      </TouchableOpacity>
      <DatePicker
        modal
        open={openDue}
        date={dueDate}
        onConfirm={(date) => {
          setOpenDue(false);
          setDueDate(date);
        }}
        onCancel={() => setOpenDue(false)}
        mode="date"
      />

      <TouchableOpacity style={globalStyles.dateButton} onPress={() => setOpenReminder(true)}>
        <Text style={globalStyles.dateButtonText}>Select Reminder Date</Text>
      </TouchableOpacity>
      <DatePicker
        modal
        open={openReminder}
        date={reminderDate}
        onConfirm={(date) => {
          setOpenReminder(false);
          setReminderDate(date);
        }}
        onCancel={() => setOpenReminder(false)}
        mode="date"
      />

      <TouchableOpacity style={globalStyles.button} onPress={handleAddTask}>
        <Text style={globalStyles.buttonText}>Add Task</Text>
      </TouchableOpacity>
    </View>
  );
};

export default AddTaskScreen;
