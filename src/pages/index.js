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
    profileAvatarSelector,
} from '../scripts/constants.js';
import Section from "../components/Section.js";
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import UserInfo from "../components/UserInfo.js";
import Api from "../components/Api.js";
import PopupWithConfirm from "../components/PopupWithConfirm.js";

// Поп-ап редактировать профиль
const userInfo = new UserInfo(profileNameSelector, profileJobSelector, profileAvatarSelector);

const api = new Api({
    baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-59',
    headers: {
        authorization: '4f31cc87-619b-4c03-991e-9edd62906251',
        'Content-Type': 'application/json'
    }
});

let cardList;

Promise.all([api.getCurrentUser(), api.loadCards()])
    // тут деструктурируете ответ от сервера, чтобы было понятнее, что пришло
    .then(([userData, cards]) => {
        // тут установка данных пользователя
        userInfo.setUserInfo(userData);
        profileAvatar.setAttribute('src', userData.avatar);
        // и тут отрисовка карточек
        cardList = new Section({
            items: cards.reverse(), renderer: (item) => {
                cardList.addItem(createCard(item))
            }
        }, cardsContainerSelector);
        cardList.renderItems();
    })
    .catch(err => {
        // тут ловим ошибку
        console.log(`Ошибка загрузки изначальных данных ${err}`);
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
    return api.editProfile(inputValues.name, inputValues.job)
        .then(res => {
            userInfo.setUserInfo(res);
        })
}

openUpdateAvatarButton.addEventListener('click', openUpdateAvatarPopup);

const updateAvatarPopup = new PopupWithForm(updateAvatarPopupSelector, submitUpdateAvatarHandler);
updateAvatarPopup.setEventListeners();

function submitUpdateAvatarHandler(inputValues) {
    return api.updateAvatar(inputValues.link).then((res) => {
        userInfo.setUserInfo(res);
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

const popupDeleteCard = new PopupWithConfirm(deleteCardPopupSelector, (id) => api.deleteCard(id));
popupDeleteCard.setEventListeners();

function handleDeleteCardClick(element, elementId) {
    popupDeleteCard.open(element, elementId);
}

function createCard(cardData) {
    const card = new Card(
        cardData,
        userInfo.getUserInfo().id,
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
    return api.editCard(inputValues.name, inputValues.link)
        .then(res => {
            cardList.addItem(createCard(res));
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

