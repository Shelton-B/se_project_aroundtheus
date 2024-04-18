function showInputError(
  formElement,
  { inputErrorClass, errorClass },
  inputElement
) {
  const errorMessageElement = formElement.querySelector(
    `#${inputElement.id}-error`
  );
  inputElement.classList.add(inputErrorClass);
  errorMessageElement.textContent = inputElement.validationMessage;
  errorMessageElement.classList.add(errorClass);
}

function hideInputError(
  formElement,
  { inputErrorClass, errorClass },
  inputElement
) {
  const errorMessageElement = formElement.querySelector(
    `#${inputElement.id}-error`
  );
  inputElement.classList.remove(inputErrorClass);
  errorMessageElement.textContent = "";
  errorMessageElement.classList.remove(errorClass);
}

function checkInputValidity(formElement, options, inputElement) {
  if (!inputElement.validity.valid) {
    return showInputError(formElement, options, inputElement);
  }
  hideInputError(formElement, options, inputElement);
}

// function toggleButtonState(
//   inputElements,
//   submitButton,
//   { inactiveButtonClass }
// ) {
//   let foundInvalid = false;
//   inputElements.forEach((inputElement) => {
//     if (!inputElement.validity.valid) {
//       foundInvalid = true;
//     }
//   });
//   if (foundInvalid) {
//     submitButton.classList.add(inactiveButtonClass);
//     return (submitButton.disabled = true);
//   }
//   submitButton.classList.remove(inactiveButtonClass);
//   submitButton.disabled = false;
// }

const toggleButtonState = (
  inputElements,
  submitButtonSelector,
  { inactiveButtonClass }
) => {
  const checkFormValidity = (inputs) =>
    inputs.every((input) => input.validity.valid);
  const isFormValid = checkFormValidity(inputElements);

  if (!isFormValid) {
    submitButtonSelector.classList.add(inactiveButtonClass);
    submitButtonSelector.disabled = true;
  } else {
    submitButtonSelector.classList.remove(inactiveButtonClass);
    submitButtonSelector.disabled = false;
  }
};

function setEventListeners(formElement, options) {
  const inputSelector = options.inputSelector;
  const inputElements = Array.from(
    formElement.querySelectorAll(options.inputSelector)
  );

  const submitButtonSelector = formElement.querySelector(".modal__button");
  inputElements.forEach((inputElement) => {
    inputElement.addEventListener("input", (evt) => {
      checkInputValidity(formElement, options, inputElement);
      toggleButtonState(inputElements, submitButtonSelector, options);
    });
  });
}

function enableValidation(options) {
  const formElements = Array.from(document.querySelectorAll(".modal__form"));
  formElements.forEach((formElement) => {
    formElement.addEventListener("submit", (evt) => {
      evt.preventDefault();
    });
    setEventListeners(formElement, options);
  });
}

const config = {
  formSelector: ".modal__form",
  inputSelector: ".modal__input",
  submitButtonSelector: ".modal__button",
  inactiveButtonClass: "modal__button_disabled",
  inputErrorClass: "modal__input_type_error",
  errorClass: "modal__error_visible",
};

enableValidation(config);
