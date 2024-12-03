import type { Task } from "../models/types";

export default function groupTasksBySubProject({
  tasks,
  project,
  noSubProjectLabel,
}: {
  tasks: Task[];
  project: string;
  noSubProjectLabel: string;
}): Record<string, Task[]> {
  const tasksBySubproject: Record<string, Task[]> = {};
  tasks.forEach((task) => {
    const projectPath = project.split(".");
    const taskProjectPath = task.project?.split(".");
    const taskSubProjectPath = taskProjectPath?.slice(
      projectPath.length,
      taskProjectPath.length,
    );
    let subProject = "";
    if (!taskSubProjectPath || taskSubProjectPath.length === 0) {
      // task has no subproject
      subProject = noSubProjectLabel;
    } else {
      subProject = taskSubProjectPath[0];
    }
    if (!tasksBySubproject[subProject]) {
      tasksBySubproject[subProject] = [];
    }
    tasksBySubproject[subProject].push(task);
  });
  return tasksBySubproject;
}
