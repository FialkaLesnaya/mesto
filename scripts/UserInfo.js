export default class UserInfo {
    constructor(nameSelector, infoSelector) {
        this._editProfileNameElement = document.querySelector(nameSelector);
        this._editProfileJobElement = document.querySelector(infoSelector);
    }

    getUserInfo() {
        return {
            name: this._editProfileNameElement.textContent,
            job: this._editProfileJobElement.textContent,
        }
    }

    setUserInfo(name, job) {
        this._editProfileNameElement.textContent = name;
        this._editProfileJobElement.textContent = job;
    }
}