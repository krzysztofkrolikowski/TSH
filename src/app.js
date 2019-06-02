import $ from 'cash-dom';

require('es6-promise').polyfill();
require('isomorphic-fetch');

export class App {
  initializeApp() {
    let self = this;

    $('.load-username').on('click', function (e) {
      let userName = $('.username.input').val();

      fetch(`https://api.github.com/users/${userName}`)
        .then(response => response.json())
        .then(response => {
          self.updateProfile(response);
        })

    })

  }

  updateProfile(profile) {
    $('#profile-name').text(profile.login)
    $('#profile-image').attr('src', profile.avatar_url)
    $('#profile-url').attr('href', profile.html_url)
      .text(profile.login)
    $('#profile-bio').text(profile.bio || '(no information)')
  }
}
