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
    APP.AJAX('js/data/ideb.json', function(json) {

      var data = JSON.parse(json);

      APP.populate(data);

    });
  };


  /* AJAX function wrapper
   * @param url {string} Json URL
   * @param callback (function) Callback function
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

   };


   /* Change commas for dot
   * @param before {string} String with comma value
   */
   APP.removeDot = function(before) {
     return before.replace(/,/g, '.');
   };

   /* Change dor for comma
   * @param before {string} String with dot value
   */
   APP.removeComma = function(before) {
     return before.replace(/\./g, ',');
   };

   /* Average between the two given parameters
   * @param flow {string} Flow value
   * @param learn (string) Lean value
   */
   APP.calcIdeb = function(flow, learn) {
     var Iflow  = APP.removeDot(flow),
         Ilearn = APP.removeDot(learn);

     return parseFloat(Iflow) * parseFloat(Ilearn);
   }

   /* AJAX function wrapper
   * @param data {json} IDEB Data
   * @param callback (function) Callback function
   */
   APP.populate = function(data) {
     var i      = 0,
         size   = data.city.length,
         table  = document.querySelector('.ideb-tbody');

     for(i; i < size; i++) {
        var value = APP.calcIdeb(data.city[i].flow, data.city[i].learn);
        var html =
          "<tr>" +
          "<td class='city-name'>" + data.city[i].name + "</td>" +
          "<td class='flow-calc'>" + APP.removeComma(value.toFixed(2)) + "</td>"+
          "<td class='average'>"+ data.city[i].alert +"</td>" +
          "<td class='average'>"+ data.city[i].atention +"</td>" +
          "<td class='average'>"+ data.city[i].improve +"</td>" +
          "<td class='average'>"+ data.city[i].keep +"</td>" +
          "</tr>";
     }

     table.insertAdjacentHTML('afterbegin', html);

   }

   APP.init();

}(document, window));

