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
        var value        = APP.calcIdeb(val.flow, val.learn),
            schoolSuffix = ((val.schools == 1) ? ' escola' : ' escolas');

        html += "<tr class='ideb-city'>" +
                "<td class='city-name' colspan='4'><h1>" +
                  val.name + "</h1>" +
                  "<h2>" + val.schools + schoolSuffix + "</h2>" +
                "</td>" +
                "<td class='flow-calc' colspan='2'>" + val.flow + " x " + val.learn + " = " + APP.removeComma(value.toFixed(2)) + "</td>"+
                "<td class='average'>"+
                  "<div class='circle circle-one' data-value="+ val.alert * 0.01 +">" +
                    "<span>" + val.alert + "%" + "</span>" +
                  "</div>" +
                 "</td>" +
                "<td class='average'>"+
                  "<div class='circle circle-two' data-value="+ val.atention * 0.01 +">" +
                   "<span>" + val.atention + "%" + "</span>" +
                   "</div>" +
                "</td>" +
                "<td class='average'>"+
                  "<div class='circle circle-three' data-value="+ val.improve * 0.01 +">" +
                   "<span>" + val.improve + "%" + "</spab>" + "</td>" +
                  "</div>" +
                "</td>" +
                "<td class='average'>"+
                  "<div class='circle circle-four' data-value="+ val.keep * 0.01 +">" +
                    "<span>" + val.keep + "%" + "</span>" +
                  "</div>" +
                "</td>" +
                "</tr>";
      });

      // Insert data into the table
      $('.ideb-tbody').html(html);

      if(callback()) {
        callback()
      }

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

   /* Wrapper radial progress
   */
   APP.progress = function() {
    $('.circle-one').circleProgress({
        value: $('.circle-one').attr('data-value'),
        size: 65,
        startAngle: -360,
        thickness: 8,
        fill: {
            color: "#f7e058"
        }
    });

    $('.circle-two').circleProgress({
        value: $('.circle-two').attr('data-value'),
        size: 65,
        startAngle: -360,
        thickness: 8,
        fill: {
            color: "#efa548"
        }
    });

    $('.circle-three').circleProgress({
        value: $('.circle-three').attr('data-value'),
        size: 65,
        startAngle: -360,
        thickness: 8,
        fill: {
            color: "#b7d34f"
        }
    });

    $('.circle-four').circleProgress({
        value: $('.circle-four').attr('data-value'),
        size: 65,
        startAngle: -360,
        thickness: 8,
        fill: {
            color: "#61add8"
        }
    });
   }

   /* Average between the two given parameters
   * @param flow {string} Flow value
   * @param learn (string) Lean value
   */
   APP.searchCity = function(where, city) {

     $.getJSON(where, function(data) {
      // Store HTML Structure
      var table = $('.ibeb-tbody'),
          html  = "";

      // Loop searching the city
      $.each(data.city, function(item, val) {
        var dataName     = APP.removeAccent(val.name),
            inputText    = APP.removeAccent(city),
            textSize     = inputText.length,
            schoolSuffix = ((val.schools == 1) ? ' escola' : ' escolas');

        if(textSize === 0) {
          APP.init(function() {
            APP.progress();
          });

        } else {
          if(textSize >= 3) {
            dataName = dataName.substring(0, textSize);

            if( inputText == dataName ) {

              // Ideb average
              var value = APP.calcIdeb(val.flow, val.learn);

              html += "<tr class='ideb-city'>" +
                "<td class='city-name' colspan='4'><h1>" +
                  val.name + "</h1>" +
                  "<h2>" + val.schools + schoolSuffix + "</h2>" +
                "</td>" +
                "<td class='flow-calc' colspan='2'>" + val.flow + " x " + val.learn + " = " + APP.removeComma(value.toFixed(2)) + "</td>"+
                "<td class='average'>"+
                  "<div class='circle circle-one' data-value="+ val.alert * 0.01 +">" +
                    "<span>" + val.alert + "</span>" +
                  "</div>" +
                 "</td>" +
                "<td class='average'>"+
                  "<div class='circle circle-two' data-value="+ val.atention * 0.01 +">" +
                   "<span>" + val.atention + "</span>" +
                   "</div>" +
                "</td>" +
                "<td class='average'>"+
                  "<div class='circle circle-three' data-value="+ val.improve * 0.01 +">" +
                   "<span>" + val.improve + "</spab>" + "</td>" +
                  "</div>" +
                "</td>" +
                "<td class='average'>"+
                  "<div class='circle circle-four' data-value="+ val.keep * 0.01 +">" +
                    "<span>" + val.keep + "</span>" +
                  "</div>" +
                "</td>" +
                "</tr>";
            }
          }
        }
      });

      // Insert data into the table



      if(html != "") {
        $('.ideb-tbody').html(html);
      } else {
        $('.ideb-tbody').html("Nenhum resultado encontrado :)");
      }

      APP.progress();

    });

   }

  };

  // Trigger focusout
  $('.ideb-search input').on('focusout', function() {
    APP.searchCity('js/data/ideb.json', $(this).val());
  });

  // Responsivo Menu Anchor
  $('.anchor').on('click', function() {
    $('body').toggleClass('menu-active');
  });

  APP.init(function() {

    APP.progress();

  });



}(jQuery, document, window));

