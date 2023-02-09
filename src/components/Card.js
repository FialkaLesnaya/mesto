export default class Card {
    constructor(name, link, count, id, selector, handleCardClick, handleDeleteCardClick, ownerId, myId, handleLikeClick, handlDeleteLikeClick) {
        this.name = name;
        this.link = link;
        this.selector = selector;
        this._handleCardClick = handleCardClick;
        this.count = count;
        this._handleDeleteCardClick = handleDeleteCardClick;
        this.id = id;
        this.ownerId = ownerId;
        this.myId = myId;
        this._handleLikeClick = handleLikeClick;
        this._handlDeleteLikeClick = handlDeleteLikeClick;

        this.cardElement = this.selector.cloneNode(true);
        this.cardNameElement = this.cardElement.querySelector('.elements__name');
        this.cardImage = this.cardElement.querySelector('.elements__image');
        this.likeButton = this.cardElement.querySelector('.elements__like-button');
        this.trashButton = this.cardElement.querySelector('.elements__trash');
        this.itemLikeCount = this.cardElement.querySelector('.elements__like-count');
        if (this.myId != this.ownerId) {
            this.trashButton.remove();
        }
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
        this.likeButton.addEventListener('click', (evt) => this._addLikeHandler(evt, this._handlDeleteLikeClick, this._handleLikeClick, this.id, this.itemLikeCount));
        this.trashButton.addEventListener('click', (evt) => this._removeElementHandler(evt, this._handleDeleteCardClick, this.id));
    }

    // Лайк карточки
    _addLikeHandler(evt, handlDeleteLikeClick, handleLikeClick, id, itemLikeCount) {
        evt.preventDefault();
        if (evt.target.classList.contains('elements__like-button-active')) {
            handlDeleteLikeClick(id)
                .then((res) => {
                    itemLikeCount.textContent = res.likes.length;
                });
        } else {
            handleLikeClick(id)
                .then((res) => {
                    itemLikeCount.textContent = res.likes.length;
                });;
        }
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