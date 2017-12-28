// Check Off Specific Todos By Clicking
$('ul').on("click", "li", function() {
	// toggleClass will toggle a class on and off using css
	$(this).toggleClass('completed');
});

// Click on X to delete todo
$('ul').on("click", "span", function(event) {
	$(this).parent().fadeOut(500, function() {
		$(this).remove();
	});
	// using event.stopPropagation will stop the X click from
	// bubbling up to parent elements.
	event.stopPropagation();
});

$("input[type='text']").keypress(function(event) {
	// which works with keypress to determine which key was pressed
	// 13 is the key code for Enter
	if(event.which === 13) {
		// grab text from input
		var todoText = $(this).val();
		// clear out the input text box
		$(this).val("");
		// create a new li and add to ul
		$("ul").append("<li><span><i class='fa fa-trash-o'></i></span> " + todoText + "</li>");
	}
});

$(".fa-pencil-square-o").click(function() {
	$("input[type='text']").fadeToggle(500);
});