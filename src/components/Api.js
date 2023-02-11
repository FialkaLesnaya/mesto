export default class Api {
    constructor(options) {
        this.baseUrl = options.baseUrl;
        this.headers = options.headers;
    }

    _request(url, options) {
        return fetch(url, options).then(this._checkResponse)
    }

    _checkResponse(res) {
        if (res.ok) {
            return res.json();
        }

        // если ошибка, отклоняем промис
        return Promise.reject(`Ошибка: ${res.status}`);
    }

    getCurrentUser() {
        return this.request(`${this.baseUrl}/users/me`, { headers: this.headers });
    }

    loadCards() {
        return this.request(`${this.baseUrl}/cards`, { headers: this.headers });
    }

    editProfile(name, about) {
        return this.request(`${this.baseUrl}/users/me`, {
            method: 'PATCH',
            headers: this.headers,
            body: JSON.stringify({
                name: name,
                about: about
            })
        });
    }

    editCard(name, link) {
        return this.request(`${this.baseUrl}/cards`, {
            method: 'POST',
            headers: this.headers,
            body: JSON.stringify({
                name: name,
                link: link,
            })
        });
    }

    deleteCard(cardId) {
        return this.request(`${this.baseUrl}/cards/${cardId}`, {
            method: 'DELETE',
            headers: this.headers,

        });
    }

    likeCard(cardId) {
        return this.request(`${this.baseUrl}/cards/${cardId}/likes`, {
            method: 'PUT',
            headers: this.headers,
        });
    }

    deleteLikeCard(cardId) {
        return this.request(`${this.baseUrl}/cards/${cardId}/likes`, {
            method: 'DELETE',
            headers: this.headers,
        });
    }

    updateAvatar(avatar) {
        return this.request(`${this.baseUrl}/users/me/avatar`, {
            method: 'PATCH',
            headers: this.headers,
            body: JSON.stringify({
                avatar: avatar,
            })
        });
    }
}