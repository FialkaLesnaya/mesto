import './index.css';
import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import {
    editProfileOpenButton,
    itemElement,
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
    updateAvatarPopupSelector,
    openUpdateAvatarButton,
    avatarImage,
} from '../scripts/constants.js';
import Section from "../components/Section.js";
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import UserInfo from "../components/UserInfo.js";
import Api from "../components/Api.js";
import PopupWithConfirm from "../components/PopupWithConfirm.js";

// Поп-ап редактировать профиль
const userInfo = new UserInfo(profileNameSelector, profileJobSelector);

const api = new Api({
    baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-59',
    headers: {
        authorization: '4f31cc87-619b-4c03-991e-9edd62906251',
        'Content-Type': 'application/json'
    }
});

let currentUser;
let cardList;

api.getCurrentUser()
    .then(res => {
        userInfo.setUserInfo(res.name, res.about);
        profileAvatar.setAttribute('src', res.avatar);
        currentUser = res;
    })
    .then(() => api.loadCards())
    .then(res => {
        cardList = new Section({
            items: res, renderer: (item) => {
                cardList.addItem(createCard(item))
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
    editProfilePopup.setLoading()
    return api.editProfile(inputValues.name, inputValues.job)
        .then(res => {
            userInfo.setUserInfo(res.name, res.about);
            editProfilePopup.resetLoading();
        })
}

openUpdateAvatarButton.addEventListener('click', openUpdateAvatarPopup);

const updateAvatarPopup = new PopupWithForm(updateAvatarPopupSelector, submitUpdateAvatarHandler);
updateAvatarPopup.setEventListeners();

function submitUpdateAvatarHandler(inputValues) {
    updateAvatarPopup.setLoading()
    return api.updateAvatar(inputValues.link).then((res) => {
        avatarImage.setAttribute('src', res.avatar);
        updateAvatarPopup.resetLoading();
    });
}

function openUpdateAvatarPopup() {
    updateAvatarPopup.open();
    formValidators['update-avatar'].resetValidation();
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
    return api.deleteCard(id);
}

const popupDeleteCard = new PopupWithConfirm(deleteCardPopupSelector, submitDeleteCardHandler);
popupDeleteCard.setEventListeners();

function handleDeleteCardClick(element, elementId) {
    popupDeleteCard.open(element, elementId);
}

function createCard(cardData) {
    const card = new Card(
        cardData,
        currentUser._id,
        itemElement,
        handleCardClick,
        handleDeleteCardClick,
        api.likeCard.bind(api),
        api.deleteLikeCard.bind(api),
    );
    const cardElement = card.getCard();
    return cardElement
}

const addCardPopup = new PopupWithForm(addCardPopupSelector, submitAddCardHandler);
addCardPopup.setEventListeners();

function submitAddCardHandler(inputValues) {
    addCardPopup.setLoading()
    return api.editCard(inputValues.name, inputValues.link)
        .then(res => {
            cardList.addItem(createCard(res));

            addCardPopup.resetLoading()
        })
}

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

