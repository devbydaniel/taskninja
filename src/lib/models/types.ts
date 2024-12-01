export enum TaskStatus {
  pending = "pending",
  completed = "completed",
  deleted = "deleted",
  recurring = "recurring",
}
export type TaskCreateFields = {
  description: string;
  project?: string;
  tags?: string[];
  scheduled?: string;
  due?: string;
};
export type Task = {
  id: number;
  entry: string;
  modified: string;
  status: TaskStatus;
  uuid: string;
  urgency: number;
  annotations?: { entry: string; description: string }[];
} & TaskCreateFields;
