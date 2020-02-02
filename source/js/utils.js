export const createDomElement = (markup) => {
  const element = document.createElement(`div`);
  element.innerHTML = markup;
  return element.firstChild;
}

export const renderMarkup = (container, domElement, where, withoutGetElement = false) => {
  switch (where) {
    case INSERT_POSITION.AFTER:
      if (withoutGetElement) {
        container.prepend(createDomElement(domElement));
      } else {
        container.prepend(domElement.getElement());
      }
      break;
    case INSERT_POSITION.BEFORE:
      if (withoutGetElement) {
        container.append(createDomElement(domElement));
      } else {
        container.append(domElement.getElement());
      }
      break;
  }
}

const INSERT_POSITION = {
  AFTER: `afterbegin`,
  BEFORE: `beforeend`,
}
