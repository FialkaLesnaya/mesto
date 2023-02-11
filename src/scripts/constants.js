export const editProfileOpenButton = document.querySelector('.profile__edit-button');
export const addCardOpenButton = document.querySelector('.profile__add-button');
export const openUpdateAvatarButton = document.querySelector('.profile__avatar-wrapper');


export const cardsContainerSelector = '.elements';
export const editProfilePopupSelector = '#edit-profile';
export const deleteCardPopupSelector = '#delete-card';
export const imagePopupSelector = '#image-details';
export const addCardPopupSelector = '#add-card';
export const updateAvatarPopupSelector = '#update-avatar';
export const profileNameSelector = '.profile__name';
export const profileJobSelector = '.profile__position';
export const profileAvatarSelector = '.profile__avatar';


const cardTemplate = document.querySelector('#card-template').content;
export const itemElement = cardTemplate.querySelector('.elements__item');

export const config = {
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__save-button',
    inactiveButtonClass: 'popup__save-button_disabled',
    inputErrorClass: 'popup__input_type-error',
    errorClass: 'popup__input-error_visible',
    fieldsetSelector: '.popup__fieldset',
    formSelector: '.popup__body',
};

export const profileAvatar = document.querySelector('.profile__avatar');