let formElement = document.querySelector('.popup__body[name="edit-profile"]');
let nameInput = formElement.querySelector('.popup__input[name="name"]');
let jobInput = formElement.querySelector('.popup__input[name="job"]');

let nameText = document.querySelector('.profile__name');
let jobText = document.querySelector('.profile__position');

let editButtonElement = document.querySelector('.profile__edit-button');
let popupEditProfileElement = document.querySelector('#edit-profile');
let closeButtonElement = document.querySelector('.popup__close');

function formSubmitHandler(evt) {
    evt.preventDefault();
    nameText.textContent = nameInput.value;
    jobText.textContent = jobInput.value;
    closeButtonHandler(evt);
}

function editButtonHandler(evt) {
    evt.preventDefault();

    nameInput.value = nameText.textContent;
    jobInput.value = jobText.textContent;
    popupEditProfileElement.classList.add('popup_opened');
}

function closeButtonHandler(evt) {
    evt.preventDefault();
    popupEditProfileElement.classList.remove('popup_opened');
}

formElement.addEventListener('submit', formSubmitHandler);
editButtonElement.addEventListener('click', editButtonHandler);
closeButtonElement.addEventListener('click', closeButtonHandler);

// Добавление карточки поп-ап

let addButtonElement = document.querySelector('.profile__add-button');
let popupAddCardElement = document.querySelector('#add-card');


function addButtonHandler(evt) {
    evt.preventDefault();
    popupAddCardElement.classList.add('popup_opened');
}
addButtonElement.addEventListener('click', addButtonHandler);

let closeAddCardButtonElement = popupAddCardElement.querySelector('.popup__close');


function closeAddCardButtonHandler(evt) {
    evt.preventDefault();
    popupAddCardElement.classList.remove('popup_opened');
}

closeAddCardButtonElement.addEventListener('click', closeAddCardButtonHandler);

let addCardFormElement = document.querySelector('.popup__body[name="add-card"]');
let addCardNameInput = addCardFormElement.querySelector('.popup__input[name="name"]');
let addCardLinkInput = addCardFormElement.querySelector('.popup__input[name="link"]');

function formAddCardSubmitHandler(evt) {
    evt.preventDefault();
    addCard(addCardNameInput.value, addCardLinkInput.value);
    closeAddCardButtonHandler(evt);
}

addCardFormElement.addEventListener('submit', formAddCardSubmitHandler);

// Добавление карточки
const cardsContainer = document.querySelector('.elements');

function addCard(nameValue, linkValue) {
    const cardTemplate = document.querySelector('#card-template').content;
    const cardElement = cardTemplate.querySelector('.elements__item').cloneNode(true);
    const cardName = cardElement.querySelector('.elements__name');
    const cardImage = cardElement.querySelector('.elements__image');

    cardName.textContent = nameValue;
    cardName.setAttribute('title', nameValue);
    cardImage.setAttribute('src', linkValue);
    cardImage.setAttribute('alt', nameValue);

    cardsContainer.prepend(cardElement);
}

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