import './pages/index.css';
import Card from "./scripts/Card.js";
import FormValidator from "./scripts/FormValidator.js";
import {
    editProfileNameInput,
    editProfileJobInput,
    editProfileOpenButton,
    itemElement,
    initialCards,
    addCardOpenButton,
    config,
    cardsContainerSelector,
} from './scripts/constants.js';
import Section from "./scripts/Section.js";
import PopupWithImage from './scripts/PopupWithImage.js';
import PopupWithForm from './scripts/PopupWithForm.js';
import UserInfo from "./scripts/UserInfo.js";

// Поп-ап редактировать профиль
const userInfo = new UserInfo('.profile__name', '.profile__position');

const editProfilePopup = new PopupWithForm('#edit-profile', submitEditProfileHandler);
editProfilePopup.setEventListeners();

function openEditProfileHandler(evt) {
    evt.preventDefault();
    editProfilePopup.setInputValues(userInfo.getUserInfo());
    editProfilePopup.open();
    formValidators['edit-profile'].resetValidation();
}

editProfileOpenButton.addEventListener('click', openEditProfileHandler);

function submitEditProfileHandler(inputValues) {
    userInfo.setUserInfo(inputValues.name, inputValues.job)
}

function handleCardClick(name, link) {
    const popup = new PopupWithImage('#image-details', {
        link: link,
        name: name.textContent,
    });
    popup.setEventListeners();
    popup.open();
}

const cardList = new Section({
    items: initialCards, renderer: (item) => {
        const card = new Card(item.name, item.link, itemElement, handleCardClick);
        const cardElement = card.getCard();

        cardList.addItem(cardElement);
    }
}, cardsContainerSelector);

cardList.renderItems();

const addCardPopup = new PopupWithForm('#add-card', submitAddCardHandler);
addCardPopup.setEventListeners();

addCardOpenButton.addEventListener('click', () => {
    addCardPopup.open();
    formValidators['add-card'].resetValidation();
});


function createCard(nameValue, linkValue) {
    const card = new Card(nameValue, linkValue, itemElement, handleCardClick);
    const cardElement = card.getCard();
    return cardElement
}


function addCard(nameValue, linkValue) {
    cardList.addItem(createCard(nameValue, linkValue))
}

function submitAddCardHandler(inputValues) {
    addCard(inputValues.name, inputValues.link);
}

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
