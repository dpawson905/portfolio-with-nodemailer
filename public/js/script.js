/* global $*/
/* global SmoothScroll*/
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

  var scroll = new SmoothScroll('a[href*="#"]',{
  	offset: 80                              
  });

  var typed = new Typed(".about-text", {
    strings: ["^1000// Full Stack Web Developer&nbsp;"],
    typeSpeed: 25,
  });

  // var typed1 = new Typed(".contact-text", {
  //   strings: [
  // 		"Feel free to contact me about my services.^1000",
  // 		"Or, you can contact me directly at (336)302-7348.^1000",
  // 		"Your information will never be sold to any third parties."
  // 	 ],
  //   smartBackspace: true, // Default value
  //   typeSpeed: 25,
  //   backSpeed: 30
  // });
  
});
