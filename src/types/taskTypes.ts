export interface Task {
  id: string;
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

export type RootStackParamList = {
  Login: undefined;
  MainTabs: undefined;
};

export type TasksStackParamList = {
  TaskList: undefined;
  TaskDetails: { task: SerializedTask };
  AddTask: undefined;
};

export type BottomTabParamList = {
  Tasks: undefined;
  Settings: undefined;
};
