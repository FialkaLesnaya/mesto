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

}