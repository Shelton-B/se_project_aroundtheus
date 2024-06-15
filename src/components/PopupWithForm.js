import Popup from "./Popup.js";

class PopupWithForm extends Popup {
  constructor({ popupSelector }, handleFormSubmit) {
    super({ popupSelector });
    this._handleFormSubmit = handleFormSubmit;
    this._popupForm = this._popupElement.querySelector(".modal__form");
    this._inputElements = this._popupForm.querySelectorAll(".modal__input");
    this._buttonElement = this._popupForm.querySelector(".modal__button");
  }

  open() {
    super.open();
  }

  close() {
    super.close();
    this._popupForm.reset();
  }

  _getInputValues() {
    const inputValues = {};
    this._inputElements.forEach((input) => {
      inputValues[input.name] = input.value;
    });
    return inputValues;
  }

  setEventListeners() {
    this._popupForm.addEventListener("submit", (evt) => {
      evt.preventDefault();
      this._handleFormSubmit(this._getInputValues());
    });
    super.setEventListeners();
  }

  renderLoading(isLoading) {
    if (isLoading) {
      this._buttonElement.textContent = "Saving...";
    } else {
      this._buttonElement.textContent = "Save";
    }
  }
}

export default PopupWithForm;
