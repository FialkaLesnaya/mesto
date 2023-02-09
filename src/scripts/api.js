export default class Api {
    token = '4f31cc87-619b-4c03-991e-9edd62906251';
    cohortId = 'cohort-59';

    getCurrentUser() {
        return fetch(`https://nomoreparties.co/v1/${this.cohortId}/users/me`, {
            headers: {
                authorization: this.token,
            }
        })
            .then(res => res.json());
    }

    loadCards() {
        return fetch(`https://nomoreparties.co/v1/${this.cohortId}/cards`, {
            headers: {
                authorization: this.token,
            }
        })
            .then(res => res.json());
    }

    editProfile(name, about) {
        return fetch(`https://nomoreparties.co/v1/${this.cohortId}/users/me`, {
            method: 'PATCH',
            headers: {
                authorization: this.token,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: name,
                about: about
            })
        })
            .then(res => res.json());
    }

    editCard(name, link) {
        return fetch(`https://nomoreparties.co/v1/${this.cohortId}/cards`, {
            method: 'POST',
            headers: {
                authorization: this.token,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: name,
                link: link,
            })
        })
            .then(res => res.json());
    }

    deleteCard(cardId) {
        return fetch(`https://nomoreparties.co/v1/${this.cohortId}/cards/${cardId}`, {
            method: 'DELETE',
            headers: {
                authorization: this.token,
            },

        })
            .then(res => res.json());
    }

    likeCard(cardId) {
        return fetch(`https://nomoreparties.co/v1/${this.cohortId}/cards/${cardId}/likes`, {
            method: 'PUT',
            headers: {
                authorization: this.token,
            },

        })
            .then(res => res.json());
    }

    deleteLikeCard(cardId) {
        return fetch(`https://nomoreparties.co/v1/${this.cohortId}/cards/${cardId}/likes`, {
            method: 'DELETE',
            headers: {
                authorization: this.token,
            },

        })
            .then(res => res.json());
    }

    updateAvatar(avatar) {
        return fetch(`https://nomoreparties.co/v1/${this.cohortId}/users/me/avatar`, {
            method: 'PATCH',
            headers: {
                authorization: this.token,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                avatar: avatar,
            })
        })
            .then(res => res.json());
    }

}