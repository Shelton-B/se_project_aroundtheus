import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithImage from "../components/PopupWithImage.js";
import UserInfo from "../components/UserInfo.js";
import Section from "../components/Section.js";
import { config } from "../utils/constants.js";
import "../pages/index.css";
import Api from "../components/API.js";
import PopupDelete from "../components/PopupDelete.js";

const profileEditButton = document.querySelector("#profile-edit-button");
const profileEditModal = document.querySelector("#profile_edit-modal");
const profileNameInput = document.querySelector("#profile-name-input");
const profileDescriptionInput = document.querySelector(
  "#profile-description-input"
);
const profileEditForm = profileEditModal.querySelector(".modal__form");
const cardList = document.querySelector(".cards__list");
const addCardButton = document.querySelector(".profile__add-button");
const addCardModal = document.querySelector("#card-edit-modal");
const addCardForm = addCardModal.querySelector(".modal__form");

const avatarButton = document.querySelector(".profile__avatar-button");
const avatarModal = document.querySelector("#avatar-edit-modal");
const avatarForm = avatarModal.querySelector(".modal__form");

const imagePopUp = new PopupWithImage({ popupSelector: "#preview-modal" });
const popupDelete = new PopupDelete({ popupSelector: "#delete-card-modal" });

const api = new Api({
  baseUrl: "https://around-api.en.tripleten-services.com/v1",
  headers: {
    authorization: "c5770e84-6b43-47e8-8ef9-37352d6891bc",
    "Content-Type": "application/json",
  },
});

const userInfo = new UserInfo({
  nameSelector: ".profile__name",
  descriptionSelector: ".profile__description",
  userAvatar: ".profile__avatar",
});

let cardSection;

api.getInitialCards().then((initialCards) => {
  cardSection = new Section(
    {
      items: initialCards,
      renderer: (data) => {
        const cardElement = new Card(
          data,
          "#card-template",
          handleImageClick,
          handleDelete,
          handleLikeCard
        );
        cardSection.addItem(cardElement.getCard());
      },
    },
    ".cards__list"
  );
  cardSection.renderItems();
});

api.loadUserInfo().then((userData) => {
  userInfo.setUserInfo({
    name: userData.name,
    about: userData.about,
  });
});

/* functions */
const handleImageClick = (data) => {
  imagePopUp.open(data);
};

function handleDelete(card) {
  popupDelete.open();
  popupDelete.setSubmitAction(() => {
    api
      .deleteInitialCards(card.id)
      .then(() => {
        card.handleDelete();
        popupDelete.close();
      })
      .catch((err) => {
        console.error(err);
      });
  });
}

function handleLikeCard(card) {
  console.log(card.isLiked());
  if (!card._isLiked) {
    api
      .likeCard(card.id)
      .then((res) => {
        // console.log(res);
        // card.isLiked = false;
        card.handleLikeStatus();
      })
      .catch((err) => {
        console.error(err);
      });
  } else {
    api
      .unlikeCard(card.id)
      .then((res) => {
        // card.isLiked = true;
        card.handleLikeStatus();
      })
      .catch((err) => {
        console.error(err);
      });
  }
}

function handleAddCardFormSubmit(inputValues) {
  renderCard(inputValues, cardList);
  addCardPopUp.close();
}

function handleProfileCardFormSubmit() {
  // api.editUserInfo().then((data) => {
  //   // handle successful response
  // });
  userInfo.setUserInfo({
    name: profileNameInput.value,
    about: profileDescriptionInput.value,
  });
  editProfilePopUp.close();
}

function createCard(data) {
  const cardElement = new Card(
    data,
    "#card-template",
    handleImageClick,
    handleDelete,
    handleLikeCard
  );
  return cardElement.getCard();
}

function renderCard(data) {
  api.addCard(data).then((data) => {
    const card = createCard(data);
    cardSection.addItem(card);
  });
}

function handleAvatarSubmit(inputValues) {
  api.editAvatar({ avatar: inputValues.link }).then((newAvatar) => {
    userInfo.setAvatar(newAvatar);
    editAvatarPopup.close().catch((err) => {
      console.error(err);
    });
  });
}

/* event listeners */

addCardButton.addEventListener("click", () => {
  addCardPopUp.open();
  addFormValidator.toggleButtonState();
});

// api.editUserInfo().then((data) => {
//   console.log(data);
// });

profileEditButton.addEventListener("click", () => {
  const userInfoData = userInfo.getUserInfo();
  profileNameInput.value = userInfoData.name;
  profileDescriptionInput.value = userInfoData.description;
  editProfilePopUp.open();
  editFormValidator.toggleButtonState();
});

avatarButton.addEventListener("click", () => {
  editAvatarPopup.open();
  avatarFormValidator.toggleButtonState();
});

/* classes */

const editFormValidator = new FormValidator(config, profileEditForm);
const addFormValidator = new FormValidator(config, addCardForm);
const avatarFormValidator = new FormValidator(config, avatarForm);

const addCardPopUp = new PopupWithForm(
  { popupSelector: "#card-edit-modal" },
  handleAddCardFormSubmit
);

const editProfilePopUp = new PopupWithForm(
  { popupSelector: "#profile_edit-modal" },
  handleProfileCardFormSubmit
);

const editAvatarPopup = new PopupWithForm(
  { popupSelector: "#avatar-edit-modal" },
  handleAvatarSubmit
);

editFormValidator.enableValidation();
addFormValidator.enableValidation();
avatarFormValidator.enableValidation();
// <!-- enable validation for avatarEditForm -->

addCardPopUp.setEventListeners();
editProfilePopUp.setEventListeners();
imagePopUp.setEventListeners();
popupDelete.setEventListeners();
editAvatarPopup.setEventListeners();
