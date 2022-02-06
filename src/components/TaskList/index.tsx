import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { useListManager } from "../../hook/ListManager";
import { Task } from "../Task";
import styles from "./styles.module.css";


export const TaskList = () => {
  const { tasks } = useListManager();
  return (
    <DndProvider backend={HTML5Backend}>
      <section className={styles.container}>
        <h2>Lista de Tarefas</h2>
        <ul>
          {tasks.map((task, index) => (
            <Task key={task.id} task={task} index={index} />
          ))}
        </ul>
      </section>
    </DndProvider>
  );
}
