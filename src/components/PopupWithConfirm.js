import Popup from "./Popup.js";

export default class PopupWithConfirm extends Popup {
    constructor(popupSelector, submitHandler) {
        super(popupSelector);
        this._submitHandler = submitHandler;

        this._inputs = this._popup.querySelectorAll('.popup__input');
        this._formElement = this._popup.querySelector('.popup__body');
        this._saveButton = this._formElement.querySelector('.popup__save-button');
        this._submit = this._submit;
    }

    setEventListeners() {
        super.setEventListeners();

        this._formElement.addEventListener('submit', () => {
            // перед запросом сохраняем изначальный текст кнопки
            const initialText = this._saveButton.textContent;
            // меняем его, чтобы показать пользователю ожидание
            this._saveButton.textContent = 'Удаление...';
            this._submitHandler(this.elementId)
                .then(() => {
                    this.element.remove();
                    this.close();
                })
                .finally(() => {
                    this._saveButton.textContent = initialText;
                }) // в любом случае меняется текст кнопки обратно на начальный в `finally`
        });
    }

    open(element, elementId) {
        super.open();
        this.elementId = elementId;
        this.element = element;
    }
}