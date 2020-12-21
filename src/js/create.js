const create = (tag, text, child, calssnames) => {
  const element = document.createElement(tag);

  if (calssnames) {
    element.classList.add(...calssnames.split(' '));
  }

  if (child && Array.isArray(child)) {
    child.forEach((childElement) => childElement && element.appendChild(childElement));
  } else if (child && typeof child === 'object') {
    element.appendChild(child);
  } else if (child && typeof child === 'string') {
    element.textContent = child;
  }

  if (text) {
    element.textContent = text;
  }

  return element;
};

export { create };
