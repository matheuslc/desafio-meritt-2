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
  APP.init = function(callback) {

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
              "<td class='average'>"+
                "<div class='circle-one'>" +
                  val.alert +
                "</div>" +
               "</td>" +
              "<td class='average'>"+
                "<div class='circle-two'>" +
                 val.atention +
                 "</div>" +
              "</td>" +
              "<td class='average'>"+
                "<div class='circle-three'>" +
                 val.improve +"</td>" +
                "</div>" +
              "</td>" +
              "<td class='average'>"+
                "<div class='circle-four'>" +
                  val.keep +
                "</div>" +
              "</td>" +
              "</tr>";
      });

      // Insert data into the table
      $('.ideb-tbody').html(html);

      callback();

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

   /* Remove all accents
    * @param text (string) Text with accents
   */
   APP.removeAccent = function(text) {
     var newText = "";

     newText = text.replace(/[ÀÁÂÃÄÅ]/g,"A");
     newText = newText.replace(/[àáâãäå]/g,"a");
     newText = newText.replace(/[ÈÉÊË]/g,"E");
     newText = newText.replace(/[éèêẽë]/g,"e");
     newText = newText.replace(/[ÌÍÎĨÏ]/g,"I");
     newText = newText.replace(/[íìîĩï]/g,"i");
     newText = newText.replace(/[ÙÚÛŨÜ]/g,"U");
     newText = newText.replace(/[úùûũü]/g,"u");

     return newText.toString().toLowerCase();
   }

   /* Average between the two given parameters
   * @param flow {string} Flow value
   * @param learn (string) Lean value
   */
   APP.calcIdeb = function(flow, learn) {
     var Iflow  = APP.removeDot(flow),
         Ilearn = APP.removeDot(learn);

     return parseFloat(Iflow) * parseFloat(Ilearn);
   }

   /* Average between the two given parameters
   * @param flow {string} Flow value
   * @param learn (string) Lean value
   */
   APP.searchCity = function(where, city) {

     $.getJSON(where, function(data) {
      // Store HTML Structure
      var table = $('.ibeb-tbody'),
          html  = "Nenhum resultado encontrado :(";

      // Loop searching the city
      $.each(data.city, function(item, val) {
        var dataName = APP.removeAccent(val.name),
            inputText = APP.removeAccent(city),
            textSize = inputText.length;

        if(textSize >= 3) {
          dataName = dataName.substring(0, textSize);

          if( inputText == dataName ) {

            // Ideb average
            var value = APP.calcIdeb(val.flow, val.learn);

            html += "<tr class='ideb-city'>" +
              "<td class='city-name' colspan='4'>" + val.name + "</td>" +
              "<td class='flow-calc' colspan='2'>" + APP.removeComma(value.toFixed(2)) + "</td>"+
              "<td class='average'>"+
                "<div class='circle-one'>" +
                  val.alert +
                "</div>" +
               "</td>" +
              "<td class='average'>"+
                "<div class='circle-two'>" +
                 val.atention +
                 "</div>" +
              "</td>" +
              "<td class='average'>"+
                "<div class='circle-three'>" +
                 val.improve +"</td>" +
                "</div>" +
              "</td>" +
              "<td class='average'>"+
                "<div class='circle-four'>" +
                  val.keep +
                "</div>" +
              "</td>" +
              "</tr>";
          }

        } else {
          alert('3 letras no mínimo, por favor');
          return false;
        }

      });

      // Insert data into the table
      $('.ideb-tbody').html(html);

    });

   }

  };

  // Trigger focusout
  $('.ideb-search').on('focusout', function() {
    APP.searchCity('js/data/ideb.json',$(this).val());
  });

  APP.init(function() {

    $('.circle-one').circleProgress({
        value: 0.75,
        size: 65,
        startAngle: 0,
        fill: {
            color: "#f7e058"
        }
    });

    $('.circle-two').circleProgress({
        value: 0.75,
        size: 65,
        startAngle: 0,
        fill: {
            color: "#efa548"
        }
    });

    $('.circle-three').circleProgress({
        value: 0.75,
        size: 65,
        startAngle: 0,
        fill: {
            color: "#b7d34f"
        }
    });

    $('.circle-four').circleProgress({
        value: 0.75,
        size: 65,
        startAngle: 0,
        fill: {
            color: "#61add8"
        }
    });

  });



}(jQuery, document, window));

