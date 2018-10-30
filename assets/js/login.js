(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
'use strict';

/*----------------------------------------------djh Jul 27, 2018
  Custom login script
----------------------------------------------*/
jQuery(document).ready(function ($) {
  // $('.custom-logo-link').html(custom_config.username);
  if ($('#user_login').length) {
    $('#user_login').val(custom_config.username);
  } else if ($('#username').length) {
    $('#username').val(custom_config.username);
  }
}); /* end doc ready */

},{}]},{},[1])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmMvanMvbG9naW4uanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7OztBQ0FBOzs7QUFHQSxPQUFPLFFBQVAsRUFBaUIsS0FBakIsQ0FBdUIsVUFBUyxDQUFULEVBQVk7QUFDakM7QUFDQSxNQUFLLEVBQUUsYUFBRixFQUFpQixNQUF0QixFQUErQjtBQUM3QixNQUFFLGFBQUYsRUFBaUIsR0FBakIsQ0FBcUIsY0FBYyxRQUFuQztBQUNELEdBRkQsTUFFTyxJQUFLLEVBQUUsV0FBRixFQUFlLE1BQXBCLEVBQTZCO0FBQ2xDLE1BQUUsV0FBRixFQUFlLEdBQWYsQ0FBbUIsY0FBYyxRQUFqQztBQUNEO0FBRUYsQ0FSRCxFLENBUUkiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbigpe2Z1bmN0aW9uIHIoZSxuLHQpe2Z1bmN0aW9uIG8oaSxmKXtpZighbltpXSl7aWYoIWVbaV0pe3ZhciBjPVwiZnVuY3Rpb25cIj09dHlwZW9mIHJlcXVpcmUmJnJlcXVpcmU7aWYoIWYmJmMpcmV0dXJuIGMoaSwhMCk7aWYodSlyZXR1cm4gdShpLCEwKTt2YXIgYT1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK2krXCInXCIpO3Rocm93IGEuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixhfXZhciBwPW5baV09e2V4cG9ydHM6e319O2VbaV1bMF0uY2FsbChwLmV4cG9ydHMsZnVuY3Rpb24ocil7dmFyIG49ZVtpXVsxXVtyXTtyZXR1cm4gbyhufHxyKX0scCxwLmV4cG9ydHMscixlLG4sdCl9cmV0dXJuIG5baV0uZXhwb3J0c31mb3IodmFyIHU9XCJmdW5jdGlvblwiPT10eXBlb2YgcmVxdWlyZSYmcmVxdWlyZSxpPTA7aTx0Lmxlbmd0aDtpKyspbyh0W2ldKTtyZXR1cm4gb31yZXR1cm4gcn0pKCkiLCIvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1kamggSnVsIDI3LCAyMDE4XG4gIEN1c3RvbSBsb2dpbiBzY3JpcHRcbi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xualF1ZXJ5KGRvY3VtZW50KS5yZWFkeShmdW5jdGlvbigkKSB7XG4gIC8vICQoJy5jdXN0b20tbG9nby1saW5rJykuaHRtbChjdXN0b21fY29uZmlnLnVzZXJuYW1lKTtcbiAgaWYgKCAkKCcjdXNlcl9sb2dpbicpLmxlbmd0aCApIHtcbiAgICAkKCcjdXNlcl9sb2dpbicpLnZhbChjdXN0b21fY29uZmlnLnVzZXJuYW1lKTtcbiAgfSBlbHNlIGlmICggJCgnI3VzZXJuYW1lJykubGVuZ3RoICkge1xuICAgICQoJyN1c2VybmFtZScpLnZhbChjdXN0b21fY29uZmlnLnVzZXJuYW1lKTtcbiAgfVxuXG59KTsgLyogZW5kIGRvYyByZWFkeSAqLyJdfQ==
