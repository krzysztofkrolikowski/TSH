import $ from 'cash-dom';
import {User} from "./user";

require('es6-promise').polyfill();
require('isomorphic-fetch');



export class App {

  initializeApp() {
    const user = new User();
    $('.load-username').on('click', function (e) {
      user.userNameChange();
    })
  }

}
