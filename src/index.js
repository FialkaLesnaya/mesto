import './pages/index.css';
import Card from "./scripts/Card.js";
import FormValidator from "./scripts/FormValidator.js";
import {
    editProfileOpenButton,
    itemElement,
    initialCards,
    addCardOpenButton,
    config,
    cardsContainerSelector,
    editProfilePopupSelector,
    imagePopupSelector,
    addCardPopupSelector,
    profileNameSelector,
    profileJobSelector,
} from './scripts/constants.js';
import Section from "./scripts/Section.js";
import PopupWithImage from './scripts/PopupWithImage.js';
import PopupWithForm from './scripts/PopupWithForm.js';
import UserInfo from "./scripts/UserInfo.js";

// Поп-ап редактировать профиль
const userInfo = new UserInfo(profileNameSelector, profileJobSelector);

const editProfilePopup = new PopupWithForm(editProfilePopupSelector, submitEditProfileHandler);
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
    const popup = new PopupWithImage(imagePopupSelector, {
        link: link,
        name: name.textContent,
    });
    popup.setEventListeners();
    popup.open();
}

const cardList = new Section({
    items: initialCards, renderer: (item) => {
        cardList.addItem(createCard(item.name, item.link))
    }
}, cardsContainerSelector);

cardList.renderItems();

const addCardPopup = new PopupWithForm(addCardPopupSelector, submitAddCardHandler);
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

function submitAddCardHandler(inputValues) {
    cardList.addCard(inputValues);
    cardList.renderItems();
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
