import $ from 'jquery';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/styles.css';
import CurrencyService from './js/currency-api';

$(document).ready(function() {
  $('#conversion').submit(function (e) {
    e.preventDefault();
    let dollars = $('#amount').val();
    let currencyC = $('#select-currency').val();
    let promise = CurrencyService.getExchange();
      promise.then(function(response) {
        const body = JSON.parse(response);
        $('#new-currency').text(Math.round(dollars * body.conversion_rates[currencyC]));
      }, function(error) {
        $("show-errors").text(`There was an error processing your request: ${error}. Please Try again`);
      });
  });
});


