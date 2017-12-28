/* global $*/
/* global Typed*/
/* global jQuery*/


$(document).ready(function() {
  
  "use strict";
    var today   = new Date(),
        hourNow = today.getHours(),
        greeting;

    if (hourNow > 17) {
	    greeting = 'Good Evening,';
    } else if (hourNow > 11) {
	    greeting = 'Good Afternoon,';
    } else if (hourNow > 0) {
	    greeting = 'Good Morning,';
    } else {
	    greeting = 'Hello';
    }

    jQuery('#hello').html(greeting);

  
  var typed = new Typed(".about-text", {
    strings: ["^1000Web Developer", "Full Stack Web Developer&nbsp;"],
    typeSpeed: 25,
    backSpeed: 40,
    backDelay: 1100
  });

 
});
