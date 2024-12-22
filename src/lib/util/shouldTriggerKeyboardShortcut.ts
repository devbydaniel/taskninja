export default function shouldTriggerKeyboardShortcut(
  e: KeyboardEvent,
): boolean {
  // do not trigger keyboard shortcuts while the user is typing something
  const target = e.target as HTMLElement;
  return !(
    target instanceof HTMLInputElement ||
    target instanceof HTMLTextAreaElement ||
    target instanceof HTMLSelectElement ||
    target.isContentEditable
  );
}
