/* Name: Desafio Meritt 2
 * Author: Matheus Lucca do Carmo
 * Version: 0.0.2
 */

;(function ($, document, window) {
  'use strict';

  // App namespace

  var APP = {} || window.APP;

  /* Active functions
   *
   */
  APP.init = function() {

    // Get data
    $.getJSON("js/data/ideb.json", function(data) {
      // Store HTML Structure
      var table = $('.ibeb-tbody'),
          html  = "";

      // Loop which populate table
      $.each(data.city, function(item, val) {
        // Ideb average
        var value = APP.calcIdeb(val.flow, val.learn);

        html += "<tr class='ideb-city'>" +
          "<td class='city-name' colspan='4'>" + val.name + "</td>" +
          "<td class='flow-calc' colspan='2'>" + APP.removeComma(value.toFixed(2)) + "</td>"+
          "<td class='average'>"+ val.alert +"</td>" +
          "<td class='average'>"+ val.atention +"</td>" +
          "<td class='average'>"+ val.improve +"</td>" +
          "<td class='average'>"+ val.keep +"</td>" +
          "</tr>";
      });

      // Insert data into the table
      $('.ideb-tbody').html(html);

    });

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

  };



   APP.init();

}(jQuery, document, window));

