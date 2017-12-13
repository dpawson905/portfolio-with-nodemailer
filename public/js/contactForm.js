/* global $*/
/* global Typed*/


$(document).ready(function() {
  
  "use strict";
  var typed1 = new Typed(".contact-text", {
    strings: [
  		"Feel free to contact me about my services.^1000",
  		"Your information will never be sold to any third parties."
  	 ],
    smartBackspace: true, // Default value
    typeSpeed: 25,
    backSpeed: 30
  });
});
  