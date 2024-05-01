import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import { config } from "../scripts/validation.js";

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
  closePopUp(addCardModal);
}

const handleImageClick = (data) => {
  previewImageModalElement.src = data.link;
  previewImageModalElement.alt = data.name;
  previewImageModalName.textContent = data.name;
  openPopUp(previewImageModal);
};

// function getCardElement(data) {
//   const cardElement = cardTemplate.cloneNode(true);
//   const cardElementImage = cardElement.querySelector(".card__image");
//   const cardElementTitle = cardElement.querySelector(".card__title");
//   const previewImageModalElement = document.querySelector(
//     ".modal__preview_image"
//   );
//   const previewImageModalName = document.querySelector(".modal__preview_text");

//   // cardElementImage.addEventListener("click", () => {
//   //   openPopUp(previewImageModal);
//   //   previewImageModalElement.src = data.link;
//   //   previewImageModalElement.alt = data.name;
//   //   previewImageModalName.textContent = data.name;
//   // });

//   const addCardDeleteButton = cardElement.querySelector(".card__delete-button");
//   addCardDeleteButton.addEventListener("click", () => {
//     cardElement.remove();
//   });

//   const likeButton = cardElement.querySelector(".card__like-button");
//   likeButton.addEventListener("click", () => {
//     likeButton.classList.toggle("card__like-button_active");
//   });

//   cardElementTitle.textContent = data.name;
//   cardElementImage.alt = data.name;
//   cardElementImage.src = data.link;
//   return cardElement;
// }

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

function closeModalOnRemoteClick(evt) {
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

addCardButton.addEventListener("click", () => openPopUp(addCardModal));
profileEditForm.addEventListener("submit", handleProfileCardFormSubmit);
addCardEditForm.addEventListener("submit", handleAddCardFormSubmit);
profileEditModal.addEventListener("mousedown", closeModalOnRemoteClick);
addCardModal.addEventListener("mousedown", closeModalOnRemoteClick);
previewImageModal.addEventListener("mousedown", closeModalOnRemoteClick);

initialCards.forEach((data) => renderCard(data, cardList));

// validator; //
const editFormValidator = new FormValidator(config, formElement);
editFormValidator.enableValidation();
