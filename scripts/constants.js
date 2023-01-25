export const popupList = document.querySelectorAll('.popup');

export const editProfileFormElement = document.querySelector('.popup__body[name="edit-profile"]');
export const editProfileNameInput = editProfileFormElement.querySelector('.popup__input[name="name"]');
export const editProfileJobInput = editProfileFormElement.querySelector('.popup__input[name="job"]');
export const editProfileNameElement = document.querySelector('.profile__name');
export const editProfileJobElement = document.querySelector('.profile__position');
export const editProfilePopupElement = document.querySelector('#edit-profile');

export const editProfileOpenButton = document.querySelector('.profile__edit-button');

export const cardsContainerSelector = '.elements';
export const cardsContainer = document.querySelector(cardsContainerSelector);
const cardTemplate = document.querySelector('#card-template').content;
export const itemElement = cardTemplate.querySelector('.elements__item');
export const imagePopup = document.querySelector('#image-details');
export const popupImage = imagePopup.querySelector('.popup__image');
export const subtitleElement = imagePopup.querySelector('.popup__subtitle');

export const initialCards = [
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

export const addCardOpenButton = document.querySelector('.profile__add-button');
export const addCardPopupElement = document.querySelector('#add-card');

export const addCardFormElement = document.querySelector('.popup__body[name="add-card"]');
export const addCardNameInput = addCardFormElement.querySelector('.popup__input[name="name"]');
export const addCardLinkInput = addCardFormElement.querySelector('.popup__input[name="link"]');

export const config = {
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__save-button',
    inactiveButtonClass: 'popup__save-button_disabled',
    inputErrorClass: 'popup__input_type-error',
    errorClass: 'popup__input-error_visible',
    fieldsetSelector: '.popup__fieldset',
    formSelector: '.popup__body',
};
