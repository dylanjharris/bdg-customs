(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
'use strict';

jQuery(document).ready(function ($) {
  /*----------------------------------------------djh Aug 28, 2018
    All Orders Screen
  ----------------------------------------------*/
  // if ( $('#bulk-action-selector-top') ) {

  //   setTimeout(function() {

  //     // $('#bulk-action-selector-top').find('option[value="wc_pip_print_packing_list"]').text('Print Kitchen Report');
  //     // $('#bulk-action-selector-top').find('option[value="wc_pip_send_email_packing_list"]').text('Print Kitchen Report');

  //     $('#bulk-action-selector-top').find('option[value="wc_pip_print_pick_list"]').text('Print Kitchen Report');
  //     $('#bulk-action-selector-top').find('option[value="wc_pip_send_email_pick_list"]').text('Email Kitchen Report');

  //     // $('#wp-admin-message-handler-message').css('background','black');

  //     $('#wp-admin-message-handler-message ul li strong').contents().filter(function() {
  //         return this.nodeType == 3
  //     }).each(function(){
  //         this.textContent = this.textContent.replace('Pick List created.','Kitchen Report created.');
  //         this.textContent = this.textContent.replace('Pick List email for','Kitchen Report email for');
  //     });

  //   }, 10);

  // }


  /*----------------------------------------------djh Aug 28, 2018
    Single / All Product Pages
  ----------------------------------------------*/
  if ($('.post-type-product').length) {
    // $('.wrap').css('background','black');


    if ($('#variable_product_options').length) {
      // var styles = '<style>';
      // styles += '.variable_stock_status0_field,';
      // styles += '.variable_weight0_field,';
      // styles += '.dimensions_field';
      // styles += '';
      // styles += '';
      // styles += '';
      // styles += '{display:none!important}';
      // styles += '</style>';

      // $('#variable_product_options').append(styles);

      $('a[href="#variable_product_options"]').on('click', function () {
        setTimeout(function () {
          $('input[name^=variable_points_earned]').val('0');
          $('input[name^=variable_renewal_points]').val('0');
        }, 1000);
      });
    }
  }
}); /* end doc ready */

},{}]},{},[1])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmMvanMvYWRtaW4uanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7OztBQ0FBLE9BQU8sUUFBUCxFQUFpQixLQUFqQixDQUF1QixVQUFTLENBQVQsRUFBWTtBQUNqQzs7O0FBR0E7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTs7O0FBS0E7OztBQUdBLE1BQUssRUFBRSxvQkFBRixFQUF3QixNQUE3QixFQUFzQztBQUNwQzs7O0FBR0EsUUFBSyxFQUFFLDJCQUFGLEVBQStCLE1BQXBDLEVBQTZDO0FBQzNDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQSxRQUFFLHFDQUFGLEVBQXlDLEVBQXpDLENBQTRDLE9BQTVDLEVBQW9ELFlBQVU7QUFDNUQsbUJBQVcsWUFBVztBQUNwQixZQUFFLHFDQUFGLEVBQXlDLEdBQXpDLENBQTZDLEdBQTdDO0FBQ0EsWUFBRSxzQ0FBRixFQUEwQyxHQUExQyxDQUE4QyxHQUE5QztBQUNELFNBSEQsRUFHRyxJQUhIO0FBSUQsT0FMRDtBQVNEO0FBRUY7QUFHRixDQWhFRCxFLENBZ0VJIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24oKXtmdW5jdGlvbiByKGUsbix0KXtmdW5jdGlvbiBvKGksZil7aWYoIW5baV0pe2lmKCFlW2ldKXt2YXIgYz1cImZ1bmN0aW9uXCI9PXR5cGVvZiByZXF1aXJlJiZyZXF1aXJlO2lmKCFmJiZjKXJldHVybiBjKGksITApO2lmKHUpcmV0dXJuIHUoaSwhMCk7dmFyIGE9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitpK1wiJ1wiKTt0aHJvdyBhLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsYX12YXIgcD1uW2ldPXtleHBvcnRzOnt9fTtlW2ldWzBdLmNhbGwocC5leHBvcnRzLGZ1bmN0aW9uKHIpe3ZhciBuPWVbaV1bMV1bcl07cmV0dXJuIG8obnx8cil9LHAscC5leHBvcnRzLHIsZSxuLHQpfXJldHVybiBuW2ldLmV4cG9ydHN9Zm9yKHZhciB1PVwiZnVuY3Rpb25cIj09dHlwZW9mIHJlcXVpcmUmJnJlcXVpcmUsaT0wO2k8dC5sZW5ndGg7aSsrKW8odFtpXSk7cmV0dXJuIG99cmV0dXJuIHJ9KSgpIiwialF1ZXJ5KGRvY3VtZW50KS5yZWFkeShmdW5jdGlvbigkKSB7XG4gIC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLWRqaCBBdWcgMjgsIDIwMThcbiAgICBBbGwgT3JkZXJzIFNjcmVlblxuICAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cbiAgLy8gaWYgKCAkKCcjYnVsay1hY3Rpb24tc2VsZWN0b3ItdG9wJykgKSB7XG5cbiAgLy8gICBzZXRUaW1lb3V0KGZ1bmN0aW9uKCkge1xuXG4gIC8vICAgICAvLyAkKCcjYnVsay1hY3Rpb24tc2VsZWN0b3ItdG9wJykuZmluZCgnb3B0aW9uW3ZhbHVlPVwid2NfcGlwX3ByaW50X3BhY2tpbmdfbGlzdFwiXScpLnRleHQoJ1ByaW50IEtpdGNoZW4gUmVwb3J0Jyk7XG4gIC8vICAgICAvLyAkKCcjYnVsay1hY3Rpb24tc2VsZWN0b3ItdG9wJykuZmluZCgnb3B0aW9uW3ZhbHVlPVwid2NfcGlwX3NlbmRfZW1haWxfcGFja2luZ19saXN0XCJdJykudGV4dCgnUHJpbnQgS2l0Y2hlbiBSZXBvcnQnKTtcblxuICAvLyAgICAgJCgnI2J1bGstYWN0aW9uLXNlbGVjdG9yLXRvcCcpLmZpbmQoJ29wdGlvblt2YWx1ZT1cIndjX3BpcF9wcmludF9waWNrX2xpc3RcIl0nKS50ZXh0KCdQcmludCBLaXRjaGVuIFJlcG9ydCcpO1xuICAvLyAgICAgJCgnI2J1bGstYWN0aW9uLXNlbGVjdG9yLXRvcCcpLmZpbmQoJ29wdGlvblt2YWx1ZT1cIndjX3BpcF9zZW5kX2VtYWlsX3BpY2tfbGlzdFwiXScpLnRleHQoJ0VtYWlsIEtpdGNoZW4gUmVwb3J0Jyk7XG5cbiAgLy8gICAgIC8vICQoJyN3cC1hZG1pbi1tZXNzYWdlLWhhbmRsZXItbWVzc2FnZScpLmNzcygnYmFja2dyb3VuZCcsJ2JsYWNrJyk7XG5cbiAgLy8gICAgICQoJyN3cC1hZG1pbi1tZXNzYWdlLWhhbmRsZXItbWVzc2FnZSB1bCBsaSBzdHJvbmcnKS5jb250ZW50cygpLmZpbHRlcihmdW5jdGlvbigpIHtcbiAgLy8gICAgICAgICByZXR1cm4gdGhpcy5ub2RlVHlwZSA9PSAzXG4gIC8vICAgICB9KS5lYWNoKGZ1bmN0aW9uKCl7XG4gIC8vICAgICAgICAgdGhpcy50ZXh0Q29udGVudCA9IHRoaXMudGV4dENvbnRlbnQucmVwbGFjZSgnUGljayBMaXN0IGNyZWF0ZWQuJywnS2l0Y2hlbiBSZXBvcnQgY3JlYXRlZC4nKTtcbiAgLy8gICAgICAgICB0aGlzLnRleHRDb250ZW50ID0gdGhpcy50ZXh0Q29udGVudC5yZXBsYWNlKCdQaWNrIExpc3QgZW1haWwgZm9yJywnS2l0Y2hlbiBSZXBvcnQgZW1haWwgZm9yJyk7XG4gIC8vICAgICB9KTtcblxuICAvLyAgIH0sIDEwKTtcblxuICAvLyB9XG5cblxuXG5cbiAgLyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tZGpoIEF1ZyAyOCwgMjAxOFxuICAgIFNpbmdsZSAvIEFsbCBQcm9kdWN0IFBhZ2VzXG4gIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuICBpZiAoICQoJy5wb3N0LXR5cGUtcHJvZHVjdCcpLmxlbmd0aCApIHtcbiAgICAvLyAkKCcud3JhcCcpLmNzcygnYmFja2dyb3VuZCcsJ2JsYWNrJyk7XG5cblxuICAgIGlmICggJCgnI3ZhcmlhYmxlX3Byb2R1Y3Rfb3B0aW9ucycpLmxlbmd0aCApIHtcbiAgICAgIC8vIHZhciBzdHlsZXMgPSAnPHN0eWxlPic7XG4gICAgICAvLyBzdHlsZXMgKz0gJy52YXJpYWJsZV9zdG9ja19zdGF0dXMwX2ZpZWxkLCc7XG4gICAgICAvLyBzdHlsZXMgKz0gJy52YXJpYWJsZV93ZWlnaHQwX2ZpZWxkLCc7XG4gICAgICAvLyBzdHlsZXMgKz0gJy5kaW1lbnNpb25zX2ZpZWxkJztcbiAgICAgIC8vIHN0eWxlcyArPSAnJztcbiAgICAgIC8vIHN0eWxlcyArPSAnJztcbiAgICAgIC8vIHN0eWxlcyArPSAnJztcbiAgICAgIC8vIHN0eWxlcyArPSAne2Rpc3BsYXk6bm9uZSFpbXBvcnRhbnR9JztcbiAgICAgIC8vIHN0eWxlcyArPSAnPC9zdHlsZT4nO1xuXG4gICAgICAvLyAkKCcjdmFyaWFibGVfcHJvZHVjdF9vcHRpb25zJykuYXBwZW5kKHN0eWxlcyk7XG5cbiAgICAgICQoJ2FbaHJlZj1cIiN2YXJpYWJsZV9wcm9kdWN0X29wdGlvbnNcIl0nKS5vbignY2xpY2snLGZ1bmN0aW9uKCl7XG4gICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24oKSB7XG4gICAgICAgICAgJCgnaW5wdXRbbmFtZV49dmFyaWFibGVfcG9pbnRzX2Vhcm5lZF0nKS52YWwoJzAnKTtcbiAgICAgICAgICAkKCdpbnB1dFtuYW1lXj12YXJpYWJsZV9yZW5ld2FsX3BvaW50c10nKS52YWwoJzAnKTtcbiAgICAgICAgfSwgMTAwMCk7XG4gICAgICB9KTtcblxuXG5cbiAgICB9XG5cbiAgfVxuXG5cbn0pOyAvKiBlbmQgZG9jIHJlYWR5ICovIl19
