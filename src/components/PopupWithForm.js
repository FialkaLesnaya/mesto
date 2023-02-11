import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
    constructor(popupSelector, submitHandler) {
        super(popupSelector);
        this._submitHandler = submitHandler;

        this._inputs = this._popup.querySelectorAll('.popup__input');
        this._formElement = this._popup.querySelector('.popup__body');
        this._saveButton = this._formElement.querySelector('.popup__save-button');
        this._iniitalSaveButtonText = this._saveButton.textContent;
        this._submit = this._submit.bind(this);
    }

    _getInputValues() {
        const values = {};
        Object.values(this._inputs).forEach((input) => values[input.name] = input.value);
        return values;
    }

    setInputValues(inputValues) {
        Object.values(this._inputs).forEach((input) => input.value = inputValues[input.name]);
    }

    setEventListeners() {
        super.setEventListeners();
        this._formElement.addEventListener('submit', this._submit);
    }

    setLoading() {
        this._saveButton.textContent = `Сохранение...`;
    }

    _submit(evt) {
        evt.preventDefault();
        this._submitHandler(this._getInputValues())
            .then(() => this.close())
            .finally(() => {
                this._saveButton.textContent = this._iniitalSaveButtonText;
            });
    }

    close() {
        super.close();
        this._formElement.reset();
    }
}