// dom helpers
export const byId = (id: string) => document.getElementById(id);

export const createElement = (tag: string) => (props: Record<string, any>, children: Array<HTMLElement|string> = []): HTMLElement => {
  const el = document.createElement(tag);
  Object.entries(props).forEach(([key, value]) => {
    el[key] = value;
  });
  children.forEach(child => {
    if (typeof child === "string") {
      el.appendChild(document.createTextNode(child))
    } else {
      el.appendChild(child)
    }
  })
  return el;
} 

export const div = createElement("div");
