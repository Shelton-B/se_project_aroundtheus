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
const profileModalCloseButton = profileEditModal.querySelector(
  "#profile-modal-button-close"
);
const profileName = document.querySelector(".profile__name");
const profileDescription = document.querySelector(".profile__description");
const profileNameInput = document.querySelector("#profile-name-input");
const profileDescriptionInput = document.querySelector(
  "#profile-description-input"
);
const profileEditForm = profileEditModal.querySelector(".modal__form");

const cardList = document.querySelector(".cards__list");
const cardTemplate =
  document.querySelector("#card-template").content.firstElementChild;
const addCardButton = document.querySelector(".profile__add-button");
const addCardModal = document.querySelector("#card-edit-modal");
const addCardModalCloseButton = document.querySelector(
  "#card-modal-button-close"
);
const addCardEditForm = addCardModal.querySelector(".modal__form");
const addCardUrlInput = document.querySelector("#card-url-input");
const addCardTitleInput = document.querySelector("#card-title-input");
const previewImageModalCloseButton = document.querySelector(
  ".modal__close_preview"
);
const previewImageModal = document.querySelector("#preview-modal");

const overlayModal = document.querySelectorAll(".modal");

////////////* Functions  *////////////
//////////////////////////////////////
function closePopUp(modal) {
  modal.classList.remove("modal_opened");
}

function handleProfileCardFormSubmit(evt) {
  evt.preventDefault();
  profileName.textContent = profileNameInput.value;
  profileDescription.textContent = profileDescriptionInput.value;
  closePopUp(profileEditModal);
}

function handleAddCardFormSubmit(evt) {
  evt.preventDefault();
  const name = addCardTitleInput.value;
  const link = addCardUrlInput.value;
  renderCard({ name, link }, cardList);
  closePopUp(addCardModal);
}

function renderCard(data) {
  const cardElement = getCardElement(data);
  cardList.prepend(cardElement);
}

function openPopUp(modal) {
  modal.classList.add("modal_opened");
}

function getCardElement(data) {
  const cardElement = cardTemplate.cloneNode(true);
  const cardElementImage = cardElement.querySelector(".card__image");
  const cardElementTitle = cardElement.querySelector(".card__title");
  const previewImageModalElement = document.querySelector(
    ".modal__preview_image"
  );
  const previewImageModalName = document.querySelector(".modal__preview_text");

  cardElementImage.addEventListener("click", () => {
    openPopUp(previewImageModal);
    previewImageModalElement.src = data.link;
    previewImageModalElement.alt = data.name;
    previewImageModalName.textContent = data.name;
  });

  const addCardDeleteButton = cardElement.querySelector(".card__delete-button");
  addCardDeleteButton.addEventListener("click", () => {
    cardElement.remove();
  });

  const likeButton = cardElement.querySelector(".card__like-button");
  likeButton.addEventListener("click", () => {
    likeButton.classList.toggle("card__like-button_active");
  });

  cardElementTitle.textContent = data.name;
  cardElementImage.alt = data.name;
  cardElementImage.src = data.link;
  return cardElement;
}

function escapePopUp(evt) {
  if (evt.key === "Escape") {
    const modalOpened = document.querySelector(".modal_opened");
    closePopUp(modalOpened);
  }
}

function openPopUp(modal) {
  modal.classList.add("modal_opened");
  document.addEventListener("keydown", escapePopUp);
}

function closePopUp(modal) {
  modal.classList.remove("modal_opened");
  document.removeEventListener("keydown", escapePopUp);
}

///////////* Event Listeners *////////////
/////////////////////////////////////////
profileEditButton.addEventListener("click", () => {
  profileNameInput.value = profileName.textContent;
  profileDescriptionInput.value = profileDescription.textContent;
  openPopUp(profileEditModal);
});

addCardButton.addEventListener("click", () => openPopUp(addCardModal));
profileModalCloseButton.addEventListener("click", () =>
  closePopUp(profileEditModal)
);
addCardModalCloseButton.addEventListener("click", () =>
  closePopUp(addCardModal)
);

previewImageModalCloseButton.addEventListener("click", () =>
  closePopUp(previewImageModal)
);

profileEditForm.addEventListener("submit", handleProfileCardFormSubmit);
addCardEditForm.addEventListener("submit", handleAddCardFormSubmit);

profileEditModal.addEventListener("mousedown", (evt) => {
  if (
    evt.target.classList.contains("modal_opened") ||
    evt.target.classList.contains("modal__close")
  ) {
    closePopUp(profileEditModal);
  }
});

addCardModal.addEventListener("mousedown", (evt) => {
  if (
    evt.target.classList.contains("modal_opened") ||
    evt.target.classList.contains("modal__close")
  ) {
    closePopUp(addCardModal);
  }
});

previewImageModal.addEventListener("mousedown", (evt) => {
  if (
    evt.target.classList.contains("modal_opened") ||
    evt.target.classList.contains("modal__close")
  ) {
    closePopUp(previewImageModal);
  }
});

// >>>> add event listener to cardImage
// >>>> openPopUp with previewImageModal (new modal)

// const previewImageModal = document.querySelector(".preview__modal");
// function openPopUp(previewImageModal) {
//   previewImageModal.classList.add(".preview__modal-opened");
//   cardElementImage.addEventListener("click", () =>
//     openPopUp(previewImageModal)
//   );
// }

// const previewImageModal = document.querySelector("#preview-modal");
// cardElementImage.addEventListener("click", () => openPopUp(previewImageModal));

// CARD DELETE BUTTON//
// addCardDeleteButton.addEventListener("click", () => deleteCard(getcCardElement));

// function deleteCard() {
//   getCardElement.remove();
// }

// const addCardDeleteButton = document.querySelector(".card__delete-button");

///////////////////////////////////
///////////////////////////////////
///////////////////////////////////
///////////////////////////////////

// addCardModal.addEventListener("submit", (evt) => {
//   evt.preventDefault();
//   addCardTitle.textContent = profileNameInput.value;
//   addCardUrl.textContent = profileDescriptionInput.value;
//   closePopUp(addCardModal);
// });

// for (i = 0; i < initialCards.length; i++) {
//   const data = initialCards[i];
//   const cardElement = getCardElement(data);
//   cardList.prepend(cardElement);
// }

initialCards.forEach((data) => renderCard(data, cardList));
