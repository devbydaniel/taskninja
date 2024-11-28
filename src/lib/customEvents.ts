import { type Task } from "./models/types";

type CustomEventInfo = {
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
    document.dispatchEvent(
      new CustomEvent(confirmationModal.eventName, {
        detail: {
          message,
          confirmEvent,
        },
      }),
    );
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
