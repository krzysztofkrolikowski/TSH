import $ from "cash-dom";
import {Events} from "./events";

const userApi = 'https://api.github.com/users/';
const userValidationRegExp = '^[a-z0-9-_]+$';

export class User {
  userNameChange() {
    const self = this;

    const userName = $('.username.input').val();
    const isUserNameValid = self.validateUserName(userName);

    self.toggleUserNameWarn(!isUserNameValid);
    if (isUserNameValid) {
      fetch(`${userApi}${userName}`)
        .then(response => response.json())
        .then(response => {
          self.updateProfile(response);

          const events = new Events();
          events.loadGithubEvents(userName);
        });
    }
  }

  toggleUserNameWarn(showWarn) {
    if (showWarn) {
      $(".username").addClass("is-danger");
    } else {
      $(".username").removeClass("is-danger");
    }
  }

  validateUserName(userName) {
    const regExp = new RegExp(userValidationRegExp);
    const regExpResult = regExp.test(userName);

    return regExpResult;
  }

  updateProfile(profile) {
    $('#profile-name').text(profile.login)
    $('#profile-image').attr('src', profile.avatar_url)
    $('#profile-url').attr('href', profile.html_url)
      .text(profile.login)
    $('#profile-bio').text(profile.bio || '(no information)')
  }
}