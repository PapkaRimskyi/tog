export const createDomElement = (markup) => {
  const element = document.createElement(`div`);
  element.innerHTML = markup;
  return element.firstChild;
}

export const renderMarkup = (container, domElement, where) => {
  switch (where) {
    case INSERT_POSITION.AFTER:
      container.prepend(domElement.getElement());
      break;
    case INSERT_POSITION.BEFORE:
      container.append(domElement.getElement());
      break;
  }
}

const INSERT_POSITION = {
  AFTER: `afterbegin`,
  BEFORE: `beforeend`,
}
