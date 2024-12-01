export default function addSelectOptions(
  el: HTMLSelectElement,
  options: { value: string; text: string; selected?: boolean }[],
) {
  el.innerHTML = "";
  options.forEach(({ value, text, selected }) => {
    const optionEl = document.createElement("option");
    optionEl.value = value;
    optionEl.text = text;
    if (selected) {
      optionEl.selected = true;
    }
    el.appendChild(optionEl);
  });
}
