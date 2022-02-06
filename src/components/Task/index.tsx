import { useRef } from "react";
import { useDrag, useDrop } from "react-dnd";
import { useListManager } from "../../hook/ListManager";
import styles from "./styles.module.css";

type Props = {
  task: SerializedTask;
  index: number;
};

export const Task = ({ task: { name, time, completed, selected }, index }: Props) => {
  const { move } = useListManager();
  const ref = useRef<HTMLLIElement>(null);

  const [{ isDragging }, dragRef] = useDrag({
    type: 'TASK',
    item: { type: 'TASK', index },
    collect: monitor => ({
      isDragging: monitor.isDragging(),
    })
  })

  const [, dropRef] = useDrop({
    accept: 'TASK',
    hover: (item: { id: string, index: number }, monitor) => {
      const draggedIndex = item.index;
      const targetIndex = index;

      if (draggedIndex === targetIndex) return;

      const targetSize = ref.current?.getBoundingClientRect();
      const draggedOffset = monitor.getClientOffset();

      if (!targetSize || !draggedOffset) return;

      const targetCenter = (targetSize.bottom - targetSize.top) / 2;

      const draggedTop = draggedOffset.y - targetSize.top;

      if (
        (draggedIndex < targetIndex && draggedTop < targetCenter) ||
        (draggedIndex > targetIndex && draggedTop > targetCenter)
      ) return;

      move(draggedIndex, targetIndex);

      item.index = targetIndex;
    }
  })

  dragRef(dropRef(ref));

  return (
    <li className={styles.container} data-dragging={isDragging} ref={ref}>
      <h3>{name}</h3>
      <p><time>{time}</time></p>
      <span>Completed: {completed ? '[X]' : '[ ]'}</span>
      <span>Selected: {selected ? '[X]' : '[ ]'}</span>
    </li>
  )
}
