import { formatDate, parseDate } from "../util/dates";

type Params = {
  container: HTMLDivElement;
  annotations: Array<{ entry: string; description: string }>;
  itemContainerClassName: string;
  labelClassName?: string;
  contentClassName?: string;
};
export default function addAnnotationMarkup({
  container,
  annotations,
  itemContainerClassName,
  labelClassName,
  contentClassName,
}: Params) {
  container.innerHTML = "";
  annotations
    .sort((a, b) => (a.entry < b.entry ? 1 : -1))
    .forEach(({ entry, description }, i) => {
      const itemContainer = document.createElement("div");
      itemContainer.className = itemContainerClassName;
      itemContainer.id = `annotation-${i}`;

      const label = document.createElement("label");
      label.className = labelClassName || "";
      label.textContent = formatDate(parseDate(entry), {
        variant: "timestamp",
      });
      label.htmlFor = `annotation-${i}`;

      const content = document.createElement("textarea");
      content.className = contentClassName || "";
      content.textContent = description;
      content.readOnly = true;
      content.tabIndex = -1;
      content.style.resize = "none";

      itemContainer.appendChild(label);
      itemContainer.appendChild(content);

      container.appendChild(itemContainer);
    });
}
