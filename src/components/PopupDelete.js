import Popup from "./Popup.js";

export default class PopupDelete extends Popup {
  constructor({ popupSelector }) {
    super({ popupSelector });
  }

  setEventListeners() {
    this._popupElement
      .querySelector(".modal__button")
      .addEventListener("click", () => {
        this._handleDelete();
      });
    super.setEventListeners();
  }

  setSubmitAction(handleDelete) {
    this._handleDelete = handleDelete;
  }
}
