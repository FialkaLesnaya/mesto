export default class Card {
    constructor(name, link, count, id, selector, handleCardClick, handleDeleteCardClick) {
        this.name = name;
        this.link = link;
        this.selector = selector;
        this._handleCardClick = handleCardClick;
        this.count = count;
        this._handleDeleteCardClick = handleDeleteCardClick;
        this.id = id;

        this.cardElement = this.selector.cloneNode(true);
        this.cardNameElement = this.cardElement.querySelector('.elements__name');
        this.cardImage = this.cardElement.querySelector('.elements__image');
        this.likeButton = this.cardElement.querySelector('.elements__like-button');
        this.trashButton = this.cardElement.querySelector('.elements__trash');
        this.itemLikeCount = this.cardElement.querySelector('.elements__like-count');
    }

    getCard() {
        return this._generateCard();
    }

    _generateCard() {
        this.cardNameElement.textContent = this.name;
        this.cardNameElement.setAttribute('title', this.name);
        this.cardImage.setAttribute('src', this.link);
        this.cardImage.setAttribute('alt', this.name);
        this.itemLikeCount.textContent = this.count;
        this._setEventListeners();
        return this.cardElement;
    }

    _setEventListeners() {
        this.cardImage.addEventListener('click', (evt) => this._openImageDetail(evt, this._handleCardClick));
        this.likeButton.addEventListener('click', this._addLikeHandler);
        this.trashButton.addEventListener('click', (evt) => this._removeElementHandler(evt, this._handleDeleteCardClick, this.id));
    }

    // Лайк карточки
    _addLikeHandler(evt) {
        evt.preventDefault();
        evt.target.classList.toggle('elements__like-button-active');
    }

    // Удаление карточки
    _removeElementHandler(evt, handleDeleteCardClick, id) {
        evt.preventDefault();
        handleDeleteCardClick(evt.target.closest('.elements__item'), id);
    }

    // Открытие карточки
    _openImageDetail(evt, handleCardClick) {
        evt.preventDefault();
        handleCardClick(this.cardNameElement, this.cardImage.getAttribute('src'));
    }
}