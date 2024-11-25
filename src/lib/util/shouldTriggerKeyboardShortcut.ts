export default function shouldTriggerKeyboardShortcut(
  e: KeyboardEvent,
): boolean {
  const target = e.target as HTMLElement;
  return !(
    target instanceof HTMLInputElement ||
    target instanceof HTMLTextAreaElement ||
    target instanceof HTMLSelectElement ||
    target.isContentEditable
  );
}
