import { useListManager } from "../../hook/ListManager";
import { Input } from "../Input";
import styles from "./styles.module.css";

type FormHandler = React.FormEventHandler<HTMLFormElement>

export const Form = () => {
  const { addTask } = useListManager();

  const handleSubmit: FormHandler = (event) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const data = {};

    formData.forEach((value, key) => Object.assign(data, { [key]: value }));

    addTask(data as Task);
  }

  return (
    <form className={styles.container} onSubmit={handleSubmit}>
      <div>
        <Input
          required
          name="name"
          title="Nome da tarefa"
        />
        <Input
          step="1"
          required
          name="time"
          type="time"
          min="00:00:00"
          max="01:30:00"
          title="Tempo da tarefa"
        />
      </div>
      <button type="submit">Adicionar</button>
    </form>
  );
}
