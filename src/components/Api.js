export default class Api {
    constructor(options) {
        this.baseUrl = options.baseUrl;
        this.headers = options.headers;
    }

    _checkResponse(res) {
        if (res.ok) {
            return res.json();
        }

        // если ошибка, отклоняем промис
        return Promise.reject(`Ошибка: ${res.status}`);
    }

    _logError(err) {
        console.log(`Случилась ошибка ${err}`); // выведем ошибку в консоль
    }

    getCurrentUser() {
        return fetch(`${this.baseUrl}/users/me`, { headers: this.headers })
            .then(res => this._checkResponse(res))
            .catch(err => this._logError(err));
    }

    loadCards() {
        return fetch(`${this.baseUrl}/cards`, { headers: this.headers })
            .then(res => this._checkResponse(res))
            .catch(err => this._logError(err));
    }

    editProfile(name, about) {
        return fetch(`${this.baseUrl}/users/me`, {
            method: 'PATCH',
            headers: this.headers,
            body: JSON.stringify({
                name: name,
                about: about
            })
        })
            .then(res => this._checkResponse(res))
            .catch(err => this._logError(err));
    }

    editCard(name, link) {
        return fetch(`${this.baseUrl}/cards`, {
            method: 'POST',
            headers: this.headers,
            body: JSON.stringify({
                name: name,
                link: link,
            })
        })
            .then(res => this._checkResponse(res))
            .catch(err => this._logError(err));
    }

    deleteCard(cardId) {
        return fetch(`${this.baseUrl}/cards/${cardId}`, {
            method: 'DELETE',
            headers: this.headers,

        })
            .then(res => this._checkResponse(res))
            .catch(err => this._logError(err));
    }

    likeCard(cardId) {
        return fetch(`${this.baseUrl}/cards/${cardId}/likes`, {
            method: 'PUT',
            headers: this.headers,

        })
            .then(res => this._checkResponse(res))
            .catch(err => this._logError(err));
    }

    deleteLikeCard(cardId) {
        return fetch(`${this.baseUrl}/cards/${cardId}/likes`, {
            method: 'DELETE',
            headers: this.headers,

        })
            .then(res => this._checkResponse(res))
            .catch(err => this._logError(err));
    }

    updateAvatar(avatar) {
        return fetch(`${this.baseUrl}/users/me/avatar`, {
            method: 'PATCH',
            headers: this.headers,
            body: JSON.stringify({
                avatar: avatar,
            })
        })
            .then(res => this._checkResponse(res))
            .catch(err => this._logError(err));
    }
}