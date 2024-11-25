type CustomEventInfo = {
  eventName: string;
  trigger: Function;
};

export const confirmationModal: CustomEventInfo = {
  eventName: "custom:confirmation-modal",
  trigger: (onConfirm: () => void) => {
    const random = Math.random().toString(36).substring(7);
    const confirmEvent = `custom:confirmation-modal:${random}`;
    document.dispatchEvent(
      new CustomEvent(confirmationModal.eventName, {
        detail: {
          confirmEvent,
        },
      }),
    );
    document.addEventListener(confirmEvent, onConfirm, { once: true });
  },
};
