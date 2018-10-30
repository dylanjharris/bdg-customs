(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
'use strict';

/*----------------------------------------------djh Jul 27, 2018
  Custom Site-wide scripts
----------------------------------------------*/
jQuery(document).ready(function ($) {

  $('.storefront-handheld-footer-bar ul').removeClass('columns-3');
  $('.storefront-handheld-footer-bar ul').addClass('columns-2');
});

jQuery(document).ready(function ($) {

  /*----------------------------------------------djh Aug 15, 2018
    Helper functions
  ----------------------------------------------*/
  // note: offset - pixels has to match sticky header sizes
  function scrollToAnchor(aid) {
    var offset = 0;
    var width = $(window).width();
    if (width > 767 && width < 1021) {
      offset = 135;
    } else if (width > 1020) {
      offset = 120;
    }

    var aTag = $(aid);
    $('html,body').animate({ scrollTop: aTag.offset().top - offset }, 'slow');
  }

  /*----------------------------------------------djh Sep 16, 2018
    Sticky header
  ----------------------------------------------*/
  $(window).scroll(function () {
    if ($(this).scrollTop() > 3) {
      $('#masthead').addClass('sticky-header');
      $('#backToTop').removeClass('hidden-by-default');
    } else {
      $('#masthead').removeClass('sticky-header');
      $('#backToTop').addClass('hidden-by-default');
    }
  });

  /*----------------------------------------------djh Sep 16, 2018
    Anytime a hash is used, smooth scroll it & offset
  ----------------------------------------------*/
  if (window.location.hash) {
    var hash = window.location.hash;
    if ($(hash).length) {
      scrollToAnchor(window.location.hash);
    } else {
      // console.log('url has hash, but corresponding id does not exist');
    }
  } else {}
    // console.log('url does not have hash');

    /*----------------------------------------------djh Sep 18, 2018
      When Menu Category is clicked, smooth scroll and adjust for header
    ----------------------------------------------*/
  $('.menu-category-nav-item a').on('click', function (e) {
    e.preventDefault();
    var goto = $(this).attr('href');
    scrollToAnchor(goto);
  });
  $('#backToTopLink').on('click', function (e) {
    e.preventDefault();
    var goto = $(this).attr('href');
    scrollToAnchor(goto);
  });

  /*----------------------------------------------djh Aug 12, 2018
    WooCommerce Cart Page
    TODO: improve this
  ----------------------------------------------*/
  $('.woocommerce-remove-coupon').on('click', function () {
    var dataCoupon = $(this).data('coupon');
    if (dataCoupon.startsWith('wc_points_redemption')) {
      $('body').addClass('show-apply-discount-message');
    }
  });

  // if( $('body').hasClass('woocommerce-cart') ) {
  //   $('.edit_in_cart_text small').text('(change side)');
  // }

  // $( document ).ajaxComplete(function( event, request, settings ) {
  //   if( $('body').hasClass('woocommerce-cart') ) {
  //     $('.edit_in_cart_text small').text('(change side)');
  //     $('body').addClass('show-apply-discount-message');
  //   }
  // });


  /*----------------------------------------------djh Aug 27, 2018
    Adjust Single Product Page for Subscriptions
  ----------------------------------------------*/
  if ($('body.single-product')) {
    var string = $('.first-payment-date');
    $('.price').append(string);
  }

  /*----------------------------------------------djh Aug 10, 2018
    Set My Current Balance in Nav Bar UNUSED
  ----------------------------------------------*/
  // if ( $('#my-current-balance').length ) {
  //   var currentBalance = $('#my-current-balance').data('balance');
  //   $('.my-current-balance').html('$'+currentBalance);
  // }

  /*----------------------------------------------djh Aug 15, 2018
    Change "First payment" text on single product subscription pages
    TODO: remove after single product pages are eliminated
  ----------------------------------------------*/
  if ($('.first-payment-date').length) {
    $('.first-payment-date small small').contents().filter(function () {
      return this.nodeType == 3;
    }).each(function () {
      this.textContent = this.textContent.replace('First payment', 'Next recurring payment');
    });
  }

  /*----------------------------------------------djh Aug 15, 2018
    Ajax / Search Zip Codes for allow_delivery field
  ----------------------------------------------*/
  if ($('#search-zips').length) {
    $("#search-zips").submit(function (event) {
      event.preventDefault();
      var formData = {};
      var values = $(this).serialize();
      values = values.split('&');
      $.each(values, function (index, value) {
        var pair = value.split('=');
        var name = pair[0];
        var data = pair[1];
        formData[name] = data;
      });
      $.post(config_custom.ajax_url, formData, function (response) {
        $('#search-zips-message').html('<div>' + response + '</div>');
      });
    });
  }

  /*----------------------------------------------djh Aug 15, 2018
    Subscription quiz
  ----------------------------------------------*/
  if ($('#gform_wrapper_3').length) {
    // this is the Pricing / Subscriptions page

    if (config_custom.quiz == '1') {
      $('.sub-quiz-container').removeClass('hidden-by-default');
    }

    $('#field_3_3').css('display', 'none');
    $('#field_3_5').css('display', 'none');
    $('#field_3_19').css('display', 'none');

    $('#quiz-trigger').click(function (event) {
      event.preventDefault();
      $('.sub-quiz-container').removeClass('hidden-by-default');
      scrollToAnchor('#sub-quiz');
    });

    $('#input_3_2').on('change', function () {
      var type = $('#input_3_18').val();
      if (this.value === '1') {
        $('#field_3_3').css('display', 'list-item');
        $('#field_3_5').css('display', 'none');
      } else if (this.value === '4') {
        $('#field_3_3').css('display', 'none');
        $('#field_3_5').css('display', 'list-item');
      }

      if (type === 'giftcard') {
        $('#field_3_19').css('display', 'list-item');
      }
    });

    // $('#input_3_4').on('change', function() {
    //   if ( this.value === '1' ) {
    //     $('#field_3_3').css('display','list-item');
    //     $('#field_3_5').css('display','none');
    //   } else if ( this.value === '4' ) {
    //     $('#field_3_3').css('display','none');
    //     $('#field_3_5').css('display','list-item');
    //   }
    // });

    // 
  }

  if ($('#sub-outro-link')) {
    $('#sub-outro-link').click(function (event) {
      event.preventDefault();
      $('#all-subs').removeClass('hidden-by-default');
      scrollToAnchor('#all-subs');
    });
  }

  /*----------------------------------------------djh Sep 28, 2018
    Auto-apply Points & Rewards Balance UNUSED
  ----------------------------------------------*/
  // if( $('body').hasClass('woocommerce-cart') && $('input[name=wc_points_rewards_apply_discount]').length && ! $('.subscription-details').length ) {
  //   $( 'input[name=wc_points_rewards_apply_discount]' ).trigger( 'click' );
  // }
  /*----------------------------------------------djh Sep 28, 2018
    Auto-apply Account Funds Balance
  ----------------------------------------------*/
  // if( $('body').hasClass('woocommerce-cart') && $('input[name=wc_account_funds_apply]').length && ! $('.subscription-details').length ) {
  //   $( 'input[name=wc_account_funds_apply]' ).trigger( 'click' );
  // }


  /*----------------------------------------------djh Sep 14, 2018
    PART 0 create a function
  ----------------------------------------------*/
  function pghf_control_cart_checkout_options() {
    var action = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'new page';

    var subtotal = $('.cart-subtotal .woocommerce-Price-amount').text();
    subtotal = subtotal.replace('$', '');
    subtotal = subtotal.replace(',', '');
    subtotal = parseFloat(subtotal);
    var prevtotal = $('#previous-cart-value').val();
    prevtotal = parseFloat(prevtotal);
    var deliveryDifference = 0;
    var freeshipDifference = 0;
    if (subtotal !== prevtotal) {
      $('#previous-cart-value').val(subtotal);
      // console.log('prev: ' + prevtotal);
      // console.log('subt: ' + subtotal);
    }

    // if (subtotal < 50) {
    //   deliveryDifference = 50 - subtotal;
    //   deliveryDifference = deliveryDifference.toFixed(2);
    //   freeshipDifference = 100 - subtotal;
    //   freeshipDifference = freeshipDifference.toFixed(2);
    //   setTimeout(function () {
    //     // if currently set to home delivery, trigger pickup
    //     if ( $('.toggle-default-handling.pickup').is(':visible') ) {
    //       $('.toggle-default-handling.pickup').trigger('click');
    //     }
    //     if ( $('.toggle-default-handling.ship').is(':visible') ) {
    //       $('.toggle-default-handling.ship').click(function (event) {
    //         event.preventDefault();
    //       });          
    //     }
    //   }, 10);

    //   setTimeout(function () {
    //     $('#wc-local-pickup-plus-toggle-default-handling').html('Orders under $50 are not eligible for home delivery. <ul><li>Add <span class="green">$'+deliveryDifference+'</span> or more to your cart for home delivery ($6 delivery fee applies).</li><li> Add <span class="green">$'+freeshipDifference+'</span> or more to your cart for <em>free</em> delivery!</li></ul> <div class="fineprint">* Some restrictions apply. Only available to specific zip codes.</div>');
    //   }, 20);

    // }
    // if (subtotal >= 50 ) {
    //   setTimeout(function () {
    //     $('#wc-local-pickup-plus-toggle-default-handling').css('display', 'block');
    //   }, 10);
    // }
    if (subtotal < 50) {
      Cookies.remove('default_to_delivery');
      // if < 50, shipping should not be an option, hide with inline style
      if (!$('#shipping-styleblock').length) {
        var styleblock = '<div id="shipping-styleblock"><style>.toggle-default-handling.ship{display:none!important}</style></div>';
        $('tr.shipping').append(styleblock);
      }
      // if currently set to home delivery, trigger pickup
      setTimeout(function () {
        if ($('.toggle-default-handling.pickup').is(':visible')) {
          $('.toggle-default-handling.pickup').trigger('click');
        }
      }, 10);
    } else if (subtotal >= 50 && subtotal < 100) {
      Cookies.remove('default_to_delivery');
      setTimeout(function () {
        if (!$('.toggle-default-handling.ship').is(':visible')) {// home delivery is selected....
        } else {
          // local pickup is selected....
          if ($('#shipping-styleblock').length) {
            $('#shipping-styleblock').remove();
          }
        }
      }, 10);
    } else if (subtotal >= 100) {
      // set Local Pickup to Home Delivery if it is not already selected the first time their order qualifies
      var default_to_delivery = Cookies.get('default_to_delivery');
      if (default_to_delivery === undefined) {
        if (!$('.toggle-default-handling.pickup').is(':visible')) {
          // if pickup is selected....
          $('.toggle-default-handling.ship').trigger('click');
          Cookies.set('default_to_delivery', 'triggered', { expires: 1 });
        }
      }
    }
    // unhide shipping option if total over $50
    if (subtotal >= 50) {
      if ($('#shipping-styleblock').length) {
        $('#shipping-styleblock').remove();
      }
    }

    // if this is the first page load, click the "Apply Discount" automatically
    // if ( action === 'new page' ) {
    //   if( $('body').hasClass('woocommerce-cart') && $('input[name=wc_points_rewards_apply_discount]').length && ! $('.subscription-details').length ) {
    //     $( 'input[name=wc_points_rewards_apply_discount]' ).trigger( 'click' );
    //   }
    // }

    // if ( action === 'new page' ) {
    //   console.log(action);
    //   if( $('body').hasClass('woocommerce-cart') && $('input[name=wc_account_funds_apply]').length && ! $('.subscription-details').length ) {
    //     $( 'input[name=wc_account_funds_apply]' ).trigger( 'click' );
    //   }
    // }


    // always change "Points Redemption" to "Balance Redemption"
    // always addClass 'button' to .toggle-default-handling link
    // always remove "remove button" from item 3688 Delivery Charge
    setTimeout(function () {
      // $("tr[class*=' coupon-wc_points_redemption'] th").text("Balance redemption");
      $('.toggle-default-handling').addClass('button');

      // $('.tax_label').text('incl. 7% tax');

      // if ( $('body').hasClass('woocommerce-checkout') ) {
      //   $('tr.shipping td').append('<div><small><a href="/cart/">Change shipping?</a></small></div>');
      // }

      $('.gift-certificate.sc_info_box h3').text('SEND GIFT CARDS TO...');
      $('.gift-certificate-show-form p').html('Your order contains gift cards, yay! Enter your own email to print it out later, or enter a different email to send as a gift!');
      $('#show_form').trigger('click');
      $('label[for="show_form"]').text('Enter email address below');
      $('.show_hide_list').css('text-indent', '-9999px');
      $('.show_hide_list').css('height', '0');
      $('.gift-certificate.sc_info_box').css('display', 'block');

      // $('.woocommerce-cart-form__cart-item .product-remove a').each(function() {
      //   var product_id = $(this).data('product_id');
      //   if ( product_id === 3688 ) {
      //     $(this).remove();
      //   }
      // });

      $('.toggle-default-handling').each(function () {
        var toggleText = $(this).text();
        toggleText = toggleText.replace('Click if you want these items to be shipped.', 'CHANGE TO HOME DELIVERY');
        toggleText = toggleText.replace('Click if you want to pickup these items.', 'CHANGE TO LOCAL PICKUP');
        toggleText = toggleText.replace('Click if you want to pickup this item.', 'CHANGE TO LOCAL PICKUP');
        $(this).text(toggleText);
      });
    }, 10);

    return true;
  }

  /*----------------------------------------------djh Aug 24, 2018
    Trigger pghf_control_cart_checkout_options
    on page load and every ajax call in cart/checkout 
  ----------------------------------------------*/
  if ($('body').hasClass('woocommerce-cart') || $('body').hasClass('woocommerce-checkout')) {
    $('body').append('<input type="hidden" id="previous-cart-value" value="0" />');
    var ran = pghf_control_cart_checkout_options('new page');
    // console.log('new page ' + ran);
  }
  $(document).ajaxComplete(function (event, request, settings) {
    if ($('body').hasClass('woocommerce-cart') || $('body').hasClass('woocommerce-checkout')) {
      var ran = pghf_control_cart_checkout_options('ajax');
      // console.log('ajax ' + ran);
    }
  });
  $(document.body).on('updated_cart_totals', function () {
    // console.log($('.cart-subtotal .woocommerce-Price-amount').text());
    // console.log('updated_cart_totals');
    // console.log($('.cart-subtotal .woocommerce-Price-amount').text());

    var data = {
      'action': 'update_minicart',
      'updated_cart_totals': true
    };

    $.post(config_custom.ajax_url, data, function (response) {
      // console.log('function ran...' + response.test);
      // console.log(response.quantity);
      var quantity = parseInt(response.quantity);
      $('.current-cart-qty').text(quantity);
      if (quantity <= 0) {
        $('.quantity-before').text('');
        $('.quantity-after').text('');
        $('#quantity-number').text('');
      }
    });
  });

  /*----------------------------------------------djh Sep 13, 2018
    Show Hidden FAQs
  ----------------------------------------------*/
  if ($('#show-all-faqs').length) {
    $('#show-all-faqs').on('click', function (e) {
      e.preventDefault();
      $('.faq-card.hidden-by-default').removeClass('hidden-by-default');
      $('.faq-card.half-hidden').removeClass('half-hidden');
      $('#show-all-faqs').addClass('hidden-by-default');
    });
  }
}); /* end doc ready */

},{}]},{},[1])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmMvanMvY3VzdG9tLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7QUNBQTs7O0FBR0EsT0FBTyxRQUFQLEVBQWlCLEtBQWpCLENBQXVCLFVBQVMsQ0FBVCxFQUFXOztBQUVoQyxJQUFFLG9DQUFGLEVBQXdDLFdBQXhDLENBQW9ELFdBQXBEO0FBQ0EsSUFBRSxvQ0FBRixFQUF3QyxRQUF4QyxDQUFpRCxXQUFqRDtBQUVELENBTEQ7O0FBT0EsT0FBTyxRQUFQLEVBQWlCLEtBQWpCLENBQXVCLFVBQVMsQ0FBVCxFQUFZOztBQUVqQzs7O0FBR0E7QUFDQSxXQUFTLGNBQVQsQ0FBd0IsR0FBeEIsRUFBNEI7QUFDMUIsUUFBSSxTQUFTLENBQWI7QUFDQSxRQUFJLFFBQVEsRUFBRSxNQUFGLEVBQVUsS0FBVixFQUFaO0FBQ0EsUUFBSyxRQUFRLEdBQVIsSUFBZSxRQUFRLElBQTVCLEVBQW1DO0FBQ2pDLGVBQVMsR0FBVDtBQUNELEtBRkQsTUFFTyxJQUFLLFFBQVEsSUFBYixFQUFvQjtBQUN6QixlQUFTLEdBQVQ7QUFDRDs7QUFFRCxRQUFJLE9BQU8sRUFBRSxHQUFGLENBQVg7QUFDQSxNQUFFLFdBQUYsRUFBZSxPQUFmLENBQXVCLEVBQUMsV0FBVyxLQUFLLE1BQUwsR0FBYyxHQUFkLEdBQW9CLE1BQWhDLEVBQXZCLEVBQStELE1BQS9EO0FBQ0Q7O0FBRUQ7OztBQUdBLElBQUUsTUFBRixFQUFVLE1BQVYsQ0FBaUIsWUFBVztBQUMxQixRQUFJLEVBQUUsSUFBRixFQUFRLFNBQVIsS0FBc0IsQ0FBMUIsRUFBNkI7QUFDM0IsUUFBRSxXQUFGLEVBQWUsUUFBZixDQUF3QixlQUF4QjtBQUNBLFFBQUUsWUFBRixFQUFnQixXQUFoQixDQUE0QixtQkFBNUI7QUFDRCxLQUhELE1BR087QUFDTCxRQUFFLFdBQUYsRUFBZSxXQUFmLENBQTJCLGVBQTNCO0FBQ0EsUUFBRSxZQUFGLEVB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LFVBQVMsQ0FBVCxFQUFXO0FBQ3hDLFFBQUUsY0FBRjtBQUNBLFFBQUUsNkJBQUYsRUFBaUMsV0FBakMsQ0FBNkMsbUJBQTdDO0FBQ0EsUUFBRSx1QkFBRixFQUEyQixXQUEzQixDQUF1QyxhQUF2QztBQUNBLFFBQUUsZ0JBQUYsRUFBb0IsUUFBcEIsQ0FBNkIsbUJBQTdCO0FBQ0QsS0FMRDtBQU1EO0FBRUYsQ0E1WkQsRSxDQTRaSSIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uKCl7ZnVuY3Rpb24gcihlLG4sdCl7ZnVuY3Rpb24gbyhpLGYpe2lmKCFuW2ldKXtpZighZVtpXSl7dmFyIGM9XCJmdW5jdGlvblwiPT10eXBlb2YgcmVxdWlyZSYmcmVxdWlyZTtpZighZiYmYylyZXR1cm4gYyhpLCEwKTtpZih1KXJldHVybiB1KGksITApO3ZhciBhPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIraStcIidcIik7dGhyb3cgYS5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGF9dmFyIHA9bltpXT17ZXhwb3J0czp7fX07ZVtpXVswXS5jYWxsKHAuZXhwb3J0cyxmdW5jdGlvbihyKXt2YXIgbj1lW2ldWzFdW3JdO3JldHVybiBvKG58fHIpfSxwLHAuZXhwb3J0cyxyLGUsbix0KX1yZXR1cm4gbltpXS5leHBvcnRzfWZvcih2YXIgdT1cImZ1bmN0aW9uXCI9PXR5cGVvZiByZXF1aXJlJiZyZXF1aXJlLGk9MDtpPHQubGVuZ3RoO2krKylvKHRbaV0pO3JldHVybiBvfXJldHVybiByfSkoKSIsIi8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLWRqaCBKdWwgMjcsIDIwMThcbiAgQ3VzdG9tIFNpdGUtd2lkZSBzY3JpcHRzXG4tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cbmpRdWVyeShkb2N1bWVudCkucmVhZHkoZnVuY3Rpb24oJCl7XG5cbiAgJCgnLnN0b3JlZnJvbnQtaGFuZGhlbGQtZm9vdGVyLWJhciB1bCcpLnJlbW92ZUNsYXNzKCdjb2x1bW5zLTMnKTtcbiAgJCgnLnN0b3JlZnJvbnQtaGFuZGhlbGQtZm9vdGVyLWJhciB1bCcpLmFkZENsYXNzKCdjb2x1bW5zLTInKTtcblxufSk7XG5cbmpRdWVyeShkb2N1bWVudCkucmVhZHkoZnVuY3Rpb24oJCkge1xuXG4gIC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLWRqaCBBdWcgMTUsIDIwMThcbiAgICBIZWxwZXIgZnVuY3Rpb25zXG4gIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuICAvLyBub3RlOiBvZmZzZXQgLSBwaXhlbHMgaGFzIHRvIG1hdGNoIHN0aWNreSBoZWFkZXIgc2l6ZXNcbiAgZnVuY3Rpb24gc2Nyb2xsVG9BbmNob3IoYWlkKXtcbiAgICB2YXIgb2Zmc2V0ID0gMDtcbiAgICB2YXIgd2lkdGggPSAkKHdpbmRvdykud2lkdGgoKTtcbiAgICBpZiAoIHdpZHRoID4gNzY3ICYmIHdpZHRoIDwgMTAyMSApIHtcbiAgICAgIG9mZnNldCA9IDEzNTtcbiAgICB9IGVsc2UgaWYgKCB3aWR0aCA+IDEwMjAgKSB7XG4gICAgICBvZmZzZXQgPSAxMjA7XG4gICAgfVxuXG4gICAgdmFyIGFUYWcgPSAkKGFpZCk7XG4gICAgJCgnaHRtbCxib2R5JykuYW5pbWF0ZSh7c2Nyb2xsVG9wOiBhVGFnLm9mZnNldCgpLnRvcCAtIG9mZnNldH0sJ3Nsb3cnKTtcbiAgfVxuXG4gIC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLWRqaCBTZXAgMTYsIDIwMThcbiAgICBTdGlja3kgaGVhZGVyXG4gIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuICAkKHdpbmRvdykuc2Nyb2xsKGZ1bmN0aW9uKCkge1xuICAgIGlmICgkKHRoaXMpLnNjcm9sbFRvcCgpID4gMykge1xuICAgICAgJCgnI21hc3RoZWFkJykuYWRkQ2xhc3MoJ3N0aWNreS1oZWFkZXInKTtcbiAgICAgICQoJyNiYWNrVG9Ub3AnKS5yZW1vdmVDbGFzcygnaGlkZGVuLWJ5LWRlZmF1bHQnKTtcbiAgICB9IGVsc2Uge1xuICAgICAgJCgnI21hc3RoZWFkJykucmVtb3ZlQ2xhc3MoJ3N0aWNreS1oZWFkZXInKTtcbiAgICAgICQoJyNiYWNrVG9Ub3AnKS5hZGRDbGFzcygnaGlkZGVuLWJ5LWRlZmF1bHQnKTtcbiAgICB9XG4gIH0pO1xuXG4gIC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLWRqaCBTZXAgMTYsIDIwMThcbiAgICBBbnl0aW1lIGEgaGFzaCBpcyB1c2VkLCBzbW9vdGggc2Nyb2xsIGl0ICYgb2Zmc2V0XG4gIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuICBpZih3aW5kb3cubG9jYXRpb24uaGFzaCkge1xuICAgIHZhciBoYXNoID0gd2luZG93LmxvY2F0aW9uLmhhc2g7XG4gICAgaWYgKCAkKGhhc2gpLmxlbmd0aCApIHtcbiAgICAgIHNjcm9sbFRvQW5jaG9yKHdpbmRvdy5sb2NhdGlvbi5oYXNoKTtcbiAgICB9IGVsc2Uge1xuICAgICAgLy8gY29uc29sZS5sb2coJ3VybCBoYXMgaGFzaCwgYnV0IGNvcnJlc3BvbmRpbmcgaWQgZG9lcyBub3QgZXhpc3QnKTtcbiAgICB9XG4gIH0gZWxzZSB7XG4gICAgLy8gY29uc29sZS5sb2coJ3VybCBkb2VzIG5vdCBoYXZlIGhhc2gnKTtcbiAgfVxuICAvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1kamggU2VwIDE4LCAyMDE4XG4gICAgV2hlbiBNZW51IENhdGVnb3J5IGlzIGNsaWNrZWQsIHNtb290aCBzY3JvbGwgYW5kIGFkanVzdCBmb3IgaGVhZGVyXG4gIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuICAkKCcubWVudS1jYXRlZ29yeS1uYXYtaXRlbSBhJykub24oJ2NsaWNrJyxmdW5jdGlvbihlKXtcbiAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgdmFyIGdvdG8gPSAkKHRoaXMpLmF0dHIoJ2hyZWYnKTtcbiAgICBzY3JvbGxUb0FuY2hvcihnb3RvKTtcbiAgfSk7XG4gICQoJyNiYWNrVG9Ub3BMaW5rJykub24oJ2NsaWNrJyxmdW5jdGlvbihlKXtcbiAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgdmFyIGdvdG8gPSAkKHRoaXMpLmF0dHIoJ2hyZWYnKTtcbiAgICBzY3JvbGxUb0FuY2hvcihnb3RvKTtcbiAgfSk7XG5cblxuXG5cblxuICAvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1kamggQXVnIDEyLCAyMDE4XG4gICAgV29vQ29tbWVyY2UgQ2FydCBQYWdlXG4gICAgVE9ETzogaW1wcm92ZSB0aGlzXG4gIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuICAkKCcud29vY29tbWVyY2UtcmVtb3ZlLWNvdXBvbicpLm9uKCdjbGljaycsZnVuY3Rpb24oKXtcbiAgICB2YXIgZGF0YUNvdXBvbiA9ICQodGhpcykuZGF0YSgnY291cG9uJyk7XG4gICAgaWYoIGRhdGFDb3Vwb24uc3RhcnRzV2l0aCgnd2NfcG9pbnRzX3JlZGVtcHRpb24nKSApIHtcbiAgICAgICQoJ2JvZHknKS5hZGRDbGFzcygnc2hvdy1hcHBseS1kaXNjb3VudC1tZXNzYWdlJyk7XG4gICAgfVxuICB9KTtcblxuICAvLyBpZiggJCgnYm9keScpLmhhc0NsYXNzKCd3b29jb21tZXJjZS1jYXJ0JykgKSB7XG4gIC8vICAgJCgnLmVkaXRfaW5fY2FydF90ZXh0IHNtYWxsJykudGV4dCgnKGNoYW5nZSBzaWRlKScpO1xuICAvLyB9XG5cbiAgLy8gJCggZG9jdW1lbnQgKS5hamF4Q29tcGxldGUoZnVuY3Rpb24oIGV2ZW50LCByZXF1ZXN0LCBzZXR0aW5ncyApIHtcbiAgLy8gICBpZiggJCgnYm9keScpLmhhc0NsYXNzKCd3b29jb21tZXJjZS1jYXJ0JykgKSB7XG4gIC8vICAgICAkKCcuZWRpdF9pbl9jYXJ0X3RleHQgc21hbGwnKS50ZXh0KCcoY2hhbmdlIHNpZGUpJyk7XG4gIC8vICAgICAkKCdib2R5JykuYWRkQ2xhc3MoJ3Nob3ctYXBwbHktZGlzY291bnQtbWVzc2FnZScpO1xuICAvLyAgIH1cbiAgLy8gfSk7XG5cblxuICAvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1kamggQXVnIDI3LCAyMDE4XG4gICAgQWRqdXN0IFNpbmdsZSBQcm9kdWN0IFBhZ2UgZm9yIFN1YnNjcmlwdGlvbnNcbiAgLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG4gIGlmICggJCgnYm9keS5zaW5nbGUtcHJvZHVjdCcpICkge1xuICAgIHZhciBzdHJpbmcgPSAkKCcuZmlyc3QtcGF5bWVudC1kYXRlJyk7XG4gICAgJCgnLnByaWNlJykuYXBwZW5kKHN0cmluZyk7XG4gIH1cblxuICAvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1kamggQXVnIDEwLCAyMDE4XG4gICAgU2V0IE15IEN1cnJlbnQgQmFsYW5jZSBpbiBOYXYgQmFyIFVOVVNFRFxuICAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cbiAgLy8gaWYgKCAkKCcjbXktY3VycmVudC1iYWxhbmNlJykubGVuZ3RoICkge1xuICAvLyAgIHZhciBjdXJyZW50QmFsYW5jZSA9ICQoJyNteS1jdXJyZW50LWJhbGFuY2UnKS5kYXRhKCdiYWxhbmNlJyk7XG4gIC8vICAgJCgnLm15LWN1cnJlbnQtYmFsYW5jZScpLmh0bWwoJyQnK2N1cnJlbnRCYWxhbmNlKTtcbiAgLy8gfVxuXG4gIC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLWRqaCBBdWcgMTUsIDIwMThcbiAgICBDaGFuZ2UgXCJGaXJzdCBwYXltZW50XCIgdGV4dCBvbiBzaW5nbGUgcHJvZHVjdCBzdWJzY3JpcHRpb24gcGFnZXNcbiAgICBUT0RPOiByZW1vdmUgYWZ0ZXIgc2luZ2xlIHByb2R1Y3QgcGFnZXMgYXJlIGVsaW1pbmF0ZWRcbiAgLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG4gIGlmICggJCgnLmZpcnN0LXBheW1lbnQtZGF0ZScpLmxlbmd0aCApIHtcbiAgICAkKCcuZmlyc3QtcGF5bWVudC1kYXRlIHNtYWxsIHNtYWxsJykuY29udGVudHMoKS5maWx0ZXIoZnVuY3Rpb24oKSB7XG4gICAgICAgIHJldHVybiB0aGlzLm5vZGVUeXBlID09IDNcbiAgICB9KS5lYWNoKGZ1bmN0aW9uKCl7XG4gICAgICAgIHRoaXMudGV4dENvbnRlbnQgPSB0aGlzLnRleHRDb250ZW50LnJlcGxhY2UoJ0ZpcnN0IHBheW1lbnQnLCdOZXh0IHJlY3VycmluZyBwYXltZW50Jyk7XG4gICAgfSk7ICAgIFxuICB9XG5cbiAgLyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tZGpoIEF1ZyAxNSwgMjAxOFxuICAgIEFqYXggLyBTZWFyY2ggWmlwIENvZGVzIGZvciBhbGxvd19kZWxpdmVyeSBmaWVsZFxuICAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cbiAgaWYgKCAkKCcjc2VhcmNoLXppcHMnKS5sZW5ndGggKSB7XG4gICAgJCggXCIjc2VhcmNoLXppcHNcIiApLnN1Ym1pdChmdW5jdGlvbiggZXZlbnQgKSB7XG4gICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgdmFyIGZvcm1EYXRhICA9IHt9O1xuICAgICAgdmFyIHZhbHVlcyAgICA9ICQodGhpcykuc2VyaWFsaXplKCk7XG4gICAgICB2YWx1ZXMgICAgICAgID0gdmFsdWVzLnNwbGl0KCcmJyk7XG4gICAgICAkLmVhY2godmFsdWVzLCBmdW5jdGlvbiggaW5kZXgsIHZhbHVlICkge1xuICAgICAgICB2YXIgcGFpciA9IHZhbHVlLnNwbGl0KCc9Jyk7XG4gICAgICAgIHZhciBuYW1lID0gcGFpclswXTtcbiAgICAgICAgdmFyIGRhdGEgPSBwYWlyWzFdO1xuICAgICAgICBmb3JtRGF0YVtuYW1lXSA9IGRhdGE7XG4gICAgICB9KTtcbiAgICAgICQucG9zdChjb25maWdfY3VzdG9tLmFqYXhfdXJsLCBcbiAgICAgICAgZm9ybURhdGEsIFxuICAgICAgICBmdW5jdGlvbihyZXNwb25zZSkge1xuICAgICAgICAgICQoJyNzZWFyY2gtemlwcy1tZXNzYWdlJykuaHRtbCgnPGRpdj4nICsgcmVzcG9uc2UgKyAnPC9kaXY+Jyk7XG4gICAgICAgIH1cbiAgICAgICk7XG4gICAgfSk7XG4gIH1cblxuICAvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1kamggQXVnIDE1LCAyMDE4XG4gICAgU3Vic2NyaXB0aW9uIHF1aXpcbiAgLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG4gIGlmICggJCgnI2dmb3JtX3dyYXBwZXJfMycpLmxlbmd0aCApIHsgLy8gdGhpcyBpcyB0aGUgUHJpY2luZyAvIFN1YnNjcmlwdGlvbnMgcGFnZVxuXG4gICAgaWYgKCBjb25maWdfY3VzdG9tLnF1aXogPT0gJzEnICkge1xuICAgICAgJCggJy5zdWItcXVpei1jb250YWluZXInICkucmVtb3ZlQ2xhc3MoJ2hpZGRlbi1ieS1kZWZhdWx0Jyk7XG4gICAgfVxuXG4gICAgJCgnI2ZpZWxkXzNfMycpLmNzcygnZGlzcGxheScsJ25vbmUnKTtcbiAgICAkKCcjZmllbGRfM181JykuY3NzKCdkaXNwbGF5Jywnbm9uZScpO1xuICAgICQoJyNmaWVsZF8zXzE5JykuY3NzKCdkaXNwbGF5Jywnbm9uZScpO1xuXG4gICAgJCggJyNxdWl6LXRyaWdnZXInICkuY2xpY2soZnVuY3Rpb24oIGV2ZW50ICkge1xuICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICQoICcuc3ViLXF1aXotY29udGFpbmVyJyApLnJlbW92ZUNsYXNzKCdoaWRkZW4tYnktZGVmYXVsdCcpO1xuICAgICAgc2Nyb2xsVG9BbmNob3IoJyNzdWItcXVpeicpO1xuICAgIH0pO1xuXG4gICAgXG4gICAgJCgnI2lucHV0XzNfMicpLm9uKCdjaGFuZ2UnLCBmdW5jdGlvbigpIHtcbiAgICAgIHZhciB0eXBlID0gJCgnI2lucHV0XzNfMTgnKS52YWwoKTtcbiAgICAgIGlmICggdGhpcy52YWx1ZSA9PT0gJzEnICkge1xuICAgICAgICAkKCcjZmllbGRfM18zJykuY3NzKCdkaXNwbGF5JywnbGlzdC1pdGVtJyk7XG4gICAgICAgICQoJyNmaWVsZF8zXzUnKS5jc3MoJ2Rpc3BsYXknLCdub25lJyk7XG4gICAgICB9IGVsc2UgaWYgKCB0aGlzLnZhbHVlID09PSAnNCcgKSB7XG4gICAgICAgICQoJyNmaWVsZF8zXzMnKS5jc3MoJ2Rpc3BsYXknLCdub25lJyk7XG4gICAgICAgICQoJyNmaWVsZF8zXzUnKS5jc3MoJ2Rpc3BsYXknLCdsaXN0LWl0ZW0nKTtcbiAgICAgIH1cblxuICAgICAgaWYgKCB0eXBlID09PSAnZ2lmdGNhcmQnICkge1xuICAgICAgICAkKCcjZmllbGRfM18xOScpLmNzcygnZGlzcGxheScsJ2xpc3QtaXRlbScpO1xuICAgICAgfVxuICAgIH0pO1xuXG4gICAgLy8gJCgnI2lucHV0XzNfNCcpLm9uKCdjaGFuZ2UnLCBmdW5jdGlvbigpIHtcbiAgICAvLyAgIGlmICggdGhpcy52YWx1ZSA9PT0gJzEnICkge1xuICAgIC8vICAgICAkKCcjZmllbGRfM18zJykuY3NzKCdkaXNwbGF5JywnbGlzdC1pdGVtJyk7XG4gICAgLy8gICAgICQoJyNmaWVsZF8zXzUnKS5jc3MoJ2Rpc3BsYXknLCdub25lJyk7XG4gICAgLy8gICB9IGVsc2UgaWYgKCB0aGlzLnZhbHVlID09PSAnNCcgKSB7XG4gICAgLy8gICAgICQoJyNmaWVsZF8zXzMnKS5jc3MoJ2Rpc3BsYXknLCdub25lJyk7XG4gICAgLy8gICAgICQoJyNmaWVsZF8zXzUnKS5jc3MoJ2Rpc3BsYXknLCdsaXN0LWl0ZW0nKTtcbiAgICAvLyAgIH1cbiAgICAvLyB9KTtcblxuICAgIC8vIFxuXG4gIH1cblxuXG4gIGlmICggJCgnI3N1Yi1vdXRyby1saW5rJykgKSB7XG4gICAgJCggJyNzdWItb3V0cm8tbGluaycgKS5jbGljayhmdW5jdGlvbiggZXZlbnQgKSB7XG4gICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgJCggJyNhbGwtc3VicycgKS5yZW1vdmVDbGFzcygnaGlkZGVuLWJ5LWRlZmF1bHQnKTtcbiAgICAgIHNjcm9sbFRvQW5jaG9yKCcjYWxsLXN1YnMnKTtcbiAgICB9KTtcbiAgfVxuXG4gIC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLWRqaCBTZXAgMjgsIDIwMThcbiAgICBBdXRvLWFwcGx5IFBvaW50cyAmIFJld2FyZHMgQmFsYW5jZSBVTlVTRURcbiAgLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG4gIC8vIGlmKCAkKCdib2R5JykuaGFzQ2xhc3MoJ3dvb2NvbW1lcmNlLWNhcnQnKSAmJiAkKCdpbnB1dFtuYW1lPXdjX3BvaW50c19yZXdhcmRzX2FwcGx5X2Rpc2NvdW50XScpLmxlbmd0aCAmJiAhICQoJy5zdWJzY3JpcHRpb24tZGV0YWlscycpLmxlbmd0aCApIHtcbiAgLy8gICAkKCAnaW5wdXRbbmFtZT13Y19wb2ludHNfcmV3YXJkc19hcHBseV9kaXNjb3VudF0nICkudHJpZ2dlciggJ2NsaWNrJyApO1xuICAvLyB9XG4gIC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLWRqaCBTZXAgMjgsIDIwMThcbiAgICBBdXRvLWFwcGx5IEFjY291bnQgRnVuZHMgQmFsYW5jZVxuICAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cbiAgLy8gaWYoICQoJ2JvZHknKS5oYXNDbGFzcygnd29vY29tbWVyY2UtY2FydCcpICYmICQoJ2lucHV0W25hbWU9d2NfYWNjb3VudF9mdW5kc19hcHBseV0nKS5sZW5ndGggJiYgISAkKCcuc3Vic2NyaXB0aW9uLWRldGFpbHMnKS5sZW5ndGggKSB7XG4gIC8vICAgJCggJ2lucHV0W25hbWU9d2NfYWNjb3VudF9mdW5kc19hcHBseV0nICkudHJpZ2dlciggJ2NsaWNrJyApO1xuICAvLyB9XG5cblxuXG5cbiAgLyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tZGpoIFNlcCAxNCwgMjAxOFxuICAgIFBBUlQgMCBjcmVhdGUgYSBmdW5jdGlvblxuICAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cbiAgZnVuY3Rpb24gcGdoZl9jb250cm9sX2NhcnRfY2hlY2tvdXRfb3B0aW9ucyhhY3Rpb24gPSAnbmV3IHBhZ2UnKSB7XG4gICAgdmFyIHN1YnRvdGFsID0gJCgnLmNhcnQtc3VidG90YWwgLndvb2NvbW1lcmNlLVByaWNlLWFtb3VudCcpLnRleHQoKTtcbiAgICAgICAgc3VidG90YWwgID0gc3VidG90YWwucmVwbGFjZSgnJCcsICcnKTtcbiAgICAgICAgc3VidG90YWwgID0gc3VidG90YWwucmVwbGFjZSgnLCcsICcnKTtcbiAgICAgICAgc3VidG90YWwgID0gcGFyc2VGbG9hdChzdWJ0b3RhbCk7XG4gICAgdmFyIHByZXZ0b3RhbCA9ICQoJyNwcmV2aW91cy1jYXJ0LXZhbHVlJykudmFsKCk7XG4gICAgICAgIHByZXZ0b3RhbCA9IHBhcnNlRmxvYXQocHJldnRvdGFsKTtcbiAgICB2YXIgZGVsaXZlcnlEaWZmZXJlbmNlID0gMDtcbiAgICB2YXIgZnJlZXNoaXBEaWZmZXJlbmNlID0gMDtcbiAgICBpZiAoIHN1YnRvdGFsICE9PSBwcmV2dG90YWwgKSB7XG4gICAgICAkKCcjcHJldmlvdXMtY2FydC12YWx1ZScpLnZhbChzdWJ0b3RhbCk7XG4gICAgICAvLyBjb25zb2xlLmxvZygncHJldjogJyArIHByZXZ0b3RhbCk7XG4gICAgICAvLyBjb25zb2xlLmxvZygnc3VidDogJyArIHN1YnRvdGFsKTtcbiAgICB9XG5cbiAgICAvLyBpZiAoc3VidG90YWwgPCA1MCkge1xuICAgIC8vICAgZGVsaXZlcnlEaWZmZXJlbmNlID0gNTAgLSBzdWJ0b3RhbDtcbiAgICAvLyAgIGRlbGl2ZXJ5RGlmZmVyZW5jZSA9IGRlbGl2ZXJ5RGlmZmVyZW5jZS50b0ZpeGVkKDIpO1xuICAgIC8vICAgZnJlZXNoaXBEaWZmZXJlbmNlID0gMTAwIC0gc3VidG90YWw7XG4gICAgLy8gICBmcmVlc2hpcERpZmZlcmVuY2UgPSBmcmVlc2hpcERpZmZlcmVuY2UudG9GaXhlZCgyKTtcbiAgICAvLyAgIHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xuICAgIC8vICAgICAvLyBpZiBjdXJyZW50bHkgc2V0IHRvIGhvbWUgZGVsaXZlcnksIHRyaWdnZXIgcGlja3VwXG4gICAgLy8gICAgIGlmICggJCgnLnRvZ2dsZS1kZWZhdWx0LWhhbmRsaW5nLnBpY2t1cCcpLmlzKCc6dmlzaWJsZScpICkge1xuICAgIC8vICAgICAgICQoJy50b2dnbGUtZGVmYXVsdC1oYW5kbGluZy5waWNrdXAnKS50cmlnZ2VyKCdjbGljaycpO1xuICAgIC8vICAgICB9XG4gICAgLy8gICAgIGlmICggJCgnLnRvZ2dsZS1kZWZhdWx0LWhhbmRsaW5nLnNoaXAnKS5pcygnOnZpc2libGUnKSApIHtcbiAgICAvLyAgICAgICAkKCcudG9nZ2xlLWRlZmF1bHQtaGFuZGxpbmcuc2hpcCcpLmNsaWNrKGZ1bmN0aW9uIChldmVudCkge1xuICAgIC8vICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAvLyAgICAgICB9KTsgICAgICAgICAgXG4gICAgLy8gICAgIH1cbiAgICAvLyAgIH0sIDEwKTtcblxuICAgIC8vICAgc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XG4gICAgLy8gICAgICQoJyN3Yy1sb2NhbC1waWNrdXAtcGx1cy10b2dnbGUtZGVmYXVsdC1oYW5kbGluZycpLmh0bWwoJ09yZGVycyB1bmRlciAkNTAgYXJlIG5vdCBlbGlnaWJsZSBmb3IgaG9tZSBkZWxpdmVyeS4gPHVsPjxsaT5BZGQgPHNwYW4gY2xhc3M9XCJncmVlblwiPiQnK2RlbGl2ZXJ5RGlmZmVyZW5jZSsnPC9zcGFuPiBvciBtb3JlIHRvIHlvdXIgY2FydCBmb3IgaG9tZSBkZWxpdmVyeSAoJDYgZGVsaXZlcnkgZmVlIGFwcGxpZXMpLjwvbGk+PGxpPiBBZGQgPHNwYW4gY2xhc3M9XCJncmVlblwiPiQnK2ZyZWVzaGlwRGlmZmVyZW5jZSsnPC9zcGFuPiBvciBtb3JlIHRvIHlvdXIgY2FydCBmb3IgPGVtPmZyZWU8L2VtPiBkZWxpdmVyeSE8L2xpPjwvdWw+IDxkaXYgY2xhc3M9XCJmaW5lcHJpbnRcIj4qIFNvbWUgcmVzdHJpY3Rpb25zIGFwcGx5LiBPbmx5IGF2YWlsYWJsZSB0byBzcGVjaWZpYyB6aXAgY29kZXMuPC9kaXY+Jyk7XG4gICAgLy8gICB9LCAyMCk7XG5cbiAgICAvLyB9XG4gICAgLy8gaWYgKHN1YnRvdGFsID49IDUwICkge1xuICAgIC8vICAgc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XG4gICAgLy8gICAgICQoJyN3Yy1sb2NhbC1waWNrdXAtcGx1cy10b2dnbGUtZGVmYXVsdC1oYW5kbGluZycpLmNzcygnZGlzcGxheScsICdibG9jaycpO1xuICAgIC8vICAgfSwgMTApO1xuICAgIC8vIH1cbiAgICBpZiAoc3VidG90YWwgPCA1MCkge1xuICAgICAgQ29va2llcy5yZW1vdmUoJ2RlZmF1bHRfdG9fZGVsaXZlcnknKTtcbiAgICAgIC8vIGlmIDwgNTAsIHNoaXBwaW5nIHNob3VsZCBub3QgYmUgYW4gb3B0aW9uLCBoaWRlIHdpdGggaW5saW5lIHN0eWxlXG4gICAgICBpZiggISAkKCcjc2hpcHBpbmctc3R5bGVibG9jaycpLmxlbmd0aCApIHtcbiAgICAgICAgdmFyIHN0eWxlYmxvY2sgPSAnPGRpdiBpZD1cInNoaXBwaW5nLXN0eWxlYmxvY2tcIj48c3R5bGU+LnRvZ2dsZS1kZWZhdWx0LWhhbmRsaW5nLnNoaXB7ZGlzcGxheTpub25lIWltcG9ydGFudH08L3N0eWxlPjwvZGl2Pic7XG4gICAgICAgICQoJ3RyLnNoaXBwaW5nJykuYXBwZW5kKHN0eWxlYmxvY2spO1xuICAgICAgfVxuICAgICAgLy8gaWYgY3VycmVudGx5IHNldCB0byBob21lIGRlbGl2ZXJ5LCB0cmlnZ2VyIHBpY2t1cFxuICAgICAgc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XG4gICAgICAgIGlmICggJCgnLnRvZ2dsZS1kZWZhdWx0LWhhbmRsaW5nLnBpY2t1cCcpLmlzKCc6dmlzaWJsZScpICkge1xuICAgICAgICAgICQoJy50b2dnbGUtZGVmYXVsdC1oYW5kbGluZy5waWNrdXAnKS50cmlnZ2VyKCdjbGljaycpO1xuICAgICAgICB9XG4gICAgICB9LCAxMCk7XG4gICAgfSBlbHNlIGlmIChzdWJ0b3RhbCA+PSA1MCAmJiBzdWJ0b3RhbCA8IDEwMCApIHtcbiAgICAgIENvb2tpZXMucmVtb3ZlKCdkZWZhdWx0X3RvX2RlbGl2ZXJ5Jyk7XG4gICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcbiAgICAgICAgaWYgKCAhICQoJy50b2dnbGUtZGVmYXVsdC1oYW5kbGluZy5zaGlwJykuaXMoJzp2aXNpYmxlJykgKSB7IC8vIGhvbWUgZGVsaXZlcnkgaXMgc2VsZWN0ZWQuLi4uXG4gICAgICAgIH0gZWxzZSB7IC8vIGxvY2FsIHBpY2t1cCBpcyBzZWxlY3RlZC4uLi5cbiAgICAgICAgICBpZiAoICQoJyNzaGlwcGluZy1zdHlsZWJsb2NrJykubGVuZ3RoICkge1xuICAgICAgICAgICAgJCgnI3NoaXBwaW5nLXN0eWxlYmxvY2snKS5yZW1vdmUoKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH0sIDEwKTtcbiAgICB9IGVsc2UgaWYgKCBzdWJ0b3RhbCA+PSAxMDAgKSB7XG4gICAgICAvLyBzZXQgTG9jYWwgUGlja3VwIHRvIEhvbWUgRGVsaXZlcnkgaWYgaXQgaXMgbm90IGFscmVhZHkgc2VsZWN0ZWQgdGhlIGZpcnN0IHRpbWUgdGhlaXIgb3JkZXIgcXVhbGlmaWVzXG4gICAgICB2YXIgZGVmYXVsdF90b19kZWxpdmVyeSAgICAgPSBDb29raWVzLmdldCgnZGVmYXVsdF90b19kZWxpdmVyeScpOyBcbiAgICAgIGlmICggZGVmYXVsdF90b19kZWxpdmVyeSA9PT0gdW5kZWZpbmVkICkge1xuICAgICAgICBpZiAoICEgJCgnLnRvZ2dsZS1kZWZhdWx0LWhhbmRsaW5nLnBpY2t1cCcpLmlzKCc6dmlzaWJsZScpICkgeyAvLyBpZiBwaWNrdXAgaXMgc2VsZWN0ZWQuLi4uXG4gICAgICAgICAgJCggJy50b2dnbGUtZGVmYXVsdC1oYW5kbGluZy5zaGlwJyApLnRyaWdnZXIoICdjbGljaycgKTtcbiAgICAgICAgICBDb29raWVzLnNldCgnZGVmYXVsdF90b19kZWxpdmVyeScsICd0cmlnZ2VyZWQnLCB7IGV4cGlyZXM6IDEgfSk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gICAgLy8gdW5oaWRlIHNoaXBwaW5nIG9wdGlvbiBpZiB0b3RhbCBvdmVyICQ1MFxuICAgIGlmICggc3VidG90YWwgPj0gNTAgKSB7XG4gICAgICBpZiAoICQoJyNzaGlwcGluZy1zdHlsZWJsb2NrJykubGVuZ3RoICkge1xuICAgICAgICAkKCcjc2hpcHBpbmctc3R5bGVibG9jaycpLnJlbW92ZSgpO1xuICAgICAgfVxuICAgIH1cblxuXG4gICAgLy8gaWYgdGhpcyBpcyB0aGUgZmlyc3QgcGFnZSBsb2FkLCBjbGljayB0aGUgXCJBcHBseSBEaXNjb3VudFwiIGF1dG9tYXRpY2FsbHlcbiAgICAvLyBpZiAoIGFjdGlvbiA9PT0gJ25ldyBwYWdlJyApIHtcbiAgICAvLyAgIGlmKCAkKCdib2R5JykuaGFzQ2xhc3MoJ3dvb2NvbW1lcmNlLWNhcnQnKSAmJiAkKCdpbnB1dFtuYW1lPXdjX3BvaW50c19yZXdhcmRzX2FwcGx5X2Rpc2NvdW50XScpLmxlbmd0aCAmJiAhICQoJy5zdWJzY3JpcHRpb24tZGV0YWlscycpLmxlbmd0aCApIHtcbiAgICAvLyAgICAgJCggJ2lucHV0W25hbWU9d2NfcG9pbnRzX3Jld2FyZHNfYXBwbHlfZGlzY291bnRdJyApLnRyaWdnZXIoICdjbGljaycgKTtcbiAgICAvLyAgIH1cbiAgICAvLyB9XG5cbiAgICAvLyBpZiAoIGFjdGlvbiA9PT0gJ25ldyBwYWdlJyApIHtcbiAgICAvLyAgIGNvbnNvbGUubG9nKGFjdGlvbik7XG4gICAgLy8gICBpZiggJCgnYm9keScpLmhhc0NsYXNzKCd3b29jb21tZXJjZS1jYXJ0JykgJiYgJCgnaW5wdXRbbmFtZT13Y19hY2NvdW50X2Z1bmRzX2FwcGx5XScpLmxlbmd0aCAmJiAhICQoJy5zdWJzY3JpcHRpb24tZGV0YWlscycpLmxlbmd0aCApIHtcbiAgICAvLyAgICAgJCggJ2lucHV0W25hbWU9d2NfYWNjb3VudF9mdW5kc19hcHBseV0nICkudHJpZ2dlciggJ2NsaWNrJyApO1xuICAgIC8vICAgfVxuICAgIC8vIH1cblxuXG5cblxuICAgIC8vIGFsd2F5cyBjaGFuZ2UgXCJQb2ludHMgUmVkZW1wdGlvblwiIHRvIFwiQmFsYW5jZSBSZWRlbXB0aW9uXCJcbiAgICAvLyBhbHdheXMgYWRkQ2xhc3MgJ2J1dHRvbicgdG8gLnRvZ2dsZS1kZWZhdWx0LWhhbmRsaW5nIGxpbmtcbiAgICAvLyBhbHdheXMgcmVtb3ZlIFwicmVtb3ZlIGJ1dHRvblwiIGZyb20gaXRlbSAzNjg4IERlbGl2ZXJ5IENoYXJnZVxuICAgIHNldFRpbWVvdXQoZnVuY3Rpb24oKSB7XG4gICAgICAvLyAkKFwidHJbY2xhc3MqPScgY291cG9uLXdjX3BvaW50c19yZWRlbXB0aW9uJ10gdGhcIikudGV4dChcIkJhbGFuY2UgcmVkZW1wdGlvblwiKTtcbiAgICAgICQoJy50b2dnbGUtZGVmYXVsdC1oYW5kbGluZycpLmFkZENsYXNzKCdidXR0b24nKTtcblxuICAgICAgLy8gJCgnLnRheF9sYWJlbCcpLnRleHQoJ2luY2wuIDclIHRheCcpO1xuXG4gICAgICAvLyBpZiAoICQoJ2JvZHknKS5oYXNDbGFzcygnd29vY29tbWVyY2UtY2hlY2tvdXQnKSApIHtcbiAgICAgIC8vICAgJCgndHIuc2hpcHBpbmcgdGQnKS5hcHBlbmQoJzxkaXY+PHNtYWxsPjxhIGhyZWY9XCIvY2FydC9cIj5DaGFuZ2Ugc2hpcHBpbmc/PC9hPjwvc21hbGw+PC9kaXY+Jyk7XG4gICAgICAvLyB9XG5cbiAgICAgICQoJy5naWZ0LWNlcnRpZmljYXRlLnNjX2luZm9fYm94IGgzJykudGV4dCgnU0VORCBHSUZUIENBUkRTIFRPLi4uJyk7XG4gICAgICAkKCcuZ2lmdC1jZXJ0aWZpY2F0ZS1zaG93LWZvcm0gcCcpLmh0bWwoJ1lvdXIgb3JkZXIgY29udGFpbnMgZ2lmdCBjYXJkcywgeWF5ISBFbnRlciB5b3VyIG93biBlbWFpbCB0byBwcmludCBpdCBvdXQgbGF0ZXIsIG9yIGVudGVyIGEgZGlmZmVyZW50IGVtYWlsIHRvIHNlbmQgYXMgYSBnaWZ0IScpO1xuICAgICAgJCgnI3Nob3dfZm9ybScpLnRyaWdnZXIoJ2NsaWNrJyk7XG4gICAgICAkKCdsYWJlbFtmb3I9XCJzaG93X2Zvcm1cIl0nKS50ZXh0KCdFbnRlciBlbWFpbCBhZGRyZXNzIGJlbG93Jyk7XG4gICAgICAkKCcuc2hvd19oaWRlX2xpc3QnKS5jc3MoJ3RleHQtaW5kZW50JywnLTk5OTlweCcpO1xuICAgICAgJCgnLnNob3dfaGlkZV9saXN0JykuY3NzKCdoZWlnaHQnLCcwJyk7XG4gICAgICAkKCcuZ2lmdC1jZXJ0aWZpY2F0ZS5zY19pbmZvX2JveCcpLmNzcygnZGlzcGxheScsJ2Jsb2NrJyk7XG5cblxuXG4gICAgICAvLyAkKCcud29vY29tbWVyY2UtY2FydC1mb3JtX19jYXJ0LWl0ZW0gLnByb2R1Y3QtcmVtb3ZlIGEnKS5lYWNoKGZ1bmN0aW9uKCkge1xuICAgICAgLy8gICB2YXIgcHJvZHVjdF9pZCA9ICQodGhpcykuZGF0YSgncHJvZHVjdF9pZCcpO1xuICAgICAgLy8gICBpZiAoIHByb2R1Y3RfaWQgPT09IDM2ODggKSB7XG4gICAgICAvLyAgICAgJCh0aGlzKS5yZW1vdmUoKTtcbiAgICAgIC8vICAgfVxuICAgICAgLy8gfSk7XG5cbiAgICAgICQoJy50b2dnbGUtZGVmYXVsdC1oYW5kbGluZycpLmVhY2goZnVuY3Rpb24oKSB7XG4gICAgICAgIHZhciB0b2dnbGVUZXh0ID0gJCh0aGlzKS50ZXh0KCk7XG4gICAgICAgIHRvZ2dsZVRleHQgPSB0b2dnbGVUZXh0LnJlcGxhY2UoJ0NsaWNrIGlmIHlvdSB3YW50IHRoZXNlIGl0ZW1zIHRvIGJlIHNoaXBwZWQuJywnQ0hBTkdFIFRPIEhPTUUgREVMSVZFUlknKTtcbiAgICAgICAgdG9nZ2xlVGV4dCA9IHRvZ2dsZVRleHQucmVwbGFjZSgnQ2xpY2sgaWYgeW91IHdhbnQgdG8gcGlja3VwIHRoZXNlIGl0ZW1zLicsJ0NIQU5HRSBUTyBMT0NBTCBQSUNLVVAnKTtcbiAgICAgICAgdG9nZ2xlVGV4dCA9IHRvZ2dsZVRleHQucmVwbGFjZSgnQ2xpY2sgaWYgeW91IHdhbnQgdG8gcGlja3VwIHRoaXMgaXRlbS4nLCdDSEFOR0UgVE8gTE9DQUwgUElDS1VQJyk7XG4gICAgICAgICQodGhpcykudGV4dCh0b2dnbGVUZXh0KTtcbiAgICAgIH0pO1xuXG4gICAgfSwgMTApO1xuXG4gICAgcmV0dXJuIHRydWU7XG4gIH1cblxuICAvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1kamggQXVnIDI0LCAyMDE4XG4gICAgVHJpZ2dlciBwZ2hmX2NvbnRyb2xfY2FydF9jaGVja291dF9vcHRpb25zXG4gICAgb24gcGFnZSBsb2FkIGFuZCBldmVyeSBhamF4IGNhbGwgaW4gY2FydC9jaGVja291dCBcbiAgLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG4gIGlmICggJCgnYm9keScpLmhhc0NsYXNzKCd3b29jb21tZXJjZS1jYXJ0JykgfHwgJCgnYm9keScpLmhhc0NsYXNzKCd3b29jb21tZXJjZS1jaGVja291dCcpICkge1xuICAgICQoJ2JvZHknKS5hcHBlbmQoJzxpbnB1dCB0eXBlPVwiaGlkZGVuXCIgaWQ9XCJwcmV2aW91cy1jYXJ0LXZhbHVlXCIgdmFsdWU9XCIwXCIgLz4nKTtcbiAgICB2YXIgcmFuID0gcGdoZl9jb250cm9sX2NhcnRfY2hlY2tvdXRfb3B0aW9ucygnbmV3IHBhZ2UnKTtcbiAgICAvLyBjb25zb2xlLmxvZygnbmV3IHBhZ2UgJyArIHJhbik7XG4gIH1cbiAgJChkb2N1bWVudCkuYWpheENvbXBsZXRlKGZ1bmN0aW9uIChldmVudCwgcmVxdWVzdCwgc2V0dGluZ3MpIHtcbiAgICBpZiAoICQoJ2JvZHknKS5oYXNDbGFzcygnd29vY29tbWVyY2UtY2FydCcpIHx8ICQoJ2JvZHknKS5oYXNDbGFzcygnd29vY29tbWVyY2UtY2hlY2tvdXQnKSApIHtcbiAgICAgIHZhciByYW4gPSBwZ2hmX2NvbnRyb2xfY2FydF9jaGVja291dF9vcHRpb25zKCdhamF4Jyk7XG4gICAgICAvLyBjb25zb2xlLmxvZygnYWpheCAnICsgcmFuKTtcbiAgICB9XG4gIH0pO1xuICAkKCBkb2N1bWVudC5ib2R5ICkub24oICd1cGRhdGVkX2NhcnRfdG90YWxzJywgZnVuY3Rpb24oKXtcbiAgICAvLyBjb25zb2xlLmxvZygkKCcuY2FydC1zdWJ0b3RhbCAud29vY29tbWVyY2UtUHJpY2UtYW1vdW50JykudGV4dCgpKTtcbiAgICAvLyBjb25zb2xlLmxvZygndXBkYXRlZF9jYXJ0X3RvdGFscycpO1xuICAgIC8vIGNvbnNvbGUubG9nKCQoJy5jYXJ0LXN1YnRvdGFsIC53b29jb21tZXJjZS1QcmljZS1hbW91bnQnKS50ZXh0KCkpO1xuXG4gICAgdmFyIGRhdGEgPSB7XG4gICAgICAnYWN0aW9uJyAgICAgIDogJ3VwZGF0ZV9taW5pY2FydCcsXG4gICAgICAndXBkYXRlZF9jYXJ0X3RvdGFscyc6IHRydWVcbiAgICB9O1xuXG4gICAgJC5wb3N0KGNvbmZpZ19jdXN0b20uYWpheF91cmwsIFxuICAgICAgZGF0YSwgXG4gICAgICBmdW5jdGlvbihyZXNwb25zZSkge1xuICAgICAgICAvLyBjb25zb2xlLmxvZygnZnVuY3Rpb24gcmFuLi4uJyArIHJlc3BvbnNlLnRlc3QpO1xuICAgICAgICAvLyBjb25zb2xlLmxvZyhyZXNwb25zZS5xdWFudGl0eSk7XG4gICAgICAgIHZhciBxdWFudGl0eSA9IHBhcnNlSW50KHJlc3BvbnNlLnF1YW50aXR5KTtcbiAgICAgICAgJCgnLmN1cnJlbnQtY2FydC1xdHknKS50ZXh0KHF1YW50aXR5KTtcbiAgICAgICAgaWYgKCBxdWFudGl0eSA8PSAwICkge1xuICAgICAgICAgICQoJy5xdWFudGl0eS1iZWZvcmUnKS50ZXh0KCcnKTtcbiAgICAgICAgICAkKCcucXVhbnRpdHktYWZ0ZXInKS50ZXh0KCcnKTtcbiAgICAgICAgICAkKCcjcXVhbnRpdHktbnVtYmVyJykudGV4dCgnJyk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICApO1xuXG4gIH0pO1xuXG4gIC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLWRqaCBTZXAgMTMsIDIwMThcbiAgICBTaG93IEhpZGRlbiBGQVFzXG4gIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuICBpZiAoICQoJyNzaG93LWFsbC1mYXFzJykubGVuZ3RoICkge1xuICAgICQoJyNzaG93LWFsbC1mYXFzJykub24oJ2NsaWNrJyxmdW5jdGlvbihlKXtcbiAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICQoJy5mYXEtY2FyZC5oaWRkZW4tYnktZGVmYXVsdCcpLnJlbW92ZUNsYXNzKCdoaWRkZW4tYnktZGVmYXVsdCcpO1xuICAgICAgJCgnLmZhcS1jYXJkLmhhbGYtaGlkZGVuJykucmVtb3ZlQ2xhc3MoJ2hhbGYtaGlkZGVuJyk7XG4gICAgICAkKCcjc2hvdy1hbGwtZmFxcycpLmFkZENsYXNzKCdoaWRkZW4tYnktZGVmYXVsdCcpO1xuICAgIH0pO1xuICB9IFxuXG59KTsgLyogZW5kIGRvYyByZWFkeSAqL1xuXG5cblxuXG4iXX0=
