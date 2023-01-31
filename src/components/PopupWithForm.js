import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
    constructor(popupSelector, submitHandler) {
        super(popupSelector);
        this._submitHandler = submitHandler;

        this._inputs = this._popup.querySelectorAll('.popup__input');
        this._formElement = this._popup.querySelector('.popup__body');
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

    _submit(evt) {
        evt.preventDefault();
        this.close();
        this._submitHandler(this._getInputValues());
    }

    close() {
        super.close();
        this._formElement.removeEventListener('submit', this._submit);
        this._formElement.reset();
    }
}