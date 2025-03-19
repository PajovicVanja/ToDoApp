// src/types/taskTypes.ts
export interface Task {
  id: string; // Changed from number to string
  title: string;
  description: string;
  category: string;
  dueDate: Date;
  reminderDate: Date;
}

// Serialized task for navigation
export type SerializedTask = Omit<Task, 'dueDate' | 'reminderDate'> & {
  dueDate: string;
  reminderDate: string;
};

// Add a Login route to the RootStackParamList
export type RootStackParamList = {
  Login: undefined;
  TaskList: undefined;
  TaskDetails: { task: SerializedTask };
  AddTask: undefined;
};
