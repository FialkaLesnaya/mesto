export default class Popup {
    constructor(popupSelector) {
        this._popup = document.querySelector(popupSelector);
        this._handleEscClose = this._handleEscClose.bind(this);
        this._handleMouseDownEvent = this._handleMouseDownEvent.bind(this);
    }

    open() {
        document.addEventListener('keydown', this._handleEscClose);
        this._popup.classList.add('popup_opened');
    }

    close() {
        this._popup.classList.remove('popup_opened');
        document.removeEventListener('keydown', this._handleEscClose);
    }

    _handleEscClose(evt) {
        const key = evt.key;
        if (key === "Escape") {
            this.close();
        }
    }

    setEventListeners() {
        this._popup.addEventListener('mousedown', this._handleMouseDownEvent);
    }

    _handleMouseDownEvent(evt) {
        if (evt.target.classList.contains('popup') || evt.target.classList.contains('popup__close')) {
            this.close();
        }
    }
}