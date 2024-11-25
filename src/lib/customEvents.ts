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
    console.log("confirmationModal.trigger");
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
