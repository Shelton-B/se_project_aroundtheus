import Popup from "./Popup.js";

export default class PopupDelete extends Popup {
  constructor({ popupSelector }) {
    super({ popupSelector });
    this._deletePopup = this._popupElement.querySelector("#modal__confirm");
    this._buttonElement = this._deletePopup.querySelector(".modal__button");
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

  renderDelete(isDeleting) {
    if (isDeleting) {
      this._buttonElement.textContent = "Deleting...";
    } else {
      this._buttonElement.textContent = "Yes";
    }
  }
}
