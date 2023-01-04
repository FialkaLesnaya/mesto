export default class FormValidator {
    constructor(settings, element) {
        this.settings = settings;
        this.element = element;
    }

    enableValidation() {
        this.element.addEventListener('submit', function (evt) {
            evt.preventDefault();
        });

        const fieldsetList = Array.from(this.element.querySelectorAll(this.settings.fieldsetSelector));
        fieldsetList.forEach(() => {
            this._setEventListeners();
        });
    }

    _setEventListeners() {
        let context = this;
        const inputList = Array.from(this.element.querySelectorAll(this.settings.inputSelector));
        const buttonElement = this.element.querySelector(this.settings.submitButtonSelector);
        this._toggleButtonState(inputList, buttonElement);
        inputList.forEach((inputElement) => {
            inputElement.addEventListener('input', () => {
                context._checkInputValidity(inputElement);
                context._toggleButtonState(inputList, buttonElement);
            });
        });
    }

    _checkInputValidity(inputElement) {
        if (!inputElement.validity.valid) {
            this._showInputError(inputElement, inputElement.validationMessage);
        } else {
            this._hideInputError(inputElement);
        }
    }

    _showInputError(inputElement, errorMessage) {
        const errorElement = this.element.querySelector(`.${inputElement.id}-error`);
        inputElement.classList.add(this.settings.inputErrorClass);
        errorElement.textContent = errorMessage;
        errorElement.classList.add(this.settings.errorClass);
    }

    _hideInputError(inputElement) {
        const errorElement = this.element.querySelector(`.${inputElement.id}-error`);
        inputElement.classList.remove( this.settings.inputErrorClass);
        errorElement.classList.remove(this.settings.errorClass);
        errorElement.textContent = '';
    }

    _hasInvalidInput(inputList) {
        return inputList.some((inputElement) => !inputElement.validity.valid);
    }

    _toggleButtonState(inputList, buttonElement) {
        if (this._hasInvalidInput(inputList)) {
            buttonElement.classList.add(this.settings.inactiveButtonClass);
            buttonElement.setAttribute('disabled', true);
        } else {
            buttonElement.classList.remove(this.settings.inactiveButtonClass);
            buttonElement.removeAttribute("disabled");
        }
    }
}