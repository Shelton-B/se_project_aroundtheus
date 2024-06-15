class Card {
  constructor(
    data,
    cardSelector,
    handleImageClick,
    handleDeleteCard,
    handleLikeCard
  ) {
    this.name = data.name;
    this.link = data.link;
    this._cardSelector = cardSelector;
    this._handleImageClick = handleImageClick;
    this._handleDeleteCard = handleDeleteCard;
    this.id = data._id;
    this._isLiked = data.isLiked;
    this._handleLikeCard = handleLikeCard;
  }

  getCard() {
    this._cardElement = document
      .querySelector(this._cardSelector)
      .content.querySelector(".card")
      .cloneNode(true);
    this._cardImageElement = this._cardElement.querySelector(".card__image");
    this._cardImageElement.src = this.link;
    this._cardImageElement.alt = this.name;
    this._cardImageName = this._cardElement.querySelector(".card__title");
    this._cardImageName.textContent = this.name;
    this._likeButton = this._cardElement.querySelector(".card__like-button");
    this._deleteButton = this._cardElement.querySelector(
      ".card__delete-button"
    );
    this._handleLikeStatus();
    this._setEventListeners();
    return this._cardElement;
  }

  _setEventListeners() {
    this._likeButton.addEventListener("click", () => {
      console.log("test", this);
      this._handleLikeCard(this);
    });

    this._deleteButton.addEventListener("click", () =>
      this._handleDeleteCard(this)
    );

    this._cardImageElement.addEventListener("click", () =>
      this._handleImageClick(this)
    );
  }

  _handleLikeStatus() {
    if (this.isLiked()) {
      this._likeButton.classList.add("card__like-button_active");
    } else {
      this._likeButton.classList.remove("card__like-button_active");
    }
  }

  updateLikesView() {
    this._likeButton.classList.toggle("card__like-button_active");
  }

  isLiked() {
    return this._isLiked;
  }

  handleDelete() {
    this._cardElement.remove();
  }
}

export default Card;
