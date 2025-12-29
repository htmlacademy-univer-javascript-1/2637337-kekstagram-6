const addCloseHandlers = (element, close) => {
  const button = element.querySelector('button');
  if (button) {
    button.addEventListener('click', close);
  }

  element.addEventListener('click', (evt) => {
    if (evt.target === element) {
      close();
    }
  });
};

const showMessage = (templateId, buttonSelector) => {
  const template = document.querySelector(templateId);
  const element = template.content.cloneNode(true).firstElementChild;


  const onEscKeydown = (evt) => {
    if (evt.key === 'Escape') {
      evt.preventDefault();
      close();
    }
  };


  function close() {
    element.remove();
    document.removeEventListener('keydown', onEscKeydown);
  }

  document.body.append(element);

  addCloseHandlers(element, close);

  const button = element.querySelector(buttonSelector);
  if (button) {
    button.addEventListener('click', close);
  }

  document.addEventListener('keydown', onEscKeydown);
};

const showSuccessMessage = () => showMessage('#success', '.success__button');
const showErrorMessage = () => showMessage('#error', '.error__button');

export { showSuccessMessage, showErrorMessage };
