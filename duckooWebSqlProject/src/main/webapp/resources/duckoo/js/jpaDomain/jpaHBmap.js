var hbMap =(function(){
	var hbMap =	{
			"Column":column
			/*"Id":,
			"EmbeddedId":,
			"JoinColumn":,
			"OneToMany":,
			"ManyToOne":*/
	}
	
	var column = function(){
		columnAnnoSource = $("#annoColumn").html();
 		columnAnnoTemplate = Handlebars.compile(columnAnnoSource);
 		annoData={propAnno:"Column", colName:classInfo[i].properties[j].colName};
 		var annoHtml = columnAnnoTemplate(annoData);
		$("#columnDiv_"+classInfo[i].className+"_"+classInfo[i].properties[j].pName).append(annoHtml);
	}
	
	var id = function(){
		columnAnnoSource = $("#annoId").html();
 		columnAnnoTemplate = Handlebars.compile(columnAnnoSource);
 		annoData={propAnno:"Id"};
 		var annoHtml = columnAnnoTemplate(annoData);
		 $("#columnDiv_"+classInfo[i].className+"_"+classInfo[i].properties[j].pName).append(annoHtml);
	}
	
	var embeddedId = function(){}
	var joinColumn = function(){}
	var oneToMany = function(){}
	var manyToOne = function(){}
	return {}
})();