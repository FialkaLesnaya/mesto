export default class FormValidator {
    constructor(settings, element) {
        this.settings = settings;
        this.element = element;
        this.inputList = Array.from(element.querySelectorAll(this.settings.inputSelector));
        this.buttonElement = element.querySelector(this.settings.submitButtonSelector);
    }

    enableValidation() {
        this.element.addEventListener('submit', function (evt) {
            evt.preventDefault();
        });

        this._setEventListeners();
    }

    resetValidation() {
        this._toggleButtonState();

        this.inputList.forEach((inputElement) => {
            this._hideInputError(inputElement);
        });

    }


    _setEventListeners() {
        this._toggleButtonState();
        this.inputList.forEach((inputElement) => {
            inputElement.addEventListener('input', () => {
                this._checkInputValidity(inputElement);
                this._toggleButtonState();
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
        inputElement.classList.remove(this.settings.inputErrorClass);
        errorElement.classList.remove(this.settings.errorClass);
        errorElement.textContent = '';
    }

    _hasInvalidInput() {
        return this.inputList.some((inputElement) => !inputElement.validity.valid);
    }

    _toggleButtonState() {
        if (this._hasInvalidInput()) {
            this.buttonElement.classList.add(this.settings.inactiveButtonClass);
            this.buttonElement.setAttribute('disabled', true);
        } else {
            this.buttonElement.classList.remove(this.settings.inactiveButtonClass);
            this.buttonElement.removeAttribute("disabled");
        }
    }
}