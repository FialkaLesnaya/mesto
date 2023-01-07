import Card from "./Card.js";
import FormValidator from "./FormValidator.js";
import { openPopup, closePopup } from './utils.js';

const popupList = document.querySelectorAll('.popup');
function handleMouseDownEvent(evt, popup) {
    if (evt.target.classList.contains('popup') || evt.target.classList.contains('popup__close')) {
        closePopup(popup)
    }
}

popupList.forEach(popup => {
    popup.addEventListener('mousedown', (evt) => handleMouseDownEvent(evt, popup));
});


// Поп-ап редактировать профиль
const editProfileFormElement = document.querySelector('.popup__body[name="edit-profile"]');
const editProfileNameInput = editProfileFormElement.querySelector('.popup__input[name="name"]');
const editProfileJobInput = editProfileFormElement.querySelector('.popup__input[name="job"]');
const editProfileNameElement = document.querySelector('.profile__name');
const editProfileJobElement = document.querySelector('.profile__position');
const editProfilePopupElement = document.querySelector('#edit-profile');

function setEditProfileInputValues() {
    editProfileNameInput.value = editProfileNameElement.textContent;
    editProfileJobInput.value = editProfileJobElement.textContent;
}

function openEditProfileHandler(evt) {
    evt.preventDefault();
    setEditProfileInputValues();
    openPopup(editProfilePopupElement);
}

const editProfileOpenButton = document.querySelector('.profile__edit-button');
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
const cardsContainer = document.querySelector('.elements');
const cardTemplate = document.querySelector('#card-template').content;
const itemElement = cardTemplate.querySelector('.elements__item');
const imagePopup = document.querySelector('#image-details');
const popupImage = imagePopup.querySelector('.popup__image');
const subtitleElement = imagePopup.querySelector('.popup__subtitle');

function handleCardClick(name, link) {
    popupImage.setAttribute('src', link);
    popupImage.setAttribute('alt', name.textContent);
    subtitleElement.textContent = name.textContent;

    openPopup(imagePopup);
    imagePopup.classList.toggle('popup_image-overlay')
}



function addCard(nameValue, linkValue) {
    const card = new Card(nameValue, linkValue, itemElement,handleCardClick);
    const cardElement = card.getCard();

    cardsContainer.prepend(cardElement);
}

const initialCards = [
    {
        name: 'Хорген,Швейцария',
        link: 'https://images.unsplash.com/photo-1637145919816-76a50b7a1d4a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1142&q=80'
    },
    {
        name: 'Нью-Гэмпшир,США',
        link: 'https://images.unsplash.com/photo-1541427468627-a89a96e5ca1d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80'
    },
    {
        name: 'Лаго-ди-Фузине,Италия',
        link: 'https://images.unsplash.com/photo-1470748085385-5fbb3018c796?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1124&q=80'
    },
    {
        name: 'Гатлинбург,США',
        link: 'https://images.unsplash.com/photo-1509838174235-432f709c7bfd?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80'
    },
    {
        name: 'Ферма Сидр-Хилл,США',
        link: 'https://images.unsplash.com/photo-1475502085205-ffe028919c87?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80'
    },
    {
        name: 'Лак-дю-Фламбо,США',
        link: 'https://images.unsplash.com/photo-1602776256868-8bd74e6aae19?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1171&q=80'
    },
];

initialCards.forEach(card => addCard(card.name, card.link));

// Поп-ап новое место
const addCardOpenButton = document.querySelector('.profile__add-button');
const addCardPopupElement = document.querySelector('#add-card');

const addCardFormElement = document.querySelector('.popup__body[name="add-card"]');
const addCardNameInput = addCardFormElement.querySelector('.popup__input[name="name"]');
const addCardLinkInput = addCardFormElement.querySelector('.popup__input[name="link"]');
const addCardSubmitButton = addCardFormElement.querySelector('.popup__save-button');

addCardOpenButton.addEventListener('click', () => {
    openPopup(addCardPopupElement);
    if (addCardNameInput.value === '' || addCardLinkInput.value === '') {
        addCardSubmitButton.setAttribute('disabled', true);
        addCardSubmitButton.classList.add('popup__save-button_disabled');
    }
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

const settings = {
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__save-button',
    inactiveButtonClass: 'popup__save-button_disabled',
    inputErrorClass: 'popup__input_type-error',
    errorClass: 'popup__input-error_visible',
    fieldsetSelector: '.popup__fieldset',
};

const formList = Array.from(document.querySelectorAll('.popup__body'));
formList.forEach((formElement) => {
    new FormValidator(settings, formElement).enableValidation();
});
