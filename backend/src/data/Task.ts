export interface Task {
  id: number;
  title: string;
  done: boolean;
}

export let tasks: Task[] = [
  {
    id: 1,
    title: "Learn React",
    done: false,
  },
  {
    id: 2,
    title: "Learn Node.js",
    done: false,
  },
  {
    id: 3,
    title: "Build my first API",
    done: true,
  },
];