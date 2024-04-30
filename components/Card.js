class Card {
  constructor(data, cardSelector, handleImageClick) {
    this._name = data.name;
    this._link = data.link;
    this._cardSelector = cardSelector;
    this._handleImageClick = handleImageClick;
  }

  getCard() {
    this._cardElement = document
      .querySelector(this._cardSelector)
      .content.querySelector(".card")
      .cloneNode(true);
    this._cardImageElement = this._cardElement.querySelector(".card__image");
    this._cardImageElement.src = this._link;
    this._cardImageElement.alt = this._name;
    this._cardImageName = this._cardElement.querySelector(".card__title");
    this._cardImageName.textContent = this._name;
    this._setEventListeners();
    return this._cardElement;
  }

  _setEventListeners() {
    this._cardElement
      .querySelector(".card__like-button")
      .addEventListener("click", () => this._handleLikeButton());

    this._cardElement
      .querySelector(".card__delete-button")
      .addEventListener("click", () => this._handleDeleteButton());

    this._cardElement
      .querySelector(".card__image")
      .addEventListener("click", () => this._handleImageClick(this));
  }

  _handleLikeButton() {
    this._cardElement
      .querySelector(".card__like-button")
      .classList.toggle("card__like-button_active");
  }

  _handleDeleteButton() {
    this._cardElement.remove();
  }
}

export default Card;
