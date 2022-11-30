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
    evt.target.classList.toggle('elements__like-button-active');
}    
function removeElementHandler(evt) {
    evt.target.closest('.elements__item').remove();
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
        link: './images/ricardo-gomez-angel-eis_TT6ntfo-unsplash.jpg'
    },
    {
        name: 'Нью-Гэмпшир,США',
        link: './images/balazs-busznyak-El5zuQAtfeo-unsplash.jpg'
    },
    {
        name: 'Лаго-ди-Фузине,Италия',
        link: './images/saso-tusar-s-k-2N90yuY-unsplash.jpg'
    },
    {
        name: 'Гатлинбург,США',
        link: './images/chad-madden-cPa-7yByq3o-unsplash.jpg'
    },
    {
        name: 'Ферма Сидр-Хилл,США',
        link: './images/bonnie-kittle-XAsG0EZEsyA-unsplash.jpg'
    },
    {
        name: 'Лак-дю-Фламбо,США',
        link: './images/dave-hoefler-Z9d7CYpBDqo-unsplash.jpg'
    },
];

initialCards.forEach(card => addCard(card.name, card.link));