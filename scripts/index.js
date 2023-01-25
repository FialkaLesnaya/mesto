import Card from "./Card.js";
import FormValidator from "./FormValidator.js";
import { openPopup, closePopup } from './utils.js';
import { 
    popupList,
    editProfileFormElement,
    editProfileNameInput,
    editProfileJobInput,
    editProfileNameElement,
    editProfileJobElement,
    editProfilePopupElement,
    editProfileOpenButton,
    cardsContainer,
    itemElement,
    imagePopup,
    popupImage,
    subtitleElement,
    initialCards,
    addCardOpenButton,
    addCardPopupElement,
    addCardFormElement,
    addCardNameInput,
    addCardLinkInput,
    config,
    cardsContainerSelector,
 } from './constants.js';
 import Section from "./Section.js";

function handleMouseDownEvent(evt, popup) {
    if (evt.target.classList.contains('popup') || evt.target.classList.contains('popup__close')) {
        closePopup(popup)
    }
}

popupList.forEach(popup => {
    popup.addEventListener('mousedown', (evt) => handleMouseDownEvent(evt, popup));
});


// Поп-ап редактировать профиль

function setEditProfileInputValues() {
    editProfileNameInput.value = editProfileNameElement.textContent;
    editProfileJobInput.value = editProfileJobElement.textContent;
}

function openEditProfileHandler(evt) {
    evt.preventDefault();
    setEditProfileInputValues();
    openPopup(editProfilePopupElement);
    formValidators['edit-profile'].resetValidation();
}

editProfileOpenButton.addEventListener('click', openEditProfileHandler);

function setEditProfileDivValues() {
    editProfileNameElement.textContent = editProfileNameInput.value;
    editProfileJobElement.textContent = editProfileJobInput.value;
}

function submitEditProfileHandler(evt) {
    evt.preventDefault();
    setEditProfileDivValues();
    closePopup(editProfilePopupElement);
}
editProfileFormElement.addEventListener('submit', submitEditProfileHandler);

// Добавление карточки


function handleCardClick(name, link) {
    popupImage.setAttribute('src', link);
    popupImage.setAttribute('alt', name.textContent);
    subtitleElement.textContent = name.textContent;

    openPopup(imagePopup);
    imagePopup.classList.toggle('popup_image-overlay')
}


function createCard(nameValue, linkValue) {
    const card = new Card(nameValue, linkValue, itemElement, handleCardClick);
    const cardElement = card.getCard();
    return cardElement
}


function addCard(nameValue, linkValue) {
    cardsContainer.prepend(createCard(nameValue, linkValue));
}


const defaultCardList = new Section({ items: initialCards, renderer: (item) => {
    const card = new Card(item.name, item.link, itemElement, handleCardClick);
    const cardElement = card.getCard();
  
        defaultCardList.addItem(cardElement);
  } }, cardsContainerSelector);

  defaultCardList.renderItems();
// Поп-ап новое место

addCardOpenButton.addEventListener('click', () => {
    openPopup(addCardPopupElement);
    formValidators['add-card'].resetValidation();
});

function closeAddCardButtonHandler(evt) {
    evt.preventDefault();
    closePopup(addCardPopupElement);
}

function submitAddCardHandler(evt) {
    evt.preventDefault();
    addCard(addCardNameInput.value, addCardLinkInput.value);
    closeAddCardButtonHandler(evt);
    evt.target.reset();
}

addCardFormElement.addEventListener('submit', submitAddCardHandler);

const formValidators = {}

const enableValidation = (config) => {
    const formList = Array.from(document.querySelectorAll(config.formSelector))
    formList.forEach((formElement) => {
        const validator = new FormValidator(config, formElement)
        const formName = formElement.getAttribute('name')

        formValidators[formName] = validator;
        validator.enableValidation();
    });
};

enableValidation(config);
