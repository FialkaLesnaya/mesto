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

function setEditProfileInputValues(name, job) {
    editProfileNameInput.value = name;
    editProfileJobInput.value = job;
}

function openEditProfileHandler(evt) {
    evt.preventDefault();
    const values = userInfo.getUserInfo();
    setEditProfileInputValues(values.name, values.job);
    const popup = new PopupWithForm('#edit-profile', submitEditProfileHandler);
    popup.open();
    popup.setEventListeners();
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

const defaultCardList = new Section({
    items: initialCards, renderer: (item) => {
        const card = new Card(item.name, item.link, itemElement, handleCardClick);
        const cardElement = card.getCard();

        defaultCardList.addItem(cardElement);
    }
}, cardsContainerSelector);

defaultCardList.renderItems();

addCardOpenButton.addEventListener('click', () => {
    const popup = new PopupWithForm('#add-card', submitAddCardHandler);
    popup.open();
    popup.setEventListeners();
    formValidators['add-card'].resetValidation();
});


function createCard(nameValue, linkValue) {
    const card = new Card(nameValue, linkValue, itemElement, handleCardClick);
    const cardElement = card.getCard();
    return cardElement
}


function addCard(nameValue, linkValue) {
    defaultCardList.addItem(createCard(nameValue, linkValue))
}

function submitAddCardHandler(inputValues) {
    defaultCardList.addItem();
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
