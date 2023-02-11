export default class UserInfo {
    constructor(nameSelector, infoSelector, avatarSelector) {
        this._editProfileNameElement = document.querySelector(nameSelector);
        this._editProfileJobElement = document.querySelector(infoSelector);
        this._avatarImageElement = document.querySelector(avatarSelector);
    }

    getUserInfo() {
        return {
            name: this._editProfileNameElement.textContent,
            job: this._editProfileJobElement.textContent,
            avatar: this._avatarImageElement.getAttribute('src'),
            id: this._id,
        }
    }

    setUserInfo({ name, about, avatar, _id }) {
        this._editProfileNameElement.textContent = name;
        this._editProfileJobElement.textContent = about;
        this._avatarImageElement.setAttribute('src', avatar);
        this._id = _id;
    }
}