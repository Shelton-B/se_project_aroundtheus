import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";

const initialCards = [
  {
    name: "Yosemite Valley",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/yosemite.jpg",
  },

  {
    name: "Lake Louise",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lake-louise.jpg",
  },

  {
    name: "Bald Mountains",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/bald-mountains.jpg",
  },

  {
    name: "Latemar",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/latemar.jpg",
  },

  {
    name: "Vanoise National Park",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/vanoise.jpg",
  },

  {
    name: "Lago di Braies",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lago.jpg",
  },
];

////////////* Elements *////////////
///////////////////////////////////
const profileEditButton = document.querySelector("#profile-edit-button");
const profileEditModal = document.querySelector("#profile_edit-modal");
const profileName = document.querySelector(".profile__name");
const profileDescription = document.querySelector(".profile__description");
const profileNameInput = document.querySelector("#profile-name-input");
const profileDescriptionInput = document.querySelector(
  "#profile-description-input"
);
const profileEditForm = profileEditModal.querySelector(".modal__form");
const cardList = document.querySelector(".cards__list");
const addCardButton = document.querySelector(".profile__add-button");
const addCardModal = document.querySelector("#card-edit-modal");

const addCardEditForm = addCardModal.querySelector(".modal__form");
const addCardUrlInput = document.querySelector("#card-url-input");
const addCardTitleInput = document.querySelector("#card-title-input");

const previewImageModal = document.querySelector("#preview-modal");
const previewImageModalElement = document.querySelector(
  ".modal__preview_image"
);
const previewImageModalName = document.querySelector(".modal__preview_text");
const submitCardButton = addCardEditForm.querySelector(".modal__button");

////////////* Functions  *////////////
//////////////////////////////////////

function handleProfileCardFormSubmit(evt) {
  evt.preventDefault();
  profileName.textContent = profileNameInput.value;
  profileDescription.textContent = profileDescriptionInput.value;
  closePopUp(profileEditModal);
}

function createCard(data) {
  const cardElement = new Card(data, "#card-template", handleImageClick);
  return cardElement.getCard();
}

function renderCard(data) {
  const card = createCard(data);
  cardList.prepend(card);
}

function handleAddCardFormSubmit(evt) {
  evt.preventDefault();
  const name = addCardTitleInput.value;
  const link = addCardUrlInput.value;
  renderCard({ name, link }, cardList);
  evt.currentTarget.reset();
  closePopUp(addCardModal);
}

const handleImageClick = (data) => {
  previewImageModalElement.src = data.link;
  previewImageModalElement.alt = data.name;
  previewImageModalName.textContent = data.name;
  openPopUp(previewImageModal);
};

function handleEscape(evt) {
  if (evt.key === "Escape") {
    const modalOpened = document.querySelector(".modal_opened");
    closePopUp(modalOpened);
  }
}

function openPopUp(modal) {
  modal.classList.add("modal_opened");
  document.addEventListener("keydown", handleEscape);
}

function closePopUp(modal) {
  modal.classList.remove("modal_opened");
  document.removeEventListener("keydown", handleEscape);
}

function handleCloseModalOnRemoteClick(evt) {
  if (
    evt.target === evt.currentTarget ||
    evt.target.classList.contains("modal__close")
  ) {
    closePopUp(evt.currentTarget);
  }
}

///////////* Event Listeners *////////////
/////////////////////////////////////////
profileEditButton.addEventListener("click", () => {
  profileNameInput.value = profileName.textContent;
  profileDescriptionInput.value = profileDescription.textContent;
  openPopUp(profileEditModal);
});

addCardButton.addEventListener("click", () => {
  openPopUp(addCardModal);
  addFormValidator.toggleButtonState();
});

profileEditForm.addEventListener("submit", handleProfileCardFormSubmit);
addCardEditForm.addEventListener("submit", handleAddCardFormSubmit);
[profileEditModal, addCardModal, previewImageModal].forEach((modal) => {
  modal.addEventListener("mousedown", handleCloseModalOnRemoteClick);
});

initialCards.forEach((data) => renderCard(data, cardList));

// validator; //
const config = {
  formSelector: ".modal__form",
  inputSelector: ".modal__input",
  submitButtonSelector: ".modal__button",
  inactiveButtonClass: "modal__button_disabled",
  inputErrorClass: "modal__input_type_error",
  errorClass: "modal__error_visible",
};

const editFormValidator = new FormValidator(config, profileEditForm);
const addFormValidator = new FormValidator(config, addCardEditForm);

editFormValidator.enableValidation();
addFormValidator.enableValidation();
