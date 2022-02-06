import { createContext, FC, useCallback, useContext, useEffect, useState } from "react";

type MoveItem = (from: number, to: number) => void;

type ListManagerContext = {
  tasks: SerializedTask[];
  addTask: (task: Task) => void;
  move: MoveItem;
};

const Context = createContext<ListManagerContext>({} as ListManagerContext);

export const ListManagerProvider: FC = ({ children }) => {
  const [tasks, setTasks] = useState<SerializedTask[]>([
    { id: '1', name: 'Tarefa 1', time: '00:15:00', completed: false, selected: false },
    { id: '2', name: 'Tarefa 2', time: '00:15:00', completed: false, selected: false },
    { id: '3', name: 'Tarefa 3', time: '00:15:00', completed: false, selected: false },
    { id: '4', name: 'Tarefa 4', time: '00:15:00', completed: false, selected: false },
    { id: '5', name: 'Tarefa 5', time: '00:15:00', completed: false, selected: false },
  ]);

  const addTask = ({ name, time }: Task) => {
    const id = `${Math.floor(Math.random() * 100 + 1)}`;
    setTasks(prev => [...prev, { id, name, time, completed: false, selected: false }]);
  }

  const move: MoveItem = (from, to) => {
    const dragged = tasks[from];

    tasks.splice(from, 1);
    tasks.splice(to, 0, dragged);

    setTasks([...tasks]);
  };

  return (
    <Context.Provider value={{ tasks, addTask, move }}>
      {children}
    </Context.Provider>
  )
}

export const useListManager = () => {
  const context = useContext(Context);
  if (!context) throw new Error("Use useListManager inside ListManagerProvider");
  return context;
}
