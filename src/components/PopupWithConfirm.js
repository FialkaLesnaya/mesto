import Popup from "./Popup.js";

export default class PopupWithConfirm extends Popup {
    constructor(popupSelector, submitHandler) {
        super(popupSelector);
        this._submitHandler = submitHandler;

        this._inputs = this._popup.querySelectorAll('.popup__input');
        this._formElement = this._popup.querySelector('.popup__body');
        this._submit = this._submit.bind(this);
    }

    setEventListeners() {
        super.setEventListeners();
        this._formElement.addEventListener('submit', this._submit);
    }

    _submit(evt) {
        evt.preventDefault();
        this._submitHandler(this.elementId);
        this.element.remove();
        this.close();
    }

    open(element, elementId) {
        super.open();
        this.elementId = elementId;
        this.element = element;
    }
}