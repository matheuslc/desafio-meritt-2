/* Name: Desafio Meritt 2
 * Author: Matheus Lucca do Carmo
 * Version: 0.0.2
 */


;(function (document, window) {
  'use strict';

  // App namespace

  var APP = {} || window.APP;

  /* Active functions
   *
   */
  APP.init = function() {
    var a = console.log(APP.AJAX('js/data/ideb.json'));
    console.log(a);
  };


  /* AJAX function wrapper
   *
   */
   APP.AJAX = function(url) {
    var req = new XMLHttpRequest();

    req.onreadystatechange = function() {
      if(req.readyState === 4 || req.status === 200) {
        return JSON.parse(req.responseText);
      } else {
        return "error";
      }
    }

    req.open("GET", url, true);
    req.send();

   }

   APP.init();

}(document, window));

