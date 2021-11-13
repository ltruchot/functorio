// dom helpers
export const byId = (id: string) => document.getElementById(id);

type FnCreateElement = (tag: string) => (
  (props: Record<string, any>, children?: Array<HTMLElement | string>) => HTMLElement 
);
export const createElement: FnCreateElement = (tag) => (props, children = []): HTMLElement => {
  const el = Object.assign(document.createElement(tag), props);
  children.forEach(child => {
    if (typeof child === 'string') {
      el.appendChild(document.createTextNode(child));
    } else {
      el.appendChild(child);
    }
  });
  return el;
}; 

export const div = createElement('div');
export const button = createElement('button');
