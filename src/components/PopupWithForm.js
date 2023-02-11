import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
    constructor(popupSelector, submitHandler) {
        super(popupSelector);
        this._submitHandler = submitHandler;

        this._inputs = this._popup.querySelectorAll('.popup__input');
        this._formElement = this._popup.querySelector('.popup__body');
        this._saveButton = this._formElement.querySelector('.popup__save-button');
        this._submit = this._submit;
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
        this._formElement.addEventListener('submit', () => {
            // перед запросом сохраняем изначальный текст кнопки
            const initialText = this._saveButton.textContent;
            // меняем его, чтобы показать пользователю ожидание
            this._saveButton.textContent = 'Сохранение...';
            this._submitHandler(this._getInputValues())
                .then(() => this.close()) // закрывается попап в `then`
                .finally(() => {
                    this._saveButton.textContent = initialText;
                }) // в любом случае меняется текст кнопки обратно на начальный в `finally`
        });
    }

    close() {
        super.close();
        this._formElement.reset();
    }
}