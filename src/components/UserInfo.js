export default class UserInfo {
    constructor(nameSelector, infoSelector) {
        this._editProfileNameElement = document.querySelector(nameSelector);
        this._editProfileJobElement = document.querySelector(infoSelector);
    }

    getUserInfo() {
        return {
            name: this._editProfileNameElement.textContent,
            job: this._editProfileJobElement.textContent,
            avatar: this._avatar,
            id: this._id,
        }
    }

    setUserInfo({ name, about, avatar, _id }) {
        this._editProfileNameElement.textContent = name;
        this._editProfileJobElement.textContent = about;
        this._avatar = avatar;
        this._id = _id;
    }
}