import $ from 'jquery';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/styles.css';
import CurrencyService from './js/currency-api';

$(document).ready(function() {
  $('#conversion').submit(function (e) {
    e.preventDefault();
    let dollarsUs = $('#amount').val();
    let currencyC = $('#select-currency').val();
    let promise = CurrencyService.getExchange();
      promise.then(function(response) {
        const body = JSON.parse(response);
        $('.card-new-currency').show();
        $('#new-currency').text("New Amount: " + (parseFloat((dollarsUs * body.conversion_rates[currencyC])).toFixed(2)) + " " + currencyC);
        $('#currency-name').text("Your new currency is: " + currencyC);
        $('#show-errors').text("");
      }, function(error) {
        if (error.includes("unsupported-code")) {
          $("#show-errors").text(`We currently do not support that currency. Please try a different currency.`);
        } else if (error.includes("malformed-request")) {
          $("#show-errors").text(`When some part of your request doesn't follow the structure shown above.`);
        } else if (error.includes("invalid-key")) {
          $("#show-errors").text(`API key is not valid.`);
        } else if (error.includes("inactive-account")) {
          $("#show-errors").text(`Your email address wasn't confirmed.`);
        } else if (error.includes("quota-reached")) {
          $("#show-errors").text(`Your account has reached the the number of requests allowed by your plan.`);
        } else{
          $("#show-errors").text(`No Results found.`);
        }
      });
  });
});        



