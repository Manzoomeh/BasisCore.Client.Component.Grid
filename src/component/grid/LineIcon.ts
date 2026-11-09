interface LineIconDefinition {
  name: string;
  size: number;
}

const icons: Record<string, LineIconDefinition> = require("../../asset/line-icons.json");

export default function lineIcon(key: string, size?: number): HTMLElement {
  const definition = icons[key];
  const node = document.createElement("i");
  node.className = `lni ${definition.name}`;
  node.style.fontSize = `${size ?? definition.size}px`;
  node.setAttribute("aria-hidden", "true");
  return node;
}
