// Поп-ап "Редактировать профиль"
let editProfileFormElement = document.querySelector('.popup__body[name="edit-profile"]');
let editProfileNameInput = editProfileFormElement.querySelector('.popup__input[name="name"]');
let editProfileJobInput = editProfileFormElement.querySelector('.popup__input[name="job"]');

let editProfileNameElement = document.querySelector('.profile__name');
let editProfileJobElement = document.querySelector('.profile__position');

let editProfilePopupElement = document.querySelector('#edit-profile');

// Метод для открытия и закрытия окна
function toggleEditProfilePopupHandler(evt) {
    evt.preventDefault();
    editProfilePopupElement.classList.toggle('popup_opened');
}

let editProfileCloseButton = document.querySelector('.popup__close');
editProfileCloseButton.addEventListener('click', toggleEditProfilePopupHandler);

// Метод для открытия окна
function openEditProfileHandler(evt) {
    evt.preventDefault();
    editProfileNameInput.value = editProfileNameElement.textContent;
    editProfileJobInput.value = editProfileJobElement.textContent;
    toggleEditProfilePopupHandler(evt);
}

let editProfileOpenButton = document.querySelector('.profile__edit-button');
editProfileOpenButton.addEventListener('click', openEditProfileHandler);

// Метод для отправки данных
function submitEditProfileHandler(evt) {
    evt.preventDefault();
    editProfileNameElement.textContent = editProfileNameInput.value;
    editProfileJobElement.textContent = editProfileJobInput.value;
    toggleEditProfilePopupHandler(evt);
}
editProfileFormElement.addEventListener('submit', submitEditProfileHandler);



// Поп-ап "новое место"
let addCardOpenButton = document.querySelector('.profile__add-button');
let addCardPopupElement = document.querySelector('#add-card');

let addCardFormElement = document.querySelector('.popup__body[name="add-card"]');
let addCardNameInput = addCardFormElement.querySelector('.popup__input[name="name"]');
let addCardLinkInput = addCardFormElement.querySelector('.popup__input[name="link"]');

// Метод для открытия и закрытия окна
function toggleAddCardPopupHandler(evt) {
    evt.preventDefault();
    addCardPopupElement.classList.toggle('popup_opened');
}
addCardOpenButton.addEventListener('click', toggleAddCardPopupHandler);

// Метод для закрытия окна
function closeAddCardButtonHandler(evt) {
    evt.preventDefault();
    toggleAddCardPopupHandler(evt);
    addCardNameInput.value = '';
    addCardLinkInput.value = '';
}

let addCardCloseButton = addCardPopupElement.querySelector('.popup__close');
addCardCloseButton.addEventListener('click', closeAddCardButtonHandler);

// Метод для отправки данных
function submitAddCardHandler(evt) {
    evt.preventDefault();
    addCard(addCardNameInput.value, addCardLinkInput.value);
    closeAddCardButtonHandler(evt);
}

addCardFormElement.addEventListener('submit', submitAddCardHandler);

// Метод для добавление новой карточки

function addLikeHandler(evt) {
    evt.preventDefault();
    evt.target.classList.toggle('elements__like-button-active');
}    
function removeElementHandler(evt) {
    evt.preventDefault();
    evt.target.closest('.elements__item').remove();
}

const imagePopup = document.querySelector('#image-details');
const closeImagePopupButton = imagePopup.querySelector('.popup__close');

function toggleImagePopupHandler(evt) {
    evt.preventDefault();
    imagePopup.classList.toggle('popup_opened');
}

closeImagePopupButton.addEventListener('click', toggleImagePopupHandler);

function openImageDetail(evt) {
    evt.preventDefault();
    imagePopup.classList.toggle('popup_opened');
    imagePopup.classList.toggle('popup_image-overlay');

    const linkValue= evt.target.getAttribute('src');
    imagePopup.querySelector('.popup__image').setAttribute('src', linkValue);

    const textValue = evt.target.closest('.elements__item').querySelector('.elements__name').textContent;
    imagePopup.querySelector('.popup__subtitle').textContent = textValue;
}

const cardsContainer = document.querySelector('.elements');

function addCard(nameValue, linkValue) {
    const cardTemplate = document.querySelector('#card-template').content;
    const cardElement = cardTemplate.querySelector('.elements__item').cloneNode(true);
    const cardName = cardElement.querySelector('.elements__name');
    const cardImage = cardElement.querySelector('.elements__image');
    const likeButton = cardElement.querySelector('.elements__like-button');

    likeButton.addEventListener('click', addLikeHandler);

    const trashButton = cardElement.querySelector ('.elements__trash')

    trashButton.addEventListener('click', removeElementHandler);

    cardImage.addEventListener('click', openImageDetail);

    cardName.textContent = nameValue;
    cardName.setAttribute('title', nameValue);
    cardImage.setAttribute('src', linkValue);
    cardImage.setAttribute('alt', nameValue);

    cardsContainer.prepend(cardElement);
}



// Добавление исходных карточек
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