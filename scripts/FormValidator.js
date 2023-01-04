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
        this._toggleButtonState(inputList, buttonElement, this.settings.inactiveButtonClass);
        inputList.forEach((inputElement) => {
            inputElement.addEventListener('input', () => {
                context._checkInputValidity(context.element, inputElement);
                context._toggleButtonState(inputList, buttonElement, context.settings.inactiveButtonClass);
            });
        });
    }

    _checkInputValidity(formElement, inputElement) {
        if (!inputElement.validity.valid) {
            this._showInputError(formElement, inputElement, inputElement.validationMessage, this.settings.inputErrorClass, this.settings.errorClass);
        } else {
            this._hideInputError(formElement, inputElement, this.settings.inputErrorClass, this.settings.errorClass);
        }
    }

    _showInputError(formElement, inputElement, errorMessage, inputErrorClass, errorClass) {
        const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
        inputElement.classList.add(inputErrorClass);
        errorElement.textContent = errorMessage;
        errorElement.classList.add(errorClass);
    }

    _hideInputError(formElement, inputElement, inputErrorClass, errorClass) {
        const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
        inputElement.classList.remove(inputErrorClass);
        errorElement.classList.remove(errorClass);
        errorElement.textContent = '';
    }

    _hasInvalidInput(inputList) {
        return inputList.some((inputElement) => !inputElement.validity.valid);
    }

    _toggleButtonState(inputList, buttonElement, inactiveButtonClass) {
        if (this._hasInvalidInput(inputList)) {
            buttonElement.classList.add(inactiveButtonClass);
            buttonElement.setAttribute('disabled', true);
        } else {
            buttonElement.classList.remove(inactiveButtonClass);
            buttonElement.removeAttribute("disabled");
        }
    }
}