import Popup from "./Popup.js";

export default class PopupWithConfirm extends Popup {
    constructor(popupSelector, submitHandler) {
        super(popupSelector);
        this._submitHandler = submitHandler;

        this._inputs = this._popup.querySelectorAll('.popup__input');
        this._formElement = this._popup.querySelector('.popup__body');
        this._saveButton = this._formElement.querySelector('.popup__save-button');
        this._iniitalSaveButtonText = this._saveButton.textContent;
        this._submit = this._submit.bind(this);
    }

    setEventListeners() {
        super.setEventListeners();
        this._formElement.addEventListener('submit', this._submit);
    }

    setLoading() {
        this._saveButton.textContent = `Сохранение...`;
    }

    resetLoading() {
        this._saveButton.textContent = this._iniitalSaveButtonText;
    }

    _submit(evt) {
        evt.preventDefault();
        this._submitHandler(this.elementId)
            .then(() => {
                this.element.remove();
                this.close();
            });
    }

    open(element, elementId) {
        super.open();
        this.elementId = elementId;
        this.element = element;
    }
}