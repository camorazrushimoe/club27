/* Trigger when page is ready */
$(document).ready(function(){
	
	function prepend(value, array) {
	  var newArray = array.slice();
	  newArray.unshift(value);
	  return newArray;
		}



	// Your functions go here
	var fractionList1=[];// не часто бывает такоцй состав
	var fractionList2=[];// фракция щебня
	var fractionList3=[];// d-фракция
	$.ajaxSetup({
    async: false
    });
	var teamsList;
	var teamsListPull= $.getJSON("/games.json",function(response){
      teamsList=response;
      
  });
	
	$.each(teamsList[0]["Клуб 27"],function(index,value){
		
		switch(value.fraction) {
		  case 'Не часто бывает такой состав':  // if (x === 'value1')
		   fractionList1.push([index,0]);
		   break;

		  case 'Фракция щебня':  // if (x === 'value1')
		   fractionList2.push([index,0]);
		   break;

		  case 'D-фракция':  // if (x === 'value1')
		   fractionList3.push([index,0]);
		   break;

		}
	})
	for (var i=1;i<teamsList.length;i++){
		var monthNames = [
		    "января", "февраля", "марта",
		    "апреля", "мая", "июня", "июля",
		    "августа", "September", "октября",
		    "ноября", "декабря"
		  ];
		var gameDay=teamsList[i];
		var teams = gameDay.teams;
		var gameEnded=null;
		var gameDate=gameDay.date;
		var resultsWrap = $(".results-wrap");
		
		var resultsUnit ='<div class="results-unit"></div>';
		var resultsUnitNotPlayed ='<div class="results-unit notPlayed"></div>';
		gameEnded=(gameDay.game_ended==="true") ? true : false
		if(gameEnded){
			resultsWrap.append(resultsUnit);
		} else{
			resultsWrap.append(resultsUnitNotPlayed);
		}
		var textObject='<div class="results-unit-text">Начало в 19:00   </div>';
		var dateObject='<div class="results-unit-date"><span class="number">'+gameDate.slice(0,2)+'</span><span class="month">'+monthNames[gameDate.slice(3,5)]+'</span></div>';
		var resultsUnitObject=$(".results-wrap").find(".results-unit").last();
		var list='<table class="results-unit-list"><tr class="results-unit-list-header"><th></th><th class="points">Баллы</th><th class="places">Места</th></tr></table>';
		var sortedTeams=[];
		resultsUnitObject.append(dateObject);
		if(resultsUnitObject.hasClass("notPlayed")){
			resultsUnitObject.append(textObject);
		} else{
			resultsUnitObject.append(list);
			var listObject=resultsUnitObject.find(".results-unit-list");
			$.each(teams,function(index,value){
				sortedTeams.push([index,value.points]);
				for(var b=0;b<fractionList1.length;b++){
					if(fractionList1[b][0]==index){
						fractionList1[b][1]=fractionList1[b][1]+parseInt(value.points);
					}
				}
				for(var b=0;b<fractionList2.length;b++){
					if(fractionList2[b][0]==index){
						fractionList2[b][1]=fractionList2[b][1]+parseInt(value.points);
					}
				}
				for(var b=0;b<fractionList3.length;b++){
					if(fractionList3[b][0]==index){
						fractionList3[b][1]=fractionList3[b][1]+parseInt(value.points);
					}
				}
			})

			sortedTeams=sortedTeams.sort(function(a, b) {
				return b[1] - a[1];
			});


			for(var k =0;k<sortedTeams.length;k++){
				var place=k+1;
				var listUnit='<tr><td>'+sortedTeams[k][0]+'</td><td>'+sortedTeams[k][1]+'</td><td>'+place+'</td></tr>'
				listObject.append(listUnit);

			}
		}
		
		
	}
	fractionList1=fractionList1.sort(function(a, b) {
		return b[1] - a[1];
	});
	fractionList2=fractionList2.sort(function(a, b) {
		return b[1] - a[1];
	});
	fractionList3=fractionList3.sort(function(a, b) {
		return b[1] - a[1];
	});
	var fraction1Sum=0;
	var fraction2Sum=0;
	var fraction3Sum=0;
	for(var i=0;i<fractionList1.length;i++){
		var fractionsListObject=$(".fractions-unit").eq(0);
		fraction1Sum=fraction1Sum+fractionList1[i][1];
		var fractionsUnit='<div class="fractions-unit-list-unit"><div class="star"></div><div class="rank"></div><div class="underline"><div class="title">'+fractionList1[i][0]+'</div><div class="points">'+fractionList1[i][1]+'</div></div><div class="clear"></div></div>';
		fractionsListObject.append(fractionsUnit);
	}
	$(".fractions-unit").eq(0).find(".fractions-unit-points").html(fraction1Sum);

	for(var i=0;i<fractionList2.length;i++){
		fraction2Sum=fraction2Sum+fractionList2[i][1];
		var fractionsListObject=$(".fractions-unit").eq(2);
		var fractionsUnit='<div class="fractions-unit-list-unit"><div class="star"></div><div class="rank"></div><div class="underline"><div class="title">'+fractionList2[i][0]+'</div><div class="points">'+fractionList2[i][1]+'</div></div></div>';
		fractionsListObject.append(fractionsUnit);
	}
	$(".fractions-unit").eq(2).find(".fractions-unit-points").html(fraction2Sum);

	for(var i=0;i<fractionList3.length;i++){
		fraction3Sum=fraction3Sum+fractionList3[i][1];
		var fractionsListObject=$(".fractions-unit").eq(1);
		var fractionsUnit='<div class="fractions-unit-list-unit"><div class="star"></div><div class="rank"></div><div class="underline"><div class="title">'+fractionList3[i][0]+'</div><div class="points">'+fractionList3[i][1]+'</div></div></div>';
		fractionsListObject.append(fractionsUnit);
	}
	$(".fractions-unit").eq(1).find(".fractions-unit-points").html(fraction3Sum);
	
	var resultArray=fractionList1.concat(fractionList2,fractionList3);
	resultArray=resultArray.sort(function(a, b) {
		return b[1] - a[1];
	});
	for(var i=0;i<3;i++){
		var place=i+1
		var leadersList=$(".main-leaders-list");
		var leaders='<li class="main-leaders-list-unit"><span class="number">'+place+'</span><div class="star"></div><div class="image"></div><span class="name">'+resultArray[i][0]+'</span></li>'
		leadersList.append(leaders);
	}
	console.log(resultArray);
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
		console.log(amountOfSlides);
		console.log(nextSlide);
	  	if($(window).width()>768){
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
		} else{
			if(nextSlide==0){
		  		$(".results-controls-unit.prev").addClass("inactive");
		  	} else{
		  		$(".results-controls-unit.prev").removeClass("inactive");
		  	}
		  	if(nextSlide==amountOfSlides-1){
		  		$(".results-controls-unit.next").addClass("inactive");
		  	} else{
		  		$(".results-controls-unit.next").removeClass("inactive");
		  	}
		}
	});

	
});


/* Optional triggers

$(window).load(function() {
	
});

$(window).resize(function() { 
	
});

*/