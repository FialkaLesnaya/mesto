import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
    constructor(popupSelector, submitHandler) {
        super(popupSelector);
        this._submitHandler = submitHandler;

        this._addCardNameInput = this._popup.querySelector('.popup__input[name="name"]');
        this._addCardLinkInput = this._popup.querySelector('.popup__input[name="link"]');
        this._editProfileJobInput = this._popup.querySelector('.popup__input[name="job"]');
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
        this._addCardFormElement.addEventListener('submit', this._submit.bind(this));
    }

    _submit(evt) {
        evt.preventDefault();
        this.close();
        this._submitHandler(this._getInputValues());
        evt.target.reset();
    }

    close() {
        super.close();
        this._addCardFormElement.removeEventListener('submit', this._submit);
    }
}