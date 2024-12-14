import { ETaskStatus } from "@/enums";
import { Task } from "@/interfaces";
import { createContext, useContext, useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";

interface TaskOrganizerContextProps {
  tasks: Task[];
  createTask: (title: string, description: string) => void;
  getTasks: () => Task[];
  updateTaskTitle: (id: string, newTitle: string) => void;
  updateTaskDescription: (id: string, newDescription: string) => void;
  removeTask: (id: string) => void;
  toggleTaskStatus: (id: string) => void;
}

const TaskOrganizerContext = createContext<
  TaskOrganizerContextProps | undefined
>(undefined);

const STORAGE_KEY = "tasks-organizer";

const getStoredTasks = (): Task[] => {
  const tasks = localStorage.getItem(STORAGE_KEY);
  return tasks ? JSON.parse(tasks) : [];
};

interface TaskOrganizerProps {
  children: React.ReactNode;
}

export const TaskOrganizerProviver = ({ children }: TaskOrganizerProps) => {
  const [tasks, setTasks] = useState<Task[]>(getStoredTasks);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
  }, [tasks]);

  const createTask = (title: string, description: string) => {
    const newTask: Task = {
      id: uuidv4(),
      title: title.trim(),
      description: description.trim(),
      status: ETaskStatus.PENDING,
    };
    setTasks((prevTasks) => [...prevTasks, newTask]);
  };

  const getTasks = (): Task[] => {
    return tasks;
  };

  const updateTaskTitle = (id: string, newTitle: string) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === id ? { ...task, title: newTitle.trim() } : task
      )
    );
  };

  const updateTaskDescription = (id: string, newDescription: string) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === id ? { ...task, description: newDescription.trim() } : task
      )
    );
  };

  const removeTask = (id: string) => {
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
  };

  const toggleTaskStatus = (id: string) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === id
          ? {
              ...task,
              status:
                task.status === ETaskStatus.PENDING
                  ? ETaskStatus.COMPLETED
                  : ETaskStatus.PENDING,
            }
          : task
      )
    );
  };

  return (
    <TaskOrganizerContext.Provider
      value={{
        tasks,
        createTask,
        getTasks,
        updateTaskTitle,
        updateTaskDescription,
        removeTask,
        toggleTaskStatus,
      }}
    >
      {children}
    </TaskOrganizerContext.Provider>
  );
};

export const useTaskOrganizer = (): TaskOrganizerContextProps => {
  const context = useContext(TaskOrganizerContext);
  if (!context) {
    throw new Error(
      "useTaskOrganizer must be used within a TaskOrganizerProvider"
    );
  }
  return context;
};
