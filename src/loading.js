import $ from 'cash-dom';

export class Loading {
  static loadDataStart(){
    $(".loader").removeClass("is-hidden");
    $(".profile-container").addClass("is-hidden");
    $(".events-container").addClass("is-hidden");
  }

  static loadDataFinish(){
    $(".loader").addClass("is-hidden");
    $(".profile-container").removeClass("is-hidden");
    $(".events-container").removeClass("is-hidden");
  }
}