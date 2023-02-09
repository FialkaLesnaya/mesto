import './index.css';
import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
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
    profileAvatar,
    deleteCardPopupSelector,
} from '../scripts/constants.js';
import Section from "../components/Section.js";
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import UserInfo from "../components/UserInfo.js";
import Api from "../scripts/api.js";
import PopupWithConfirm from "../components/PopupWithConfirm.js";

// Поп-ап редактировать профиль
const userInfo = new UserInfo(profileNameSelector, profileJobSelector);

const api = new Api();
api.getCurrentUser()
    .then(res => {
        userInfo.setUserInfo(res.name, res.about);
        profileAvatar.setAttribute('src', res.avatar);
    });

let cardList;
api.loadCards()
    .then(res => {
        cardList = new Section({
            items: res, renderer: (item) => {
                cardList.addItem(createCard(item.name, item.link, item.likes.length, item.id))
            }
        }, cardsContainerSelector);
        cardList.renderItems();
    });

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
    api.editProfile(inputValues.name, inputValues.job)
        .then(res => {
            userInfo.setUserInfo(res.name, res.about);
        })
}

const popup = new PopupWithImage(imagePopupSelector);
popup.setEventListeners();

function handleCardClick(name, link) {
    popup.open({
        link: link,
        name: name.textContent,
    });
}

function submitDeleteCardHandler(id) {

}

const popupDeleteCard = new PopupWithConfirm(deleteCardPopupSelector, submitDeleteCardHandler);
popupDeleteCard.setEventListeners();

function handleDeleteCardClick(element, elementId) {
popupDeleteCard.open(element, elementId);
}

function createCard(nameValue, linkValue, countValue, idValue) {
    const card = new Card(nameValue, linkValue, countValue, idValue, itemElement, handleCardClick, handleDeleteCardClick);
    const cardElement = card.getCard();
    return cardElement
}

function submitAddCardHandler(inputValues) {
    api.editCard(inputValues.name, inputValues.link)
        .then(res => {
            cardList.addItem(createCard(res.name, res.link, res.likes.length, res.id));
        })
}

const addCardPopup = new PopupWithForm(addCardPopupSelector, submitAddCardHandler);
addCardPopup.setEventListeners();

addCardOpenButton.addEventListener('click', () => {
    addCardPopup.open();
    formValidators['add-card'].resetValidation();
});

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

