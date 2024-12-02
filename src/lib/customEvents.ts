import { type Task } from "./models/types";

export type CustomEventInfo = {
  eventName: string;
  trigger: Function;
};

type ConfirmationModalTriggerProps = {
  message: string;
  onConfirm: () => void;
};
export const confirmationModal: CustomEventInfo = {
  eventName: "custom:confirmation-modal",
  trigger: ({ message, onConfirm }: ConfirmationModalTriggerProps) => {
    const random = Math.random().toString(36).substring(7);
    const confirmEvent = `custom:confirmation-modal:${random}`;
    // dispatch an event with a unique confirm event
    document.dispatchEvent(
      new CustomEvent(confirmationModal.eventName, {
        detail: {
          message,
          confirmEvent,
        },
      }),
    );
    // listen to the confirm event (dispatched by the modal) and call onConfirm
    document.addEventListener(confirmEvent, onConfirm, { once: true });
  },
};

export const newTaskModal: CustomEventInfo = {
  eventName: "custom:new-task-modal",
  trigger: () => {
    document.dispatchEvent(new Event(newTaskModal.eventName));
  },
};

type EditTaskModalTriggerProps = {
  task: Task;
};
export const editTaskModal: CustomEventInfo = {
  eventName: "custom:edit-task-modal",
  trigger: ({ task }: EditTaskModalTriggerProps) => {
    document.dispatchEvent(
      new CustomEvent(editTaskModal.eventName, {
        detail: {
          task,
        },
      }),
    );
  },
};

type MoveToProjectModalTriggerProps = {
  task: Task;
};
export const moveToProjectModal: CustomEventInfo = {
  eventName: "custom:move-to-project-modal",
  trigger: ({ task }: MoveToProjectModalTriggerProps) => {
    document.dispatchEvent(
      new CustomEvent(moveToProjectModal.eventName, {
        detail: {
          task,
        },
      }),
    );
  },
};

type EditTagsModalTriggerProps = {
  task: Task;
};
export const editTagsModal: CustomEventInfo = {
  eventName: "custom:edit-tags-modal",
  trigger: ({ task }: EditTagsModalTriggerProps) => {
    document.dispatchEvent(
      new CustomEvent(editTagsModal.eventName, {
        detail: {
          task,
        },
      }),
    );
  },
};

type ScheduleDueModalTriggerProps = {
  task: Task;
};
export const scheduleDueModal: CustomEventInfo = {
  eventName: "custom:schedule-due-modal",
  trigger: ({ task }: ScheduleDueModalTriggerProps) => {
    document.dispatchEvent(
      new CustomEvent(scheduleDueModal.eventName, {
        detail: {
          task,
        },
      }),
    );
  },
};

type TaskDetailsPanelTriggerProps = {
  task: Task;
};
export const taskDetailsPanel: CustomEventInfo = {
  eventName: "custom:task-details-panel",
  trigger: ({ task }: TaskDetailsPanelTriggerProps) => {
    document.dispatchEvent(
      new CustomEvent(taskDetailsPanel.eventName, {
        detail: {
          task,
        },
      }),
    );
  },
};

type ErrorTriggerProps = {
  message: string;
};
export const errorAlert: CustomEventInfo = {
  eventName: "custom:error",
  trigger: ({ message }: ErrorTriggerProps) => {
    document.dispatchEvent(
      new CustomEvent(errorAlert.eventName, {
        detail: {
          message,
        },
      }),
    );
  },
};
