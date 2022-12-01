// Общие функции
function togglePopupVisibility(evt, popupElement) {
    evt.preventDefault();
    popupElement.classList.toggle('popup_opened');
}

// Поп-ап редактировать профиль
let editProfileFormElement = document.querySelector('.popup__body[name="edit-profile"]');
let editProfileNameInput = editProfileFormElement.querySelector('.popup__input[name="name"]');
let editProfileJobInput = editProfileFormElement.querySelector('.popup__input[name="job"]');
let editProfileNameElement = document.querySelector('.profile__name');
let editProfileJobElement = document.querySelector('.profile__position');
let editProfilePopupElement = document.querySelector('#edit-profile');
let editProfileCloseButton = document.querySelector('.popup__close');

editProfileCloseButton.addEventListener('click', (evt) => togglePopupVisibility(evt, editProfilePopupElement));

function openEditProfileHandler(evt) {
    evt.preventDefault();
    editProfileNameInput.value = editProfileNameElement.textContent;
    editProfileJobInput.value = editProfileJobElement.textContent;
    togglePopupVisibility(evt, editProfilePopupElement);
}

let editProfileOpenButton = document.querySelector('.profile__edit-button');
editProfileOpenButton.addEventListener('click', openEditProfileHandler);

function submitEditProfileHandler(evt) {
    evt.preventDefault();
    editProfileNameElement.textContent = editProfileNameInput.value;
    editProfileJobElement.textContent = editProfileJobInput.value;
    togglePopupVisibility(evt, editProfilePopupElement);
}
editProfileFormElement.addEventListener('submit', submitEditProfileHandler);

// Поп-ап детальное изображение 
const imagePopup = document.querySelector('#image-details');
const closeImagePopupButton = imagePopup.querySelector('.popup__close');

closeImagePopupButton.addEventListener('click', (evt) => togglePopupVisibility(evt, imagePopup));

function openImageDetail(evt) {
    evt.preventDefault();;
    const elementItem = evt.target.closest('.elements__item');
    const elementName = elementItem.querySelector('.elements__name');
    const linkValue = evt.target.getAttribute('src');
    const imageElement = document.createElement('img');
    const subtitleElement = imagePopup.querySelector('.popup__subtitle');
    imageElement.setAttribute('src', linkValue);
    imageElement.setAttribute('alt', elementName.textContent);
    imageElement.classList.add('popup__image');

    subtitleElement.parentNode.insertBefore(imageElement, subtitleElement);

    subtitleElement.textContent = elementName.textContent;

    imagePopup.classList.toggle('popup_opened');
    imagePopup.classList.toggle('popup_image-overlay')
}

// Удаление карточки
function removeElementHandler(evt) {
    evt.preventDefault();
    evt.target.closest('.elements__item').remove();
}

// Лайк карточки
function addLikeHandler(evt) {
    evt.preventDefault();
    evt.target.classList.toggle('elements__like-button-active');
}

// Добавление карточки
const cardsContainer = document.querySelector('.elements');

function addCard(nameValue, linkValue) {
    const cardTemplate = document.querySelector('#card-template').content;
    const cardElement = cardTemplate.querySelector('.elements__item').cloneNode(true);
    const cardName = cardElement.querySelector('.elements__name');
    const cardImage = cardElement.querySelector('.elements__image');
    const likeButton = cardElement.querySelector('.elements__like-button');
    const trashButton = cardElement.querySelector('.elements__trash')

    likeButton.addEventListener('click', addLikeHandler);
    trashButton.addEventListener('click', removeElementHandler);
    cardImage.addEventListener('click', openImageDetail);

    cardName.textContent = nameValue;
    cardName.setAttribute('title', nameValue);
    cardImage.setAttribute('src', linkValue);
    cardImage.setAttribute('alt', nameValue);

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
let addCardOpenButton = document.querySelector('.profile__add-button');
let addCardPopupElement = document.querySelector('#add-card');

let addCardFormElement = document.querySelector('.popup__body[name="add-card"]');
let addCardNameInput = addCardFormElement.querySelector('.popup__input[name="name"]');
let addCardLinkInput = addCardFormElement.querySelector('.popup__input[name="link"]');

addCardOpenButton.addEventListener('click', (evt) => togglePopupVisibility(evt, addCardPopupElement));

function closeAddCardButtonHandler(evt) {
    evt.preventDefault();
    togglePopupVisibility(evt, addCardPopupElement);
    addCardNameInput.value = '';
    addCardLinkInput.value = '';
}

let addCardCloseButton = addCardPopupElement.querySelector('.popup__close');
addCardCloseButton.addEventListener('click', closeAddCardButtonHandler);

function submitAddCardHandler(evt) {
    evt.preventDefault();
    addCard(addCardNameInput.value, addCardLinkInput.value);
    closeAddCardButtonHandler(evt);
}

addCardFormElement.addEventListener('submit', submitAddCardHandler);
