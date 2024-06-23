export default class Api {
  constructor({ baseUrl, headers }) {
    this._baseUrl = baseUrl;
    this._headers = headers;
  }

  _processResponse = (res) => {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Error: ${res.status}`);
  };

  loadUserInfo() {
    return fetch(`${this._baseUrl}/users/me`, {
      method: "GET",

      headers: this._headers,
    }).then(this._processResponse);
  }

  editUserInfo({ name, about }) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        name,
        about,
      }),
    }).then(this._processResponse);
  }

  editAvatar({ avatar }) {
    return fetch(`${this._baseUrl}/users/me/avatar`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({ avatar }),
    }).then(this._processResponse);
  }

  addCard({ name, link }) {
    return fetch(`${this._baseUrl}/cards`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify({
        name,
        link,
      }),
    }).then(this._processResponse);
  }

  getInitialCards() {
    return fetch(`${this._baseUrl}/cards`, {
      headers: this._headers,
    }).then(this._processResponse);
  }

  deleteInitialCards(cardID) {
    return fetch(`${this._baseUrl}/cards/${cardID}`, {
      headers: this._headers,
      method: "DELETE",
    }).then(this._processResponse);
  }

  likeCard(cardID) {
    return fetch(`${this._baseUrl}/cards/${cardID}/likes`, {
      headers: this._headers,
      method: "PUT",
    }).then(this._processResponse);
  }

  unlikeCard(cardID) {
    return fetch(`${this._baseUrl}/cards/${cardID}/likes`, {
      headers: this._headers,
      method: "DELETE",
    }).then(this._processResponse);
  }
}
