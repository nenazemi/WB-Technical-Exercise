j$("document").ready(function(){
	
	var windowHeight = j$(window).height();
	var containerHeight = j$(".content").height();
	
	if( (j$("div.container-1").hasClass("single-column")) && (containerHeight < windowHeight || windowHeight < containerHeight) ){
	
		j$("div.content").css({ "min-height": windowHeight });

		j$(window).resize(function(){
			
			var newWindowHeight = j$(window).height();
			
			j$("div.content").css({
				
				"min-height": newWindowHeight
				
			});
		});
	}
	else if( (j$("div.container-1").hasClass("two-column")) && (containerHeight < windowHeight || windowHeight < containerHeight) ){
	
		j$("div.main").css({ "min-height": windowHeight });

		j$(window).resize(function(){
			
			var newWindowHeight = j$(window).height();
			
			j$("div.main").css({
				
				"min-height": newWindowHeight
				
			});
		});
	}	
});