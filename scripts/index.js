// Общие функции
function closePopup(popup) {
    popup.classList.remove('popup_opened');
}

function openPopup(popup) {
    popup.classList.add('popup_opened');
}

const closeButtons = document.querySelectorAll('.popup__close');
closeButtons.forEach((button) => {
    // находим 1 раз ближайший к крестику попап 
    const popup = button.closest('.popup');
    // устанавливаем обработчик закрытия на крестик
    button.addEventListener('click', () => closePopup(popup));
});

function handleKeyDownEvent(evt) {
    const key = evt.key;
    const openedPopup = document.querySelector('.popup_opened');
    if (key === "Escape" && openedPopup) {
        closePopup(openedPopup);
    }
}
document.addEventListener('keydown', handleKeyDownEvent);

const popupList = document.querySelectorAll('.popup');
function handleClickOverlayEvent(evt, popup) {
    if (evt.target.classList.contains('popup')) {
        closePopup(popup)
    }
}

popupList.forEach(popup => {
    popup.addEventListener('click', (evt) => handleClickOverlayEvent(evt, popup));
});


// Поп-ап редактировать профиль
const editProfileFormElement = document.querySelector('.popup__body[name="edit-profile"]');
const editProfileNameInput = editProfileFormElement.querySelector('.popup__input[name="name"]');
const editProfileJobInput = editProfileFormElement.querySelector('.popup__input[name="job"]');
const editProfileNameElement = document.querySelector('.profile__name');
const editProfileJobElement = document.querySelector('.profile__position');
const editProfilePopupElement = document.querySelector('#edit-profile');

function setEditProfileInputValues() {
    editProfileNameInput.value = editProfileNameElement.textContent;
    editProfileJobInput.value = editProfileJobElement.textContent;
}

function openEditProfileHandler(evt) {
    evt.preventDefault();
    setEditProfileInputValues();
    openPopup(editProfilePopupElement);
}

const editProfileOpenButton = document.querySelector('.profile__edit-button');
editProfileOpenButton.addEventListener('click', openEditProfileHandler);

function setEditProfileDivValues() {
    editProfileNameElement.textContent = editProfileNameInput.value;
    editProfileJobElement.textContent = editProfileJobInput.value;
}

function submitEditProfileHandler(evt) {
    evt.preventDefault();
    setEditProfileDivValues();
    closePopup(editProfilePopupElement);
}
editProfileFormElement.addEventListener('submit', submitEditProfileHandler);

// Поп-ап детальное изображение 
const imagePopup = document.querySelector('#image-details');
const popupImage = imagePopup.querySelector('.popup__image');
const subtitleElement = imagePopup.querySelector('.popup__subtitle');

function openImageDetail(evt) {
    evt.preventDefault();;
    const elementItem = evt.target.closest('.elements__item');
    const elementName = elementItem.querySelector('.elements__name');
    const linkValue = evt.target.getAttribute('src');

    popupImage.setAttribute('src', linkValue);
    popupImage.setAttribute('alt', elementName.textContent);
    subtitleElement.textContent = elementName.textContent;

    openPopup(imagePopup);
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
const cardTemplate = document.querySelector('#card-template').content;


function generateCard(item, nameValue, linkValue) {
    const cardElement = item.cloneNode(true);
    const cardNameElement = cardElement.querySelector('.elements__name');
    const cardImage = cardElement.querySelector('.elements__image');
    const likeButton = cardElement.querySelector('.elements__like-button');
    const trashButton = cardElement.querySelector('.elements__trash');

    cardNameElement.textContent = nameValue;
    cardNameElement.setAttribute('title', nameValue);
    cardImage.setAttribute('src', linkValue);
    cardImage.setAttribute('alt', nameValue);

    cardImage.addEventListener('click', openImageDetail);
    likeButton.addEventListener('click', addLikeHandler);
    trashButton.addEventListener('click', removeElementHandler);

    return cardElement;
}

function addCard(nameValue, linkValue) {
    const itemElement = cardTemplate.querySelector('.elements__item');
    const cardElement = generateCard(itemElement, nameValue, linkValue);

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
const addCardOpenButton = document.querySelector('.profile__add-button');
const addCardPopupElement = document.querySelector('#add-card');

const addCardFormElement = document.querySelector('.popup__body[name="add-card"]');
const addCardNameInput = addCardFormElement.querySelector('.popup__input[name="name"]');
const addCardLinkInput = addCardFormElement.querySelector('.popup__input[name="link"]');

addCardOpenButton.addEventListener('click', () => openPopup(addCardPopupElement));

function closeAddCardButtonHandler(evt) {
    evt.preventDefault();
    closePopup(addCardPopupElement);
}

function submitAddCardHandler(evt) {
    evt.preventDefault();
    addCard(addCardNameInput.value, addCardLinkInput.value);
    closeAddCardButtonHandler(evt);
    evt.target.reset();
}

addCardFormElement.addEventListener('submit', submitAddCardHandler);
