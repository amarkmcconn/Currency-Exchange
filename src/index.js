import $ from 'jquery';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/styles.css';
import CurrencyService from './js/currency-api';

$(document).ready(function() {
  $('#conversion').submit(function (e) {
    e.preventDefault();
    let amountUsd = $('#amount').val();
    let chosenCurrency = $('#conversion').val();
    let promise = CurrencyService.getExchange();
      promise.then(function(response) {
      const body = JSON.parse(response);
      console.log(body);
        if (chosenCurrency = "AED") {
          $('#new-currency').text((`${body.conversion_rates.AED}`) * amountUsd)
        }
      })
  })
})
