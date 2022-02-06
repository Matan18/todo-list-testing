type SerializedTask = Task & {
  id: string;
  selected: boolean;
  completed: boolean;
}

type Task = {
  name: string;
  time: string;
}
