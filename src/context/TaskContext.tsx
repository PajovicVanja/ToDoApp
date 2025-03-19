import React, { createContext, useState, ReactNode, useContext, useEffect } from 'react';
import { getAuth, onAuthStateChanged, FirebaseAuthTypes } from '@react-native-firebase/auth';
import { getFirestore, collection, query, where, onSnapshot, addDoc, doc, deleteDoc, Timestamp } from '@react-native-firebase/firestore';
import { getApp } from '@react-native-firebase/app';

export interface Task {
  id: string;
  title: string;
  description: string;
  category: string;
  dueDate: Date;
  reminderDate: Date;
}

interface TaskContextProps {
  tasks: Task[];
  addTask: (task: Omit<Task, 'id'>) => Promise<void>;
  deleteTask: (id: string) => Promise<void>;
}

const TaskContext = createContext<TaskContextProps | undefined>(undefined);

export const TaskProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const authInstance = getAuth(getApp());
  const [currentUser, setCurrentUser] = useState(authInstance.currentUser);

  useEffect(() => {
    const unsubscribeAuth = onAuthStateChanged(authInstance, (user: FirebaseAuthTypes.User | null) => {
      setCurrentUser(user);
    });
    return unsubscribeAuth;
  }, [authInstance]);

  useEffect(() => {
    if (!currentUser) return;

    const db = getFirestore(getApp());
    const tasksCollection = collection(db, 'tasks');
    const q = query(tasksCollection, where('userId', '==', currentUser.uid));
    const unsubscribe = onSnapshot(q, snapshot => {
      const fetchedTasks: Task[] = snapshot.docs.map(docSnap => {
        const data = docSnap.data();
        return {
          id: docSnap.id,
          title: data.title,
          description: data.description,
          category: data.category,
          dueDate: data.dueDate.toDate(),
          reminderDate: data.reminderDate.toDate(),
        };
      });
      setTasks(fetchedTasks);
    });

    return () => unsubscribe();
  }, [currentUser]);

  const addTask = async (task: Omit<Task, 'id'>) => {
    if (!currentUser) return;
    try {
      const db = getFirestore(getApp());
      const tasksCollection = collection(db, 'tasks');
      await addDoc(tasksCollection, {
        ...task,
        userId: currentUser.uid,
        dueDate: Timestamp.fromDate(task.dueDate),
        reminderDate: Timestamp.fromDate(task.reminderDate),
      });
    } catch (error) {
      console.error('Error adding task:', error);
    }
  };

  const deleteTask = async (id: string) => {
    try {
      const db = getFirestore(getApp());
      const taskDoc = doc(db, 'tasks', id);
      await deleteDoc(taskDoc);
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };

  return (
    <TaskContext.Provider value={{ tasks, addTask, deleteTask }}>
      {children}
    </TaskContext.Provider>
  );
};

export const useTaskContext = () => {
  const context = useContext(TaskContext);
  if (!context) {
    throw new Error('useTaskContext must be used within a TaskProvider');
  }
  return context;
};
