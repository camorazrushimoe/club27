/* Trigger when page is ready */
$(document).ready(function(){

	// Your functions go here

	$(".fractions-unit").click(function(){
		if($(window).width()<769){
			if($(this).hasClass("open")){
				$(this).removeClass("open");
			} else{
				$(this).siblings(".fractions-unit").removeClass("open");
				$(this).addClass("open");
			}

		}

	})
	$(".results-wrap").slick({
		slide:".results-unit.gamesResult",
		infinite:false,
		variableHeight:true,
		initialSlide:1,
		prevArrow:".results-controls-mobile-unit.prev",
		nextArrow:".results-controls-mobile-unit.next",
		responsive:[
		{
			breakpoint:10000,
			settings:"unslick"
		},
		{
			breakpoint:768,
			settings:{
				slide:".results-unit.gamesResult",
				infinite:false,
				variableHeight:true,
				initialSlide:1,
				prevArrow:".results-controls-mobile-unit.prev",
				nextArrow:".results-controls-mobile-unit.next",
			}
		},

		]
	})
	$('.results-wrap').on('beforeChange', function(event, slick, currentSlide, nextSlide){
		console.log(nextSlide);
		var amountOfSlides=$(".results-wrap").find(".results-unit.gamesResult").length;
		console.log(amountOfSlides);
	  if(nextSlide==0){
	  	$(".results-controls-mobile-unit.prev").addClass("inactive");
	  	$(".results-controls-mobile-unit.next").removeClass("inactive");
	  }
	  if(nextSlide==amountOfSlides-1){

	  	$(".results-controls-mobile-unit.prev").removeClass("inactive");
	  	$(".results-controls-mobile-unit.next").addClass("inactive");
	  }
	});
	$(document).on('click', 'a[href=#]', function(e){ e.preventDefault(); });

});


/* Optional triggers

$(window).load(function() {
	
});

$(window).resize(function() { 
	
});

*/