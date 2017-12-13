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

  $(window).scroll(function () {
    $(".slideanim").each(function () {
      var pos    = $(this).offset().top,
          winTop = $(window).scrollTop();
      if (pos < winTop + 800) {
        $(this).addClass("slide");
      }
    });
  });
  
});
