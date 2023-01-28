import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
    constructor(popupSelector, submitHandler) {
        super(popupSelector);
        this._submitHandler = submitHandler;

        this._addCardNameInput = this._popup.querySelector('.popup__input[name="name"]');
        this._addCardLinkInput = this._popup.querySelector('.popup__input[name="link"]');

        this._addCardFormElement = this._popup.querySelector('.popup__body[name="add-card"]');
    }

    _getInputValues() {
        return {
            name: this._addCardNameInput.value,
            link: this._addCardLinkInput.value,
        }
    }

    setEventListeners() {
        super.setEventListeners();
        this._addCardFormElement.addEventListener('submit', (evt) => this._submitHandler(evt, this._getInputValues()));

    }

    close() {
        super.close();
    }
}