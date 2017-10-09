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
		variableWidth:true,
		slide:".results-unit",
		infinite:false,
		slidesToShow:4,
		slidesToScroll:1,
		variableHeight:true,
		prevArrow:".results-controls-unit.prev",
		nextArrow:".results-controls-unit.next",
		draggable:false,
		responsive:[
		
		{
			breakpoint:768,
			settings:{
				slidesToShow:1,
				slidetToScroll:1,
				slide:".results-unit.gamesResult",
			}
		},

		]
	})
	$('.results-wrap').on('beforeChange', function(event, slick, currentSlide, nextSlide){
		
		var amountOfSlides=$(".results-wrap").find(".results-unit").length;
	
	  if(nextSlide==0){
	  	$(".results-controls-unit.prev").addClass("inactive");
	  	
	  } else{
	  	$(".results-controls-unit.prev").removeClass("inactive");
	  }
	  
	  if(nextSlide==amountOfSlides-4){
	  	$(".results-controls-unit.next").addClass("inactive");
	  } else{
	  	$(".results-controls-unit.next").removeClass("inactive");
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