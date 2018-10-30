(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
'use strict';

jQuery(document).ready(function ($) {
  /*----------------------------------------------djh Aug 12, 2018
    WooCommerce My Account
    Un/select specific choicess if No Preference is un/selected
  ----------------------------------------------*/
  $.each($('.gfield_checkbox'), function (index, value) {
    var currentCheckbox = this;
    $.each($(currentCheckbox).find('li input'), function (index, value) {
      if (index === 0) {
        $(this).change(function () {
          if (this.checked) {
            $.each($(currentCheckbox).find('li input'), function (index, value) {
              if (index !== 0) {
                $(value).attr('checked', false);
              }
            });
          }
        });
      } else {
        $(this).change(function () {
          if (this.checked) {
            $(currentCheckbox).find('li:first-child input').attr('checked', false);
          }
        });
      }
    });
  });
}); /* end doc ready */

},{}]},{},[1])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmMvanMvbXktYWNjb3VudC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7O0FDQUEsT0FBTyxRQUFQLEVBQWlCLEtBQWpCLENBQXVCLFVBQVMsQ0FBVCxFQUFZO0FBQ2pDOzs7O0FBSUEsSUFBRSxJQUFGLENBQVEsRUFBRSxrQkFBRixDQUFSLEVBQStCLFVBQVUsS0FBVixFQUFpQixLQUFqQixFQUF5QjtBQUN0RCxRQUFJLGtCQUFrQixJQUF0QjtBQUNBLE1BQUUsSUFBRixDQUFRLEVBQUUsZUFBRixFQUFtQixJQUFuQixDQUF3QixVQUF4QixDQUFSLEVBQTZDLFVBQVUsS0FBVixFQUFpQixLQUFqQixFQUF5QjtBQUNwRSxVQUFLLFVBQVUsQ0FBZixFQUFtQjtBQUNqQixVQUFFLElBQUYsRUFBUSxNQUFSLENBQWUsWUFBVTtBQUN2QixjQUFHLEtBQUssT0FBUixFQUFnQjtBQUNkLGNBQUUsSUFBRixDQUFRLEVBQUUsZUFBRixFQUFtQixJQUFuQixDQUF3QixVQUF4QixDQUFSLEVBQTZDLFVBQVUsS0FBVixFQUFpQixLQUFqQixFQUF5QjtBQUNwRSxrQkFBSyxVQUFVLENBQWYsRUFBbUI7QUFDakIsa0JBQUUsS0FBRixFQUFTLElBQVQsQ0FBZSxTQUFmLEVBQTBCLEtBQTFCO0FBQ0Q7QUFDRixhQUpEO0FBS0Q7QUFDRixTQVJEO0FBU0QsT0FWRCxNQVVPO0FBQ0wsVUFBRSxJQUFGLEVBQVEsTUFBUixDQUFlLFlBQVU7QUFDdkIsY0FBRyxLQUFLLE9BQVIsRUFBZ0I7QUFDZCxjQUFFLGVBQUYsRUFBbUIsSUFBbkIsQ0FBd0Isc0JBQXhCLEVBQWdELElBQWhELENBQXNELFNBQXRELEVBQWlFLEtBQWpFO0FBQ0Q7QUFDRixTQUpEO0FBS0Q7QUFDRixLQWxCRDtBQW1CRCxHQXJCRDtBQXNCRCxDQTNCRCxFLENBMkJJIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24oKXtmdW5jdGlvbiByKGUsbix0KXtmdW5jdGlvbiBvKGksZil7aWYoIW5baV0pe2lmKCFlW2ldKXt2YXIgYz1cImZ1bmN0aW9uXCI9PXR5cGVvZiByZXF1aXJlJiZyZXF1aXJlO2lmKCFmJiZjKXJldHVybiBjKGksITApO2lmKHUpcmV0dXJuIHUoaSwhMCk7dmFyIGE9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitpK1wiJ1wiKTt0aHJvdyBhLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsYX12YXIgcD1uW2ldPXtleHBvcnRzOnt9fTtlW2ldWzBdLmNhbGwocC5leHBvcnRzLGZ1bmN0aW9uKHIpe3ZhciBuPWVbaV1bMV1bcl07cmV0dXJuIG8obnx8cil9LHAscC5leHBvcnRzLHIsZSxuLHQpfXJldHVybiBuW2ldLmV4cG9ydHN9Zm9yKHZhciB1PVwiZnVuY3Rpb25cIj09dHlwZW9mIHJlcXVpcmUmJnJlcXVpcmUsaT0wO2k8dC5sZW5ndGg7aSsrKW8odFtpXSk7cmV0dXJuIG99cmV0dXJuIHJ9KSgpIiwialF1ZXJ5KGRvY3VtZW50KS5yZWFkeShmdW5jdGlvbigkKSB7XG4gIC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLWRqaCBBdWcgMTIsIDIwMThcbiAgICBXb29Db21tZXJjZSBNeSBBY2NvdW50XG4gICAgVW4vc2VsZWN0IHNwZWNpZmljIGNob2ljZXNzIGlmIE5vIFByZWZlcmVuY2UgaXMgdW4vc2VsZWN0ZWRcbiAgLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG4gICQuZWFjaCggJCgnLmdmaWVsZF9jaGVja2JveCcpLCBmdW5jdGlvbiggaW5kZXgsIHZhbHVlICkge1xuICAgIHZhciBjdXJyZW50Q2hlY2tib3ggPSB0aGlzO1xuICAgICQuZWFjaCggJChjdXJyZW50Q2hlY2tib3gpLmZpbmQoJ2xpIGlucHV0JyksIGZ1bmN0aW9uKCBpbmRleCwgdmFsdWUgKSB7XG4gICAgICBpZiAoIGluZGV4ID09PSAwICkge1xuICAgICAgICAkKHRoaXMpLmNoYW5nZShmdW5jdGlvbigpe1xuICAgICAgICAgIGlmKHRoaXMuY2hlY2tlZCl7XG4gICAgICAgICAgICAkLmVhY2goICQoY3VycmVudENoZWNrYm94KS5maW5kKCdsaSBpbnB1dCcpLCBmdW5jdGlvbiggaW5kZXgsIHZhbHVlICkge1xuICAgICAgICAgICAgICBpZiAoIGluZGV4ICE9PSAwICkge1xuICAgICAgICAgICAgICAgICQodmFsdWUpLmF0dHIoICdjaGVja2VkJywgZmFsc2UgKTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgICQodGhpcykuY2hhbmdlKGZ1bmN0aW9uKCl7XG4gICAgICAgICAgaWYodGhpcy5jaGVja2VkKXtcbiAgICAgICAgICAgICQoY3VycmVudENoZWNrYm94KS5maW5kKCdsaTpmaXJzdC1jaGlsZCBpbnB1dCcpLmF0dHIoICdjaGVja2VkJywgZmFsc2UgKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgIH0pO1xuICB9KTtcbn0pOyAvKiBlbmQgZG9jIHJlYWR5ICovIl19
