(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
'use strict';

jQuery(document).ready(function ($) {
  if ($('body').hasClass('woocommerce-checkout')) {
    $('#order_review .shop_table tbody tr:last-child td:last-child').attr('colspan', '2');
    $('#order_review .shop_table tfoot .pickup_location td').attr('colspan', '2');
    $('#order_review .shop_table tfoot .recurring-totals th').attr('colspan', '3');
    $('#order_review .shop_table tfoot .recurring-total td').attr('colspan', '2');
    $('#order_review .shop_table tfoot .account-funds-discount td').attr('colspan', '2');

    $(document).ajaxComplete(function (event, request, settings) {
      $('#order_review .shop_table tbody tr:last-child td:last-child').attr('colspan', '2');
      $('#order_review .shop_table tfoot .pickup_location td').attr('colspan', '2');
      $('#order_review .shop_table tfoot .recurring-totals th').attr('colspan', '3');
      $('#order_review .shop_table tfoot .recurring-total td').attr('colspan', '2');
      $('#order_review .shop_table tfoot .account-funds-discount td').attr('colspan', '2');
    });
  }
});

jQuery(document).ready(function ($) {
  /*----------------------------------------------djh Sep 28, 2018
    Auto-apply Account Funds Balance
  ----------------------------------------------*/
  var funds_discount_removed = Cookies.get('funds_discount_removed'); // NOTE: funds_discount_removed unused for now, the below !== check is a reminder for future functions
  var funds_auto_applied = Cookies.get('funds_auto_applied');
  var daysleft = parseInt(custom_config.daysleft);
  // console.log('funds_discount_removed: ' + funds_discount_removed);
  // console.log('funds_auto_applied: ' + funds_auto_applied);
  if (funds_auto_applied === undefined && funds_discount_removed !== 'removed') {
    if ($('body').hasClass('woocommerce-cart') || $('body').hasClass('woocommerce-checkout')) {
      if ($('input[name=wc_account_funds_apply]').length > 0 && !$('.subscription-details').length > 0) {
        $('input[name=wc_account_funds_apply]').trigger('click');
        Cookies.remove('funds_auto_applied');
        Cookies.set('funds_auto_applied', 'applied', { expires: daysleft });
      }
    }
  }
});

jQuery(document).ready(function ($) {
  /*----------------------------------------------djh Aug 24, 2018
    Trigger pghf_control_checkout_shipping_options
    on page load and every ajax call in checkout 
  ----------------------------------------------*/
  // if ( $('body').hasClass('woocommerce-checkout') ) {
  //   $('body').append('<input type="hidden" id="previous-cart-value" value="0" />');
  //   var ran = pghf_control_checkout_shipping_options('new page');
  //   console.log('new page ' + ran);
  // }
  $(document).ajaxComplete(function (event, request, settings) {
    if ($('body').hasClass('woocommerce-checkout')) {
      pghf_control_checkout_shipping_options('ajax');
    }
  });
  function pghf_control_checkout_shipping_options() {
    var action = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'new page';

    //&& 
    if (!$('.toggle-default-handling.ship').is(':visible')) {
      // home/free delivery is selected....
      if (!$('.woocommerce-checkout-review-order-table .shipping').length > 0 && !$('.subscription-price').length > 0) {
        return;
      }
      pghf_validate_terms();
      pghf_validate_shipping_zip_code();
      $('#shipping_postcode').on('input', function () {
        pghf_validate_shipping_zip_code();
      });
      $('.woocommerce-terms-and-conditions-wrapper .validate-required').on('click', function () {
        pghf_validate_terms();
      });

      // $( '#place_order' ).hover(
      //   function() {
      //     console.log('hovered');
      //     $('.woocommerce-terms-and-conditions-wrapper .validate-required').each(function(){
      //       if ( $(this).hasClass('woocommerce-validated') ) {
      //         $('#place_order').attr('disabled', false);
      //       } else {
      //         $('#place_order').attr('disabled', true);
      //       }
      //     });
      //   }, function() {
      //     console.log('unhovered');
      //     // $( this ).find( "span:last" ).remove();
      //   }
      // );
    }
  }

  function pghf_validate_terms() {
    var allAreChecked = true;
    setTimeout(function () {
      $('.place-order .validate-required').each(function () {
        var checked = $(this).find('input[type="checkbox"]:checked');
        // console.log(checked.length);
        if (!checked.length > 0 && $(this).is(':visible')) {
          allAreChecked = false;
        }
      });
      if (allAreChecked) {
        $('#place_order').attr('disabled', false);
        pghf_validate_shipping_zip_code();
      } else {
        $('#place_order').attr('disabled', true);
      }
    }, 200);
  }

  function pghf_validate_shipping_zip_code() {

    $('#ship-to-different-address label span').text('Delivery Address (required)');

    var allowed_zips_string = $('#pghf_allowed_zips').val();
    // var allowed_zips        = allowed_zips_string.split(',').map(Number);
    var allowed_zips = allowed_zips_string.split(',');
    // console.log(allowed_zips);

    var shipping_postcode = $('#shipping_postcode').val();
    // console.log(allowed_zips.indexOf(shipping_postcode));
    // console.log(shipping_postcode);
    if (allowed_zips.indexOf(shipping_postcode) !== -1) {
      $('#place_order').attr('disabled', false);
      $('#place_order').text('Place order');
    } else {
      var isValid = /^[0-9]{5}(?:-[0-9]{4})?$/.test(shipping_postcode);
      if (isValid) {
        if ($('.subscription-price').length) {
          if (!$('#nodelivery-wrapper').length) {
            var noDelivery = '<label class="woocommerce-form__label woocommerce-form__label-for-checkbox checkbox"><input type="checkbox" class="woocommerce-form__input woocommerce-form__input-checkbox input-checkbox" name="nodelivery" id="nodelivery"><span class="woocommerce-nodelivery-checkbox-text">I acknowledge that my current shipping zip code does not qualify for home delivery. Food orders will be Local Pickup only unless I update my shipping address to a valid delivery zip code.</span>&nbsp;<span class="required">*</span></label><input type="hidden" name="nodelivery-field" value="1">';
            $('.woocommerce-terms-and-conditions-wrapper').append('<p id="nodelivery-wrapper" class="form-row validate-required">' + noDelivery + '</p>');
          } else {
            $('#nodelivery-wrapper').html(noDelivery);
          }
          $('#place_order').attr('disabled', false);
          $('#place_order').text('Place order');
        } else {
          $('#place_order').attr('disabled', true);
          $('#place_order').text('Home delivery not available to your zip code. Please select Local Pickup above or change delivery address.');
        }
      } else {
        $('#place_order').attr('disabled', true);
        $('#place_order').text('Set your delivery zip code');
      }
    }

    // return true;
  }
}); /* end doc ready */

},{}]},{},[1])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmMvanMvYXV0by1hcHBseS5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7O0FDQUEsT0FBTyxRQUFQLEVBQWlCLEtBQWpCLENBQXVCLFVBQVMsQ0FBVCxFQUFZO0FBQ2pDLE1BQUssRUFBRSxNQUFGLEVBQVUsUUFBVixDQUFtQixzQkFBbkIsQ0FBTCxFQUFrRDtBQUNoRCxNQUFFLDZEQUFGLEVBQWlFLElBQWpFLENBQXNFLFNBQXRFLEVBQWdGLEdBQWhGO0FBQ0EsTUFBRSxxREFBRixFQUF5RCxJQUF6RCxDQUE4RCxTQUE5RCxFQUF3RSxHQUF4RTtBQUNBLE1BQUUsc0RBQUYsRUFBMEQsSUFBMUQsQ0FBK0QsU0FBL0QsRUFBeUUsR0FBekU7QUFDQSxNQUFFLHFEQUFGLEVBQXlELElBQXpELENBQThELFNBQTlELEVBQXdFLEdBQXhFO0FBQ0EsTUFBRSw0REFBRixFQUFnRSxJQUFoRSxDQUFxRSxTQUFyRSxFQUErRSxHQUEvRTs7QUFFQSxNQUFFLFFBQUYsRUFBWSxZQUFaLENBQXlCLFVBQVUsS0FBVixFQUFpQixPQUFqQixFQUEwQixRQUExQixFQUFvQztBQUMzRCxRQUFFLDZEQUFGLEVBQWlFLElBQWpFLENBQXNFLFNBQXRFLEVBQWdGLEdBQWhGO0FBQ0EsUUFBRSxxREFBRixFQUF5RCxJQUF6RCxDQUE4RCxTQUE5RCxFQUF3RSxHQUF4RTtBQUNBLFFBQUUsc0RBQUYsRUFBMEQsSUFBMUQsQ0FBK0QsU0FBL0QsRUFBeUUsR0FBekU7QUFDQSxRQUFFLHFEQUFGLEVBQXlELElBQXpELENBQThELFNBQTlELEVBQXdFLEdBQXhFO0FBQ0EsUUFBRSw0REFBRixFQUFnRSxJQUFoRSxDQUFxRSxTQUFyRSxFQUErRSxHQUEvRTtBQUNELEtBTkQ7QUFPRDtBQUNGLENBaEJEOztBQW1CQSxPQUFPLFFBQVAsRUFBaUIsS0FBakIsQ0FBdUIsVUFBUyxDQUFULEVBQVk7QUFDakM7OztB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O0FBQ0Q7QUFDRjs7QUFFRDtBQUVEO0FBRUYsQ0E3R0QsRSxDQTZHSSIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uKCl7ZnVuY3Rpb24gcihlLG4sdCl7ZnVuY3Rpb24gbyhpLGYpe2lmKCFuW2ldKXtpZighZVtpXSl7dmFyIGM9XCJmdW5jdGlvblwiPT10eXBlb2YgcmVxdWlyZSYmcmVxdWlyZTtpZighZiYmYylyZXR1cm4gYyhpLCEwKTtpZih1KXJldHVybiB1KGksITApO3ZhciBhPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIraStcIidcIik7dGhyb3cgYS5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGF9dmFyIHA9bltpXT17ZXhwb3J0czp7fX07ZVtpXVswXS5jYWxsKHAuZXhwb3J0cyxmdW5jdGlvbihyKXt2YXIgbj1lW2ldWzFdW3JdO3JldHVybiBvKG58fHIpfSxwLHAuZXhwb3J0cyxyLGUsbix0KX1yZXR1cm4gbltpXS5leHBvcnRzfWZvcih2YXIgdT1cImZ1bmN0aW9uXCI9PXR5cGVvZiByZXF1aXJlJiZyZXF1aXJlLGk9MDtpPHQubGVuZ3RoO2krKylvKHRbaV0pO3JldHVybiBvfXJldHVybiByfSkoKSIsImpRdWVyeShkb2N1bWVudCkucmVhZHkoZnVuY3Rpb24oJCkge1xuICBpZiAoICQoJ2JvZHknKS5oYXNDbGFzcygnd29vY29tbWVyY2UtY2hlY2tvdXQnKSApIHtcbiAgICAkKCcjb3JkZXJfcmV2aWV3IC5zaG9wX3RhYmxlIHRib2R5IHRyOmxhc3QtY2hpbGQgdGQ6bGFzdC1jaGlsZCcpLmF0dHIoJ2NvbHNwYW4nLCcyJyk7XG4gICAgJCgnI29yZGVyX3JldmlldyAuc2hvcF90YWJsZSB0Zm9vdCAucGlja3VwX2xvY2F0aW9uIHRkJykuYXR0cignY29sc3BhbicsJzInKTtcbiAgICAkKCcjb3JkZXJfcmV2aWV3IC5zaG9wX3RhYmxlIHRmb290IC5yZWN1cnJpbmctdG90YWxzIHRoJykuYXR0cignY29sc3BhbicsJzMnKTtcbiAgICAkKCcjb3JkZXJfcmV2aWV3IC5zaG9wX3RhYmxlIHRmb290IC5yZWN1cnJpbmctdG90YWwgdGQnKS5hdHRyKCdjb2xzcGFuJywnMicpO1xuICAgICQoJyNvcmRlcl9yZXZpZXcgLnNob3BfdGFibGUgdGZvb3QgLmFjY291bnQtZnVuZHMtZGlzY291bnQgdGQnKS5hdHRyKCdjb2xzcGFuJywnMicpO1xuXG4gICAgJChkb2N1bWVudCkuYWpheENvbXBsZXRlKGZ1bmN0aW9uIChldmVudCwgcmVxdWVzdCwgc2V0dGluZ3MpIHtcbiAgICAgICQoJyNvcmRlcl9yZXZpZXcgLnNob3BfdGFibGUgdGJvZHkgdHI6bGFzdC1jaGlsZCB0ZDpsYXN0LWNoaWxkJykuYXR0cignY29sc3BhbicsJzInKTtcbiAgICAgICQoJyNvcmRlcl9yZXZpZXcgLnNob3BfdGFibGUgdGZvb3QgLnBpY2t1cF9sb2NhdGlvbiB0ZCcpLmF0dHIoJ2NvbHNwYW4nLCcyJyk7XG4gICAgICAkKCcjb3JkZXJfcmV2aWV3IC5zaG9wX3RhYmxlIHRmb290IC5yZWN1cnJpbmctdG90YWxzIHRoJykuYXR0cignY29sc3BhbicsJzMnKTtcbiAgICAgICQoJyNvcmRlcl9yZXZpZXcgLnNob3BfdGFibGUgdGZvb3QgLnJlY3VycmluZy10b3RhbCB0ZCcpLmF0dHIoJ2NvbHNwYW4nLCcyJyk7XG4gICAgICAkKCcjb3JkZXJfcmV2aWV3IC5zaG9wX3RhYmxlIHRmb290IC5hY2NvdW50LWZ1bmRzLWRpc2NvdW50IHRkJykuYXR0cignY29sc3BhbicsJzInKTtcbiAgICB9KTtcbiAgfVxufSk7XG5cblxualF1ZXJ5KGRvY3VtZW50KS5yZWFkeShmdW5jdGlvbigkKSB7XG4gIC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLWRqaCBTZXAgMjgsIDIwMThcbiAgICBBdXRvLWFwcGx5IEFjY291bnQgRnVuZHMgQmFsYW5jZVxuICAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cbiAgdmFyIGZ1bmRzX2Rpc2NvdW50X3JlbW92ZWQgPSBDb29raWVzLmdldCgnZnVuZHNfZGlzY291bnRfcmVtb3ZlZCcpOyAvLyBOT1RFOiBmdW5kc19kaXNjb3VudF9yZW1vdmVkIHVudXNlZCBmb3Igbm93LCB0aGUgYmVsb3cgIT09IGNoZWNrIGlzIGEgcmVtaW5kZXIgZm9yIGZ1dHVyZSBmdW5jdGlvbnNcbiAgdmFyIGZ1bmRzX2F1dG9fYXBwbGllZCAgICAgPSBDb29raWVzLmdldCgnZnVuZHNfYXV0b19hcHBsaWVkJyk7IFxuICB2YXIgZGF5c2xlZnQgICAgICAgICAgICAgICA9IHBhcnNlSW50KGN1c3RvbV9jb25maWcuZGF5c2xlZnQpO1xuICAvLyBjb25zb2xlLmxvZygnZnVuZHNfZGlzY291bnRfcmVtb3ZlZDogJyArIGZ1bmRzX2Rpc2NvdW50X3JlbW92ZWQpO1xuICAvLyBjb25zb2xlLmxvZygnZnVuZHNfYXV0b19hcHBsaWVkOiAnICsgZnVuZHNfYXV0b19hcHBsaWVkKTtcbiAgaWYgKCBmdW5kc19hdXRvX2FwcGxpZWQgPT09IHVuZGVmaW5lZCAmJiBmdW5kc19kaXNjb3VudF9yZW1vdmVkICE9PSAncmVtb3ZlZCcgKSB7XG4gICAgaWYgKCAkKCdib2R5JykuaGFzQ2xhc3MoJ3dvb2NvbW1lcmNlLWNhcnQnKSB8fCAkKCdib2R5JykuaGFzQ2xhc3MoJ3dvb2NvbW1lcmNlLWNoZWNrb3V0JykgKSB7XG4gICAgICBpZiggJCgnaW5wdXRbbmFtZT13Y19hY2NvdW50X2Z1bmRzX2FwcGx5XScpLmxlbmd0aCA+IDBcbiAgICAgICYmICEgJCgnLnN1YnNjcmlwdGlvbi1kZXRhaWxzJykubGVuZ3RoID4gMCApIHtcbiAgICAgICAgJCggJ2lucHV0W25hbWU9d2NfYWNjb3VudF9mdW5kc19hcHBseV0nICkudHJpZ2dlciggJ2NsaWNrJyApO1xuICAgICAgICBDb29raWVzLnJlbW92ZSgnZnVuZHNfYXV0b19hcHBsaWVkJyk7XG4gICAgICAgIENvb2tpZXMuc2V0KCdmdW5kc19hdXRvX2FwcGxpZWQnLCAnYXBwbGllZCcsIHsgZXhwaXJlczogZGF5c2xlZnQgfSk7XG4gICAgICB9XG4gICAgfVxuICB9XG59KTtcblxuXG5qUXVlcnkoZG9jdW1lbnQpLnJlYWR5KGZ1bmN0aW9uKCQpIHtcbiAgLyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tZGpoIEF1ZyAyNCwgMjAxOFxuICAgIFRyaWdnZXIgcGdoZl9jb250cm9sX2NoZWNrb3V0X3NoaXBwaW5nX29wdGlvbnNcbiAgICBvbiBwYWdlIGxvYWQgYW5kIGV2ZXJ5IGFqYXggY2FsbCBpbiBjaGVja291dCBcbiAgLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG4gIC8vIGlmICggJCgnYm9keScpLmhhc0NsYXNzKCd3b29jb21tZXJjZS1jaGVja291dCcpICkge1xuICAvLyAgICQoJ2JvZHknKS5hcHBlbmQoJzxpbnB1dCB0eXBlPVwiaGlkZGVuXCIgaWQ9XCJwcmV2aW91cy1jYXJ0LXZhbHVlXCIgdmFsdWU9XCIwXCIgLz4nKTtcbiAgLy8gICB2YXIgcmFuID0gcGdoZl9jb250cm9sX2NoZWNrb3V0X3NoaXBwaW5nX29wdGlvbnMoJ25ldyBwYWdlJyk7XG4gIC8vICAgY29uc29sZS5sb2coJ25ldyBwYWdlICcgKyByYW4pO1xuICAvLyB9XG4gICQoZG9jdW1lbnQpLmFqYXhDb21wbGV0ZShmdW5jdGlvbiAoZXZlbnQsIHJlcXVlc3QsIHNldHRpbmdzKSB7XG4gICAgaWYgKCAkKCdib2R5JykuaGFzQ2xhc3MoJ3dvb2NvbW1lcmNlLWNoZWNrb3V0JykgKSB7XG4gICAgICBwZ2hmX2NvbnRyb2xfY2hlY2tvdXRfc2hpcHBpbmdfb3B0aW9ucygnYWpheCcpO1xuICAgIH1cbiAgfSk7XG4gIGZ1bmN0aW9uIHBnaGZfY29udHJvbF9jaGVja291dF9zaGlwcGluZ19vcHRpb25zKGFjdGlvbiA9ICduZXcgcGFnZScpIHtcbiAgICAvLyYmIFxuICAgIGlmICggISAkKCcudG9nZ2xlLWRlZmF1bHQtaGFuZGxpbmcuc2hpcCcpLmlzKCc6dmlzaWJsZScpICkgeyAvLyBob21lL2ZyZWUgZGVsaXZlcnkgaXMgc2VsZWN0ZWQuLi4uXG4gICAgICBpZiAoICEgJCgnLndvb2NvbW1lcmNlLWNoZWNrb3V0LXJldmlldy1vcmRlci10YWJsZSAuc2hpcHBpbmcnKS5sZW5ndGggPiAwICYmICEgJCgnLnN1YnNjcmlwdGlvbi1wcmljZScpLmxlbmd0aCA+IDAgKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICAgIHBnaGZfdmFsaWRhdGVfdGVybXMoKTtcbiAgICAgIHBnaGZfdmFsaWRhdGVfc2hpcHBpbmdfemlwX2NvZGUoKTtcbiAgICAgICQoJyNzaGlwcGluZ19wb3N0Y29kZScpLm9uKCdpbnB1dCcsZnVuY3Rpb24oKXtcbiAgICAgICAgcGdoZl92YWxpZGF0ZV9zaGlwcGluZ196aXBfY29kZSgpO1xuICAgICAgfSk7XG4gICAgICAkKCcud29vY29tbWVyY2UtdGVybXMtYW5kLWNvbmRpdGlvbnMtd3JhcHBlciAudmFsaWRhdGUtcmVxdWlyZWQnKS5vbignY2xpY2snLGZ1bmN0aW9uKCl7XG4gICAgICAgIHBnaGZfdmFsaWRhdGVfdGVybXMoKTtcbiAgICAgIH0pOyAgICAgIFxuXG4gICAgICAvLyAkKCAnI3BsYWNlX29yZGVyJyApLmhvdmVyKFxuICAgICAgLy8gICBmdW5jdGlvbigpIHtcbiAgICAgIC8vICAgICBjb25zb2xlLmxvZygnaG92ZXJlZCcpO1xuICAgICAgLy8gICAgICQoJy53b29jb21tZXJjZS10ZXJtcy1hbmQtY29uZGl0aW9ucy13cmFwcGVyIC52YWxpZGF0ZS1yZXF1aXJlZCcpLmVhY2goZnVuY3Rpb24oKXtcbiAgICAgIC8vICAgICAgIGlmICggJCh0aGlzKS5oYXNDbGFzcygnd29vY29tbWVyY2UtdmFsaWRhdGVkJykgKSB7XG4gICAgICAvLyAgICAgICAgICQoJyNwbGFjZV9vcmRlcicpLmF0dHIoJ2Rpc2FibGVkJywgZmFsc2UpO1xuICAgICAgLy8gICAgICAgfSBlbHNlIHtcbiAgICAgIC8vICAgICAgICAgJCgnI3BsYWNlX29yZGVyJykuYXR0cignZGlzYWJsZWQnLCB0cnVlKTtcbiAgICAgIC8vICAgICAgIH1cbiAgICAgIC8vICAgICB9KTtcbiAgICAgIC8vICAgfSwgZnVuY3Rpb24oKSB7XG4gICAgICAvLyAgICAgY29uc29sZS5sb2coJ3VuaG92ZXJlZCcpO1xuICAgICAgLy8gICAgIC8vICQoIHRoaXMgKS5maW5kKCBcInNwYW46bGFzdFwiICkucmVtb3ZlKCk7XG4gICAgICAvLyAgIH1cbiAgICAgIC8vICk7XG5cbiAgICB9XG4gIH1cblxuICBmdW5jdGlvbiBwZ2hmX3ZhbGlkYXRlX3Rlcm1zKCkge1xuICAgIHZhciBhbGxBcmVDaGVja2VkID0gdHJ1ZTtcbiAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uKCkge1xuICAgICAgJCgnLnBsYWNlLW9yZGVyIC52YWxpZGF0ZS1yZXF1aXJlZCcpLmVhY2goZnVuY3Rpb24oKXtcbiAgICAgICAgdmFyIGNoZWNrZWQgPSAkKHRoaXMpLmZpbmQoJ2lucHV0W3R5cGU9XCJjaGVja2JveFwiXTpjaGVja2VkJyk7XG4gICAgICAgIC8vIGNvbnNvbGUubG9nKGNoZWNrZWQubGVuZ3RoKTtcbiAgICAgICAgaWYgKCAhIGNoZWNrZWQubGVuZ3RoID4gMCAmJiAkKHRoaXMpLmlzKCc6dmlzaWJsZScpICkge1xuICAgICAgICAgIGFsbEFyZUNoZWNrZWQgPSBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgICBpZiAoIGFsbEFyZUNoZWNrZWQgKSB7XG4gICAgICAgICQoJyNwbGFjZV9vcmRlcicpLmF0dHIoJ2Rpc2FibGVkJywgZmFsc2UpO1xuICAgICAgICBwZ2hmX3ZhbGlkYXRlX3NoaXBwaW5nX3ppcF9jb2RlKCk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICAkKCcjcGxhY2Vfb3JkZXInKS5hdHRyKCdkaXNhYmxlZCcsIHRydWUpO1xuICAgICAgfSAgICAgIFxuICAgIH0sIDIwMCk7XG4gIH1cblxuICBmdW5jdGlvbiBwZ2hmX3ZhbGlkYXRlX3NoaXBwaW5nX3ppcF9jb2RlKCkge1xuXG4gICAgJCgnI3NoaXAtdG8tZGlmZmVyZW50LWFkZHJlc3MgbGFiZWwgc3BhbicpLnRleHQoJ0RlbGl2ZXJ5IEFkZHJlc3MgKHJlcXVpcmVkKScpO1xuXG4gICAgdmFyIGFsbG93ZWRfemlwc19zdHJpbmcgPSAkKCcjcGdoZl9hbGxvd2VkX3ppcHMnKS52YWwoKTtcbiAgICAvLyB2YXIgYWxsb3dlZF96aXBzICAgICAgICA9IGFsbG93ZWRfemlwc19zdHJpbmcuc3BsaXQoJywnKS5tYXAoTnVtYmVyKTtcbiAgICB2YXIgYWxsb3dlZF96aXBzICAgICAgICA9IGFsbG93ZWRfemlwc19zdHJpbmcuc3BsaXQoJywnKTtcbiAgICAvLyBjb25zb2xlLmxvZyhhbGxvd2VkX3ppcHMpO1xuXG4gICAgdmFyIHNoaXBwaW5nX3Bvc3Rjb2RlICAgICA9ICQoJyNzaGlwcGluZ19wb3N0Y29kZScpLnZhbCgpO1xuICAgIC8vIGNvbnNvbGUubG9nKGFsbG93ZWRfemlwcy5pbmRleE9mKHNoaXBwaW5nX3Bvc3Rjb2RlKSk7XG4gICAgLy8gY29uc29sZS5sb2coc2hpcHBpbmdfcG9zdGNvZGUpO1xuICAgIGlmICggYWxsb3dlZF96aXBzLmluZGV4T2Yoc2hpcHBpbmdfcG9zdGNvZGUpICE9PSAtMSApIHtcbiAgICAgICQoJyNwbGFjZV9vcmRlcicpLmF0dHIoJ2Rpc2FibGVkJywgZmFsc2UpO1xuICAgICAgJCgnI3BsYWNlX29yZGVyJykudGV4dCgnUGxhY2Ugb3JkZXInKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdmFyIGlzVmFsaWQgPSAvXlswLTldezV9KD86LVswLTldezR9KT8kLy50ZXN0KHNoaXBwaW5nX3Bvc3Rjb2RlKTtcbiAgICAgIGlmICggaXNWYWxpZCApIHtcbiAgICAgICAgaWYgKCAkKCcuc3Vic2NyaXB0aW9uLXByaWNlJykubGVuZ3RoICkge1xuICAgICAgICAgIGlmICggISAkKCcjbm9kZWxpdmVyeS13cmFwcGVyJykubGVuZ3RoICkge1xuICAgICAgICAgICAgdmFyIG5vRGVsaXZlcnkgPSAnPGxhYmVsIGNsYXNzPVwid29vY29tbWVyY2UtZm9ybV9fbGFiZWwgd29vY29tbWVyY2UtZm9ybV9fbGFiZWwtZm9yLWNoZWNrYm94IGNoZWNrYm94XCI+PGlucHV0IHR5cGU9XCJjaGVja2JveFwiIGNsYXNzPVwid29vY29tbWVyY2UtZm9ybV9faW5wdXQgd29vY29tbWVyY2UtZm9ybV9faW5wdXQtY2hlY2tib3ggaW5wdXQtY2hlY2tib3hcIiBuYW1lPVwibm9kZWxpdmVyeVwiIGlkPVwibm9kZWxpdmVyeVwiPjxzcGFuIGNsYXNzPVwid29vY29tbWVyY2Utbm9kZWxpdmVyeS1jaGVja2JveC10ZXh0XCI+SSBhY2tub3dsZWRnZSB0aGF0IG15IGN1cnJlbnQgc2hpcHBpbmcgemlwIGNvZGUgZG9lcyBub3QgcXVhbGlmeSBmb3IgaG9tZSBkZWxpdmVyeS4gRm9vZCBvcmRlcnMgd2lsbCBiZSBMb2NhbCBQaWNrdXAgb25seSB1bmxlc3MgSSB1cGRhdGUgbXkgc2hpcHBpbmcgYWRkcmVzcyB0byBhIHZhbGlkIGRlbGl2ZXJ5IHppcCBjb2RlLjwvc3Bhbj4mbmJzcDs8c3BhbiBjbGFzcz1cInJlcXVpcmVkXCI+Kjwvc3Bhbj48L2xhYmVsPjxpbnB1dCB0eXBlPVwiaGlkZGVuXCIgbmFtZT1cIm5vZGVsaXZlcnktZmllbGRcIiB2YWx1ZT1cIjFcIj4nO1xuICAgICAgICAgICAgJCgnLndvb2NvbW1lcmNlLXRlcm1zLWFuZC1jb25kaXRpb25zLXdyYXBwZXInKS5hcHBlbmQoJzxwIGlkPVwibm9kZWxpdmVyeS13cmFwcGVyXCIgY2xhc3M9XCJmb3JtLXJvdyB2YWxpZGF0ZS1yZXF1aXJlZFwiPicrbm9EZWxpdmVyeSsnPC9wPicpO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAkKCcjbm9kZWxpdmVyeS13cmFwcGVyJykuaHRtbChub0RlbGl2ZXJ5KTtcbiAgICAgICAgICB9XG4gICAgICAgICAgJCgnI3BsYWNlX29yZGVyJykuYXR0cignZGlzYWJsZWQnLCBmYWxzZSk7XG4gICAgICAgICAgJCgnI3BsYWNlX29yZGVyJykudGV4dCgnUGxhY2Ugb3JkZXInKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAkKCcjcGxhY2Vfb3JkZXInKS5hdHRyKCdkaXNhYmxlZCcsIHRydWUpO1xuICAgICAgICAgICQoJyNwbGFjZV9vcmRlcicpLnRleHQoJ0hvbWUgZGVsaXZlcnkgbm90IGF2YWlsYWJsZSB0byB5b3VyIHppcCBjb2RlLiBQbGVhc2Ugc2VsZWN0IExvY2FsIFBpY2t1cCBhYm92ZSBvciBjaGFuZ2UgZGVsaXZlcnkgYWRkcmVzcy4nKTsgXG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgICQoJyNwbGFjZV9vcmRlcicpLmF0dHIoJ2Rpc2FibGVkJywgdHJ1ZSk7XG4gICAgICAgICQoJyNwbGFjZV9vcmRlcicpLnRleHQoJ1NldCB5b3VyIGRlbGl2ZXJ5IHppcCBjb2RlJyk7IFxuICAgICAgfVxuICAgIH1cblxuICAgIC8vIHJldHVybiB0cnVlO1xuXG4gIH1cblxufSk7IC8qIGVuZCBkb2MgcmVhZHkgKi8iXX0=
