/* Trigger when page is ready */
$(document).ready(function(){

	// Your functions go here

	$(".fractions-unit").click(function(){
		if($(window).width()<769){
			if($(this).hasClass("open")){
				$(this).removeClass("open");
			} else{
				$(this).addClass("open");
				$(this).siblings(".fractions-unit").removeClass("open");
				
			}

		}

	})
	$(".results-wrap").slick({
		adaptiveHeight:true,
		slide:".results-unit",
		infinite:false,
		slidesToShow:4,
		slidesToScroll:1,
		variableWidth:true,

		prevArrow:".results-controls-unit.prev",
		nextArrow:".results-controls-unit.next",
		draggable:false,
		responsive:[
			{
				breakpoint:768,
				settings:{
					variableWidth:false,
					slidesToShow:1
				}
			}
		

		]
	})
	$('.results-wrap').on('beforeChange', function(event, slick, currentSlide, nextSlide){
		
		var amountOfSlides=$(".results-wrap").find(".results-unit").length;
	  if(nextSlide==0){
	  	$(".results-controls-unit.prev").addClass("inactive");
	  	
	  } else{
	  	$(".results-controls-unit.prev").removeClass("inactive");
	  }
	  if($(window).width()>768){
		  if(nextSlide==amountOfSlides-5){
		  	$(".results-controls-unit.next").addClass("inactive");
		  } else{
		  	$(".results-controls-unit.next").removeClass("inactive");
		  }
		} else{
			if(nextSlide==amountOfSlides-1){
		  	$(".results-controls-unit.next").addClass("inactive");
		  } else{
		  	$(".results-controls-unit.next").removeClass("inactive");
		  }
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