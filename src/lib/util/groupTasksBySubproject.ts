import type { Task } from "../models/types";

export default function groupTasksBySubProject({
  tasks,
  noSubProjectLabel,
}: {
  tasks: Task[];
  noSubProjectLabel: string;
}): Record<string, Task[]> {
  const tasksBySubproject: Record<string, Task[]> = {};
  tasks.forEach((task) => {
    const projectArr = task.project?.split(".");
    let subProject = "";
    if (!projectArr || projectArr.length === 1) {
      // task has no project or no subproject
      subProject = noSubProjectLabel;
    } else {
      subProject = projectArr[1];
    }
    if (!tasksBySubproject[subProject]) {
      tasksBySubproject[subProject] = [];
    }
    tasksBySubproject[subProject].push(task);
  });
  return tasksBySubproject;
}
