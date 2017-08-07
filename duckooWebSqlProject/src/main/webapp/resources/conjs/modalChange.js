	var changeColor = function(event){
		event.stopPropagation();
		event.preventDefault();
		var target = event.srcElement;
		
		var allTag = document.getElementsByClassName("attrs");
		
		for(var i=0;i<allTag.length;i++){
			
			$(allTag[i]).css("background-color","");
		}
		
		$(target).css("background-color","#58D3F7");
	}
	
	
	
