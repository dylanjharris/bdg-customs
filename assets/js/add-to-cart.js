(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
'use strict';

/*----------------------------------------------djh Jul 27, 2018
  Custom Site-wide scripts
----------------------------------------------*/
jQuery(document).ready(function ($) {

  /*----------------------------------------------djh Aug 15, 2018
    Ajax / custom add to cart
  ----------------------------------------------*/
  if ($('#current-menu').length || $('body.single-product').length) {
    $.each($('.custom-add-to-cart'), function (index, value) {
      $(this).click(function (event) {
        event.preventDefault();
        if ($(this).hasClass('disabled')) {
          return false; // Do something else in here if required
        }
        $('.custom-add-to-cart').addClass('disabled');
        $('.custom-add-to-cart').css('color', '#ccc');

        // var location = $(this).attr('href');
        //     $(this).removeAttr('href');
        // var thislink = $(this).attr('id');

        var product_type = $(this).data('type'); // product type
        var take_action = $(this).data('function'); // add or remove
        var product_id = $(this).data('product'); // product_id
        var variation_id = $(this).data('variationid'); // variation_id
        var variation = $(this).data('variation'); // variation array

        // if ( product_type === 'simple' ) {
        //   var currentQty = $('#qty-in-cart-' + product_id).text();
        // } else if ( product_type === 'bundle' ) {
        //   var currentQty = '1';
        // }

        var currentQty = $('#atc-qty-' + variation_id).text();
        if (currentQty === '') {
          currentQty = 0;
        }

        // var wrapper = '#product-addtocart-' + product_id;
        // var beforeqty = $(wrapper).find('.qty-in-cart').text();

        var data = {
          'action': 'adjust_cart',
          'product_type': product_type,
          'take_action': take_action,
          'product_id': product_id,
          'variation_id': variation_id,
          'variation': variation,
          'quantity': 1
        };

        $.post(custom_config.ajax_url, data, function (response) {
          // $(thislink).attr('href', location);
          if (response.error === false) {
            $('.custom-add-to-cart').removeClass('disabled');
            $('.custom-add-to-cart').css('color', '#EE6948');

            var afterqty = 0;
            var before = '(';
            var after = ')';
            var total_qty = $('#qty-in-cart-' + product_id).text();
            total_qty = parseInt(total_qty);
            var cart_qty = $('#quantity-number').text();
            if (cart_qty) {
              cart_qty = parseInt(cart_qty);
            } else {
              cart_qty = 0;
            }
            var newcartqty = 0;
            if (take_action === 'add') {
              // console.log(response.test);
              afterqty = parseInt(currentQty) + 1;
              var totalqty = total_qty + 1;
              $('#qty-in-cart-' + product_id).text(totalqty);
              newcartqty = cart_qty + 1;
              $('.current-cart-qty').text(newcartqty);
              $('.quantity-before').text(before);
              $('.quantity-after').text(after);
            } else if (take_action === 'remove') {
              if (!parseInt(response.affected) > 0) {
                return;
              }
              afterqty = parseInt(currentQty) - 1;
              var totalqty = total_qty - 1;
              if (afterqty <= 0) {
                afterqty = '';
                before = '';
                after = '';
              }
              if (currentQty !== 0 && afterqty !== 0) {
                $('#qty-in-cart-' + product_id).text(totalqty);
              }
              newcartqty = cart_qty - 1;
              if (newcartqty <= 0) {
                newcartqty = 0;
                $('.current-cart-qty').text(newcartqty);
                $('.quantity-before').text('');
                $('.quantity-after').text('');
                $('#quantity-number').text('');
              } else {
                $('.current-cart-qty').text(newcartqty);
              }
            }
            if (totalqty < 1) {
              $('#overlay-' + product_id).addClass(' not-in-cart');
              $('#atc-label-text-' + product_id).text('Add To Cart ');
            } else {
              $('#overlay-' + product_id).removeClass('not-in-cart');
              $('#atc-label-text-' + product_id).text('Added To Cart ');
            }
            $('#atc-qty-' + variation_id).text(afterqty);
            $('#atc-qty-before-' + variation_id).text(before);
            $('#atc-qty-after-' + variation_id).text(after);
          }
        });
      });
    });

    /*----------------------------------------------djh Aug 24, 2018
      Nutrition Facts Popup
    ----------------------------------------------*/
    $.each($('.nf-popup'), function (index, value) {
      var product_id = $(this).attr('id');
      product_id = product_id.split('-');
      product_id = product_id[2];

      if ($('#modal-' + product_id).length > 0) {
        // console.log(product_id);
        $('#nf-popup-' + product_id).removeClass('hidden-by-default');
      }

      $(this).click(function (event) {
        event.preventDefault();
        $('#modal-' + product_id).toggleClass('show-modal');
      });

      $('#close-button-' + product_id).click(function (event) {
        event.preventDefault();
        // $('#modal-'+product_id).toggleClass('show-modal');
      });

      $('#modal-' + product_id).click(function (event) {
        event.preventDefault();
        $('#modal-' + product_id).toggleClass('show-modal');
      });
    });
  }
}); /* end doc ready */

},{}]},{},[1])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmMvanMvYWRkLXRvLWNhcnQuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7OztBQ0FBOzs7QUFHQSxPQUFPLFFBQVAsRUFBaUIsS0FBakIsQ0FBdUIsVUFBUyxDQUFULEVBQVk7O0FBRWpDOzs7QUFHQSxNQUFLLEVBQUUsZUFBRixFQUFtQixNQUFuQixJQUE2QixFQUFHLHFCQUFILEVBQTJCLE1BQTdELEVBQXNFO0FBQ3BFLE1BQUUsSUFBRixDQUFPLEVBQUUscUJBQUYsQ0FBUCxFQUFpQyxVQUFVLEtBQVYsRUFBaUIsS0FBakIsRUFBeUI7QUFDeEQsUUFBRyxJQUFILEVBQVUsS0FBVixDQUFnQixVQUFVLEtBQVYsRUFBa0I7QUFDaEMsY0FBTSxjQUFOO0FBQ0EsWUFBSSxFQUFFLElBQUYsRUFBUSxRQUFSLENBQWlCLFVBQWpCLENBQUosRUFBa0M7QUFDaEMsaUJBQU8sS0FBUCxDQURnQyxDQUNsQjtBQUNmO0FBQ0QsVUFBRSxxQkFBRixFQUF5QixRQUF6QixDQUFrQyxVQUFsQztBQUNBLFVBQUUscUJBQUYsRUFBeUIsR0FBekIsQ0FBNkIsT0FBN0IsRUFBcUMsTUFBckM7O0FBRUE7QUFDQTtBQUNBOztBQUVBLFlBQUksZUFBZ0IsRUFBRSxJQUFGLEVBQVEsSUFBUixDQUFhLE1BQWIsQ0FBcEIsQ0FaZ0MsQ0FZZ0I7QUFDaEQsWUFBSSxjQUFnQixFQUFFLElBQUYsRUFBUSxJQUFSLENBQWEsVUFBYixDQUFwQixDQWJnQyxDQWFnQjtBQUNoRCxZQUFJLGFBQWdCLEVBQUUsSUFBRixFQUFRLElBQVIsQ0FBYSxTQUFiLENBQXBCLENBZGdDLENBY2dCO0FBQ2hELFlBQUksZUFBZ0IsRUFBRSxJQUFGLEVBQVEsSUFBUixDQUFhLGFBQWIsQ0FBcEIsQ0FmZ0MsQ0FlZ0I7QUFDaEQsWUFBSSxZQUFnQixFQUFFLElBQUYsRUFBUSxJQUFSLENBQWEsV0FBYixDQUFwQixDQWhCZ0Ms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QUFNLGNBQU47QUFDQSxVQUFFLFlBQVUsVUFBWixFQUF3QixXQUF4QixDQUFvQyxZQUFwQztBQUNELE9BSEQ7QUFNRCxLQTFCRDtBQTJCRDtBQUVGLENBdkpELEUsQ0F1SkkiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbigpe2Z1bmN0aW9uIHIoZSxuLHQpe2Z1bmN0aW9uIG8oaSxmKXtpZighbltpXSl7aWYoIWVbaV0pe3ZhciBjPVwiZnVuY3Rpb25cIj09dHlwZW9mIHJlcXVpcmUmJnJlcXVpcmU7aWYoIWYmJmMpcmV0dXJuIGMoaSwhMCk7aWYodSlyZXR1cm4gdShpLCEwKTt2YXIgYT1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK2krXCInXCIpO3Rocm93IGEuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixhfXZhciBwPW5baV09e2V4cG9ydHM6e319O2VbaV1bMF0uY2FsbChwLmV4cG9ydHMsZnVuY3Rpb24ocil7dmFyIG49ZVtpXVsxXVtyXTtyZXR1cm4gbyhufHxyKX0scCxwLmV4cG9ydHMscixlLG4sdCl9cmV0dXJuIG5baV0uZXhwb3J0c31mb3IodmFyIHU9XCJmdW5jdGlvblwiPT10eXBlb2YgcmVxdWlyZSYmcmVxdWlyZSxpPTA7aTx0Lmxlbmd0aDtpKyspbyh0W2ldKTtyZXR1cm4gb31yZXR1cm4gcn0pKCkiLCIvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1kamggSnVsIDI3LCAyMDE4XG4gIEN1c3RvbSBTaXRlLXdpZGUgc2NyaXB0c1xuLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5qUXVlcnkoZG9jdW1lbnQpLnJlYWR5KGZ1bmN0aW9uKCQpIHtcblxuICAvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1kamggQXVnIDE1LCAyMDE4XG4gICAgQWpheCAvIGN1c3RvbSBhZGQgdG8gY2FydFxuICAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cbiAgaWYgKCAkKCcjY3VycmVudC1tZW51JykubGVuZ3RoIHx8ICQoICdib2R5LnNpbmdsZS1wcm9kdWN0JyApLmxlbmd0aCApIHtcbiAgICAkLmVhY2goJCgnLmN1c3RvbS1hZGQtdG8tY2FydCcpLCBmdW5jdGlvbiggaW5kZXgsIHZhbHVlICkge1xuICAgICAgJCggdGhpcyApLmNsaWNrKGZ1bmN0aW9uKCBldmVudCApIHtcbiAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgaWYgKCQodGhpcykuaGFzQ2xhc3MoJ2Rpc2FibGVkJykpIHsgICAgICAgICAgXG4gICAgICAgICAgcmV0dXJuIGZhbHNlOyAvLyBEbyBzb21ldGhpbmcgZWxzZSBpbiBoZXJlIGlmIHJlcXVpcmVkXG4gICAgICAgIH1cbiAgICAgICAgJCgnLmN1c3RvbS1hZGQtdG8tY2FydCcpLmFkZENsYXNzKCdkaXNhYmxlZCcpO1xuICAgICAgICAkKCcuY3VzdG9tLWFkZC10by1jYXJ0JykuY3NzKCdjb2xvcicsJyNjY2MnKTtcblxuICAgICAgICAvLyB2YXIgbG9jYXRpb24gPSAkKHRoaXMpLmF0dHIoJ2hyZWYnKTtcbiAgICAgICAgLy8gICAgICQodGhpcykucmVtb3ZlQXR0cignaHJlZicpO1xuICAgICAgICAvLyB2YXIgdGhpc2xpbmsgPSAkKHRoaXMpLmF0dHIoJ2lkJyk7XG5cbiAgICAgICAgdmFyIHByb2R1Y3RfdHlwZSAgPSAkKHRoaXMpLmRhdGEoJ3R5cGUnKTsgICAgICAgLy8gcHJvZHVjdCB0eXBlXG4gICAgICAgIHZhciB0YWtlX2FjdGlvbiAgID0gJCh0aGlzKS5kYXRhKCdmdW5jdGlvbicpOyAgIC8vIGFkZCBvciByZW1vdmVcbiAgICAgICAgdmFyIHByb2R1Y3RfaWQgICAgPSAkKHRoaXMpLmRhdGEoJ3Byb2R1Y3QnKTsgICAgLy8gcHJvZHVjdF9pZFxuICAgICAgICB2YXIgdmFyaWF0aW9uX2lkICA9ICQodGhpcykuZGF0YSgndmFyaWF0aW9uaWQnKTsvLyB2YXJpYXRpb25faWRcbiAgICAgICAgdmFyIHZhcmlhdGlvbiAgICAgPSAkKHRoaXMpLmRhdGEoJ3ZhcmlhdGlvbicpOyAgLy8gdmFyaWF0aW9uIGFycmF5XG5cbiAgICAgICAgLy8gaWYgKCBwcm9kdWN0X3R5cGUgPT09ICdzaW1wbGUnICkge1xuICAgICAgICAvLyAgIHZhciBjdXJyZW50UXR5ID0gJCgnI3F0eS1pbi1jYXJ0LScgKyBwcm9kdWN0X2lkKS50ZXh0KCk7XG4gICAgICAgIC8vIH0gZWxzZSBpZiAoIHByb2R1Y3RfdHlwZSA9PT0gJ2J1bmRsZScgKSB7XG4gICAgICAgIC8vICAgdmFyIGN1cnJlbnRRdHkgPSAnMSc7XG4gICAgICAgIC8vIH1cblxuICAgICAgICB2YXIgY3VycmVudFF0eSA9ICQoJyNhdGMtcXR5LScgKyB2YXJpYXRpb25faWQpLnRleHQoKTtcbiAgICAgICAgaWYgKCBjdXJyZW50UXR5ID09PSAnJyApIHtcbiAgICAgICAgICBjdXJyZW50UXR5ID0gMDtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIHZhciB3cmFwcGVyID0gJyNwcm9kdWN0LWFkZHRvY2FydC0nICsgcHJvZHVjdF9pZDtcbiAgICAgICAgLy8gdmFyIGJlZm9yZXF0eSA9ICQod3JhcHBlcikuZmluZCgnLnF0eS1pbi1jYXJ0JykudGV4dCgpO1xuXG4gICAgICAgIHZhciBkYXRhID0ge1xuICAgICAgICAgICdhY3Rpb24nICAgICAgOiAnYWRqdXN0X2NhcnQnLFxuICAgICAgICAgICdwcm9kdWN0X3R5cGUnOiBwcm9kdWN0X3R5cGUsXG4gICAgICAgICAgJ3Rha2VfYWN0aW9uJyA6IHRha2VfYWN0aW9uLFxuICAgICAgICAgICdwcm9kdWN0X2lkJyAgOiBwcm9kdWN0X2lkLFxuICAgICAgICAgICd2YXJpYXRpb25faWQnOiB2YXJpYXRpb25faWQsXG4gICAgICAgICAgJ3ZhcmlhdGlvbicgICA6IHZhcmlhdGlvbixcbiAgICAgICAgICAncXVhbnRpdHknICAgIDogMVxuICAgICAgICB9O1xuXG4gICAgICAgICQucG9zdChjdXN0b21fY29uZmlnLmFqYXhfdXJsLCBcbiAgICAgICAgICBkYXRhLCBcbiAgICAgICAgICBmdW5jdGlvbihyZXNwb25zZSkge1xuICAgICAgICAgICAgLy8gJCh0aGlzbGluaykuYXR0cignaHJlZicsIGxvY2F0aW9uKTtcbiAgICAgICAgICAgIGlmICggcmVzcG9uc2UuZXJyb3IgPT09IGZhbHNlICkge1xuICAgICAgICAgICAgICAkKCcuY3VzdG9tLWFkZC10by1jYXJ0JykucmVtb3ZlQ2xhc3MoJ2Rpc2FibGVkJyk7XG4gICAgICAgICAgICAgICQoJy5jdXN0b20tYWRkLXRvLWNhcnQnKS5jc3MoJ2NvbG9yJywnI0VFNjk0OCcpO1xuXG4gICAgICAgICAgICAgIHZhciBhZnRlcnF0eSA9IDA7XG4gICAgICAgICAgICAgIHZhciBiZWZvcmUgICA9ICcoJztcbiAgICAgICAgICAgICAgdmFyIGFmdGVyICAgID0gJyknO1xuICAgICAgICAgICAgICB2YXIgdG90YWxfcXR5ID0gJCgnI3F0eS1pbi1jYXJ0LScgKyBwcm9kdWN0X2lkKS50ZXh0KCk7XG4gICAgICAgICAgICAgICAgICB0b3RhbF9xdHkgPSBwYXJzZUludCh0b3RhbF9xdHkpO1xuICAgICAgICAgICAgICB2YXIgY2FydF9xdHkgPSAkKCcjcXVhbnRpdHktbnVtYmVyJykudGV4dCgpO1xuICAgICAgICAgICAgICAgICAgaWYgKCBjYXJ0X3F0eSApIHtcbiAgICAgICAgICAgICAgICAgICAgY2FydF9xdHkgPSBwYXJzZUludChjYXJ0X3F0eSk7XG4gICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBjYXJ0X3F0eSA9IDA7XG4gICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIHZhciBuZXdjYXJ0cXR5ID0gMDtcbiAgICAgICAgICAgICAgaWYgKCB0YWtlX2FjdGlvbiA9PT0gJ2FkZCcgKSB7XG4gICAgICAgICAgICAgICAgLy8gY29uc29sZS5sb2cocmVzcG9uc2UudGVzdCk7XG4gICAgICAgICAgICAgICAgYWZ0ZXJxdHkgPSBwYXJzZUludChjdXJyZW50UXR5KSArIDE7XG4gICAgICAgICAgICAgICAgdmFyIHRvdGFscXR5ID0gdG90YWxfcXR5ICsgMTtcbiAgICAgICAgICAgICAgICAkKCcjcXR5LWluLWNhcnQtJyArIHByb2R1Y3RfaWQpLnRleHQodG90YWxxdHkpO1xuICAgICAgICAgICAgICAgIG5ld2NhcnRxdHkgPSBjYXJ0X3F0eSArIDE7XG4gICAgICAgICAgICAgICAgJCgnLmN1cnJlbnQtY2FydC1xdHknKS50ZXh0KG5ld2NhcnRxdHkpO1xuICAgICAgICAgICAgICAgICQoJy5xdWFudGl0eS1iZWZvcmUnKS50ZXh0KGJlZm9yZSk7XG4gICAgICAgICAgICAgICAgJCgnLnF1YW50aXR5LWFmdGVyJykudGV4dChhZnRlcik7XG4gICAgICAgICAgICAgIH0gZWxzZSBpZiAoIHRha2VfYWN0aW9uID09PSAncmVtb3ZlJyApIHtcbiAgICAgICAgICAgICAgICBpZiAoICEgcGFyc2VJbnQocmVzcG9uc2UuYWZmZWN0ZWQpID4gMCApIHtcbiAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgYWZ0ZXJxdHkgPSBwYXJzZUludChjdXJyZW50UXR5KSAtIDE7XG4gICAgICAgICAgICAgICAgdmFyIHRvdGFscXR5ID0gdG90YWxfcXR5IC0gMTtcbiAgICAgICAgICAgICAgICBpZiAoIGFmdGVycXR5IDw9IDAgKSB7XG4gICAgICAgICAgICAgICAgICBhZnRlcnF0eSA9ICcnO1xuICAgICAgICAgICAgICAgICAgYmVmb3JlICAgPSAnJztcbiAgICAgICAgICAgICAgICAgIGFmdGVyICAgID0gJyc7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmICggY3VycmVudFF0eSAhPT0gMCAmJiBhZnRlcnF0eSAhPT0gMCApIHtcbiAgICAgICAgICAgICAgICAgICQoJyNxdHktaW4tY2FydC0nICsgcHJvZHVjdF9pZCkudGV4dCh0b3RhbHF0eSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIG5ld2NhcnRxdHkgPSBjYXJ0X3F0eSAtIDE7XG4gICAgICAgICAgICAgICAgaWYgKCBuZXdjYXJ0cXR5IDw9IDAgKSB7XG4gICAgICAgICAgICAgICAgICBuZXdjYXJ0cXR5ID0gMDtcbiAgICAgICAgICAgICAgICAgICQoJy5jdXJyZW50LWNhcnQtcXR5JykudGV4dChuZXdjYXJ0cXR5KTtcbiAgICAgICAgICAgICAgICAgICQoJy5xdWFudGl0eS1iZWZvcmUnKS50ZXh0KCcnKTtcbiAgICAgICAgICAgICAgICAgICQoJy5xdWFudGl0eS1hZnRlcicpLnRleHQoJycpO1xuICAgICAgICAgICAgICAgICAgJCgnI3F1YW50aXR5LW51bWJlcicpLnRleHQoJycpO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAkKCcuY3VycmVudC1jYXJ0LXF0eScpLnRleHQobmV3Y2FydHF0eSk7ICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIGlmICggdG90YWxxdHkgPCAxICkge1xuICAgICAgICAgICAgICAgICQoJyNvdmVybGF5LScgKyBwcm9kdWN0X2lkKS5hZGRDbGFzcygnIG5vdC1pbi1jYXJ0Jyk7XG4gICAgICAgICAgICAgICAgJCgnI2F0Yy1sYWJlbC10ZXh0LScgKyBwcm9kdWN0X2lkKS50ZXh0KCdBZGQgVG8gQ2FydCAnKTtcbiAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAkKCcjb3ZlcmxheS0nICsgcHJvZHVjdF9pZCkucmVtb3ZlQ2xhc3MoJ25vdC1pbi1jYXJ0Jyk7XG4gICAgICAgICAgICAgICAgJCgnI2F0Yy1sYWJlbC10ZXh0LScgKyBwcm9kdWN0X2lkKS50ZXh0KCdBZGRlZCBUbyBDYXJ0ICcpO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICQoJyNhdGMtcXR5LScgKyB2YXJpYXRpb25faWQpLnRleHQoYWZ0ZXJxdHkpO1xuICAgICAgICAgICAgICAkKCcjYXRjLXF0eS1iZWZvcmUtJyArIHZhcmlhdGlvbl9pZCkudGV4dChiZWZvcmUpO1xuICAgICAgICAgICAgICAkKCcjYXRjLXF0eS1hZnRlci0nICsgdmFyaWF0aW9uX2lkKS50ZXh0KGFmdGVyKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgICk7XG4gICAgICB9KTtcbiAgICB9KTtcblxuICAgIC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLWRqaCBBdWcgMjQsIDIwMThcbiAgICAgIE51dHJpdGlvbiBGYWN0cyBQb3B1cFxuICAgIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuICAgICQuZWFjaCgkKCcubmYtcG9wdXAnKSwgZnVuY3Rpb24oIGluZGV4LCB2YWx1ZSApIHtcbiAgICAgIHZhciBwcm9kdWN0X2lkID0gJCh0aGlzKS5hdHRyKCdpZCcpO1xuICAgICAgICAgIHByb2R1Y3RfaWQgPSBwcm9kdWN0X2lkLnNwbGl0KCctJyk7XG4gICAgICAgICAgcHJvZHVjdF9pZCA9IHByb2R1Y3RfaWRbMl07XG5cbiAgICAgIGlmICggJCgnI21vZGFsLScrcHJvZHVjdF9pZCkubGVuZ3RoID4gMCApIHtcbiAgICAgICAgLy8gY29uc29sZS5sb2cocHJvZHVjdF9pZCk7XG4gICAgICAgICQoJyNuZi1wb3B1cC0nK3Byb2R1Y3RfaWQpLnJlbW92ZUNsYXNzKCdoaWRkZW4tYnktZGVmYXVsdCcpO1xuICAgICAgfVxuXG4gICAgICAkKCB0aGlzICkuY2xpY2soZnVuY3Rpb24oIGV2ZW50ICkge1xuICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpOyBcbiAgICAgICAgJCgnI21vZGFsLScrcHJvZHVjdF9pZCkudG9nZ2xlQ2xhc3MoJ3Nob3ctbW9kYWwnKTtcbiAgICAgIH0pO1xuXG4gICAgICAkKCAnI2Nsb3NlLWJ1dHRvbi0nK3Byb2R1Y3RfaWQgKS5jbGljayhmdW5jdGlvbiggZXZlbnQgKSB7XG4gICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIC8vICQoJyNtb2RhbC0nK3Byb2R1Y3RfaWQpLnRvZ2dsZUNsYXNzKCdzaG93LW1vZGFsJyk7XG4gICAgICB9KTtcblxuICAgICAgJCggJyNtb2RhbC0nK3Byb2R1Y3RfaWQgKS5jbGljayhmdW5jdGlvbiggZXZlbnQgKSB7XG4gICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICQoJyNtb2RhbC0nK3Byb2R1Y3RfaWQpLnRvZ2dsZUNsYXNzKCdzaG93LW1vZGFsJyk7XG4gICAgICB9KTtcblxuXG4gICAgfSk7XG4gIH1cblxufSk7IC8qIGVuZCBkb2MgcmVhZHkgKi9cblxuIl19
