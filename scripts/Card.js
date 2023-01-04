// Поп-ап детальное изображение 
const imagePopup = document.querySelector('#image-details');
const popupImage = imagePopup.querySelector('.popup__image');
const subtitleElement = imagePopup.querySelector('.popup__subtitle');

export default class Card {
    constructor(name, link, selector) {
        this.name = name;
        this.link = link;
        this.selector = selector;
    }

    getCard() {
        return this._generateCard();
    }

    _generateCard() {
        const cardElement = this.selector.cloneNode(true);
        const cardNameElement = cardElement.querySelector('.elements__name');
        const cardImage = cardElement.querySelector('.elements__image');
        const likeButton = cardElement.querySelector('.elements__like-button');
        const trashButton = cardElement.querySelector('.elements__trash');

        cardNameElement.textContent = this.name;
        cardNameElement.setAttribute('title', this.name);
        cardImage.setAttribute('src', this.link);
        cardImage.setAttribute('alt', this.name);

        cardImage.addEventListener('click', this._openImageDetail);
        likeButton.addEventListener('click', this._addLikeHandler);
        trashButton.addEventListener('click', this._removeElementHandler);

        return cardElement;
    }
    
    // Лайк карточки
    _addLikeHandler(evt) {
        evt.preventDefault();
        evt.target.classList.toggle('elements__like-button-active');
    }

    // Удаление карточки
    _removeElementHandler(evt) {
        evt.preventDefault();
        evt.target.closest('.elements__item').remove();
    }

    // Открытие карточки
    _openImageDetail(evt) {
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
}