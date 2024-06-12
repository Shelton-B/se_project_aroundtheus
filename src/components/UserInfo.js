class UserInfo {
  constructor({ nameSelector, descriptionSelector, userAvatar }) {
    this._name = document.querySelector(nameSelector);
    this._description = document.querySelector(descriptionSelector);
    this._avatar = document.querySelector(userAvatar);
  }

  getUserInfo() {
    return {
      name: this._name.textContent,
      description: this._description.textContent,
    };
  }

  setUserInfo({ name, about }) {
    this._name.textContent = name;
    this._description.textContent = about;
  }

  // getAvatar() {
  //   return {
  //     avatar: this._avatar.value,
  //   };
  // }

  setAvatar({ avatar }) {
    this._avatar.src = avatar;
  }
}

export default UserInfo;
