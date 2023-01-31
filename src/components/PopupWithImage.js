 import Popup from "./Popup.js";
 
 export default class PopupWithImage extends Popup {
    constructor(popupSelector) {
        super(popupSelector);
        this._subtitleElement = this._popup.querySelector('.popup__subtitle');
        this._popupImage = this._popup.querySelector('.popup__image');
    }

    open(imageData) {
        super.open();
        this._popupImage.setAttribute('src', imageData.link);
        this._popupImage.setAttribute('alt', imageData.name);
        this._subtitleElement.textContent = imageData.name;
        this._popup.classList.toggle('popup_image-overlay');

    }
}