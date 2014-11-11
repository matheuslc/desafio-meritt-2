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
    APP.AJAX('js/data/ideb.json', function(e) {
      console.log(e);
    });
  };


  /* AJAX function wrapper
   *
   */
   APP.AJAX = function(url, callback) {
    var req = new XMLHttpRequest(),
        ready;

    req.overrideMimeType('application/json');

    req.onreadystatechange = function() {
      ready = (req.readyState == 4 && req.status == 200);
      callback(ready ? req.responseText : false);
    }

    req.open("GET", url, true);
    req.send();

   }

   APP.init();

}(document, window));

