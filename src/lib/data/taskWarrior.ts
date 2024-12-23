import exec from "../util/exec";
import { TaskStatus, type Task, type TaskCreateFields } from "../models/types";

const COMMAND = "task rc.verbose=no";

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

function isFalseAlarm(stdErr: string): boolean {
  return (
    stdErr.includes("has changed.") ||
    stdErr.includes("No matches.") ||
    stdErr.includes("You have more urgent tasks")
  );
}

function filterForDisplay(task: Task): boolean {
  return ![
    TaskStatus.deleted,
    TaskStatus.completed,
    TaskStatus.recurring,
  ].includes(task.status);
}

export function getReports(): string[] {
  const REPORTS = import.meta.env.REPORTS;
  if (REPORTS) {
    return REPORTS.split(",");
  }
  return ["next", "ready", "list", "blocked", "blocking", "waiting"];
}

export async function getProjects(): Promise<string[]> {
  const { stdout, stderr } = await exec(COMMAND + " _projects");
  if (stderr && !isFalseAlarm(stderr)) {
    console.error("stderr in getProjects: ", stderr);
    throw new Error(stderr);
  }
  const projects = stdout.split("\n").filter(Boolean);
  return projects;
}

export async function getTags(): Promise<string[]> {
  const { stdout, stderr } = await exec(COMMAND + " _tags");
  if (stderr && !isFalseAlarm(stderr)) {
    console.error("stderr in getTags: ", stderr);
    throw new Error(stderr);
  }
  const tags = stdout
    .split("\n")
    .filter(Boolean)
    .filter((tag) => !builtInTags.includes(tag));
  return tags;
}

export async function getProjectTasks(project: string | null): Promise<Task[]> {
  const { stdout, stderr } = await exec(
    `${COMMAND} project:${project || ""} export`,
  );
  if (stderr && !isFalseAlarm(stderr)) {
    console.error("stderr in getProjectTasks: ", stderr);
    throw new Error(stderr);
  }
  return JSON.parse(stdout).filter(filterForDisplay);
}

export async function getReportTasks(reportName: string): Promise<Task[]> {
  const { stdout, stderr } = await exec(`${COMMAND} export ${reportName}`);
  if (stderr && !isFalseAlarm(stderr)) {
    console.error("stderr in getReportTasks: ", stderr);
    throw new Error(stderr);
  }
  return JSON.parse(stdout).filter(filterForDisplay);
}

export async function createTask({
  description,
  project,
  tags,
  scheduled,
  due,
}: TaskCreateFields): Promise<void> {
  const execCommand = `${COMMAND} add ${description} ${project ? `project:${project}` : ""} ${tags ? `${tags.map((tag) => `+${tag}`).join(" ")}` : ""} ${scheduled ? `scheduled:${scheduled}` : ""} ${due ? `due:${due}` : ""}`;
  const { stderr } = await exec(execCommand);
  if (stderr && !isFalseAlarm(stderr)) {
    if (stderr.includes("has changed.")) return;
    console.error("stderr in createTask: ", stderr);
    throw new Error(stderr);
  }
}

export async function updateTask(
  taskUuid: string,
  key: string,
  newValue: string,
): Promise<void> {
  const { stderr } = await exec(
    `${COMMAND} modify ${taskUuid} ${key}:${newValue}`,
  );
  if (stderr && !isFalseAlarm(stderr)) {
    console.error("stderr in updateTask: ", stderr);
    throw new Error(stderr);
  }
}

export async function completeTask(taskUuid: string): Promise<void> {
  const { stderr } = await exec(`${COMMAND} ${taskUuid} done`);
  if (stderr && !isFalseAlarm(stderr)) {
    console.error("stderr in completeTask: ", stderr);
    throw new Error(stderr);
  }
}

export async function updateTaskWithCommand(
  taskUuid: string,
  command: string,
): Promise<void> {
  const { stderr } = await exec(`${COMMAND} ${taskUuid} modify ${command}`);
  if (stderr && !isFalseAlarm(stderr)) {
    console.error("stderr in updateTaskWithCommand: ", stderr);
    throw new Error(stderr);
  }
}

export async function getAnnotations(
  taskUuid: string,
): Promise<{ entry: string; description: string }[]> {
  const { stdout, stderr } = await exec(`${COMMAND} ${taskUuid} export`);
  if (stderr && !isFalseAlarm(stderr)) {
    console.error("stderr in getAnnotations: ", stderr);
    throw new Error(stderr);
  }
  const tasks = JSON.parse(stdout) as Task[];
  const task = tasks[0];
  return task.annotations || [];
}

export async function annotateTask(
  taskUuid: string,
  annotation: string,
): Promise<void> {
  const { stderr } = await exec(
    `${COMMAND} annotate ${taskUuid} ${annotation}`,
  );
  if (stderr && !isFalseAlarm(stderr)) {
    console.error("stderr in annotateTask: ", stderr);
    throw new Error(stderr);
  }
}

export async function deleteTask(taskUuid: string): Promise<void> {
  const { stderr } = await exec(`${COMMAND} modify ${taskUuid} status:deleted`);
  if (stderr && !isFalseAlarm(stderr)) {
    console.error("stderr in deleteTask: ", stderr);
    throw new Error(stderr);
  }
}
