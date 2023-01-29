 import Popup from "./Popup.js";
 
 export default class PopupWithImage extends Popup {
    constructor(popupSelector, imageData) {
        super(popupSelector);
        this._imageData = imageData;
        this._subtitleElement = this._popup.querySelector('.popup__subtitle');
        this._popupImage = this._popup.querySelector('.popup__image');
    }

    open() {
        super.open();
        this._popupImage.setAttribute('src', this._imageData.link);
        this._popupImage.setAttribute('alt', this._imageData.name);
        this._subtitleElement.textContent = this._imageData.name;
        this._popup.classList.toggle('popup_image-overlay');
    }
}