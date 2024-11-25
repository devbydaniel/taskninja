import exec from "../util/exec";
import { TaskStatus, type Task, type TaskCreateFields } from "../models/types";

const builtInTags = [
  "ACTIVE",
  "ANNOTATED",
  "BLOCKED",
  "BLOCKING",
  "CHILD",
  "COMPLETED",
  "DELETED",
  "DUE",
  "DUETODAY",
  "INSTANCE",
  "LATEST",
  "MONTH",
  "ORPHAN",
  "OVERDUE",
  "PARENT",
  "PENDING",
  "PRIORITY",
  "PROJECT",
  "QUARTER",
  "READY",
  "SCHEDULED",
  "TAGGED",
  "TEMPLATE",
  "TODAY",
  "TOMORROW",
  "UDA",
  "UNBLOCKED",
  "UNTIL",
  "WAITING",
  "WEEK",
  "YEAR",
  "YESTERDAY",
  "next",
  "nocal",
  "nocolor",
  "nonag",
];

export async function getProjects(): Promise<string[]> {
  const { stdout, stderr } = await exec("task _projects");
  if (stderr) {
    console.error(stderr);
    //throw new Error(stderr);
  }
  const projects = stdout.split("\n").filter(Boolean);
  return projects;
}

export async function getTags(): Promise<string[]> {
  const { stdout, stderr } = await exec("task _tags");
  if (stderr) {
    console.error(stderr);
    throw new Error(stderr);
  }
  const tags = stdout
    .split("\n")
    .filter(Boolean)
    .filter((tag) => !builtInTags.includes(tag));
  return tags;
}

export async function getProjectTasks(project: string | null): Promise<Task[]> {
  const { stdout, stderr } = await exec(`task project:${project || ""} export`);
  if (stderr) {
    console.error(stderr);
    throw new Error(stderr);
  }
  return JSON.parse(stdout).filter(
    (task: Task) =>
      ![TaskStatus.deleted, TaskStatus.completed].includes(task.status),
  );
}

export async function getReportTasks(reportName: string): Promise<Task[]> {
  const { stdout, stderr } = await exec(`task export ${reportName}`);
  if (stderr) {
    console.error(stderr);
    throw new Error(stderr);
  }
  return JSON.parse(stdout);
}

export async function createTask({
  description,
  project,
  tags,
  scheduled,
  due,
}: TaskCreateFields): Promise<void> {
  const { stderr } = await exec(
    `task add ${description} ${project ? `project:${project}` : ""} ${tags ? `${tags.map((tag) => `+${tag}`).join(" ")}` : ""} ${scheduled ? `scheduled:${scheduled}` : ""} ${due ? `due:${due}` : ""}`,
  );
  if (stderr) {
    if (stderr.includes("has changed.")) return;
    console.error(stderr);
    throw new Error(stderr);
  }
}

export async function updateTask(
  taskUuid: string,
  key: string,
  newValue: "pending" | "completed",
): Promise<void> {
  const { stderr } = await exec(`task modify ${taskUuid} ${key}:${newValue}`);
  if (stderr && !stderr.includes("You have more urgent tasks")) {
    console.error("stderr:", stderr);
  }
}

export async function updateTaskWithCommand(
  taskUuid: string,
  command: string,
): Promise<void> {
  const { stderr } = await exec(`task ${taskUuid} modify ${command}`);
  if (stderr) {
    console.error("stderr:", stderr);
  }
}

export async function deleteTask(taskUuid: string): Promise<void> {
  const { stderr } = await exec(`task modify ${taskUuid} status:deleted`);
  if (stderr) {
    console.error("stderr:", stderr);
  }
}
