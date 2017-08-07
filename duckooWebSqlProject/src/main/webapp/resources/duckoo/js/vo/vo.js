var voGen = (function(){
	
	var cf;
	
	function voGen(){
		
	}
	voGen.prototype.generate = function(){
		 
		 var entitys = EntityManager.getEntityByName();
		 
		 var key= Object.keys(entitys);
		 var entitysArr = [];
		 key.forEach(function(val){
				entitysArr.push(entitys[val]);
		 }); 
		 
		 console.log("엔티티에이알알:",entitysArr);
		 
		 var $voCodeTab = $("#voCodeTab"); //for tab source
		 var $voClassText = $("#voClassText");
		 
		 var classInfoSource = $("#voCodeTitle").html();//클래스핸들소스
		 var javaTemplate = Handlebars.compile(classInfoSource);//클래스핸들바스컴파일
		 
		 var classNameSource = $("#inTab").html();
		 var classNameTemplate = Handlebars.compile(classNameSource);
		 
		 
		 for(var i=0; i<entitysArr.length; i++){
			 var entityName = entitysArr[i].name;
			 var firstChar =entityName.charAt(0);
			 var firstCharUpper = entityName.charAt(0).toUpperCase();
			 var entityRealName = entityName.replace(firstChar,firstCharUpper)+"VO";
			 var shopClassName = "#"+entityRealName;
			 var tabData = {className:shopClassName};
			 var tabHtml = javaTemplate(tabData);
			 var classData = {className:entityRealName}
			 var classNameHtml = classNameTemplate(classData);
 			 $voCodeTab.append(tabHtml);
 			 $voClassText.append(classNameHtml);
		 }
		 
		 var $voColumnVal = $("#voColumnVal").html();
		 var voColumnValTemplate=Handlebars.compile($voColumnVal);
		 
		 for(var i=0; i<entitysArr.length; i++){
			 for(var j=0; j<entitysArr[i].attr.length; j++){
				 var pName = entitysArr[i].attr[j].pName;
				 var dataType = entitysArr[i].attr[j].datetype;
				 switch(dataType){
				 	case "varchar" : dataType = "String";
				 		break;
				 	case "text" : dataType ="String";
				 		break;
				 	case "int" : dataType = "Integer";
				 		break;
				 	case "date" : dataType="Date";
				 		break;
				 	case "datetime" : dataType="Datetime";
				 		break;
				 	case "timestamp" : dataType="Timestamp";
				 		break;
				 }
				 var valData = {pName:pName,dataType:dataType};
				 var valHtml = voColumnValTemplate(valData);
				 
				 var entityName = entitysArr[i].name;
				 var firstChar =entityName.charAt(0);
				 var firstCharUpper = entityName.charAt(0).toUpperCase();
				 var entityRealName = entityName.replace(firstChar,firstCharUpper)+"VO";
				 $("#columns_"+entityRealName).append(valHtml);
			 } 
		 }
		 
		 var $getsetSource = $("#voGetSet").html();
		 var getsetTemplate=Handlebars.compile($getsetSource);
		 
		 for(var i=0; i<entitysArr.length; i++){
			 for(var j=0; j<entitysArr[i].attr.length; j++){
				 var pName = entitysArr[i].attr[j].pName;
				 var firstChar = pName.charAt(0);
				 var firstCharUpper = firstChar.toUpperCase();
				 var upperPName  = pName.replace(firstChar,firstCharUpper);
				 var dataType = entitysArr[i].attr[j].datetype;
				 switch(dataType){
				 	case "varchar" : dataType = "String";
				 		break;
				 	case "text" : dataType ="String";
				 		break;
				 	case "date" : dataType="Date";
				 		break;
				 	case "int" : dataType = "Integer";
			 			break;
				 	case "datetime" : dataType="Datetime";
				 		break;
				 	case "timestamp" : dataType="Timestamp";
				 		break;
				 }
				 var getsetData = {pName:pName,upperPName:upperPName,dataType:dataType}
				 var getsetHtml = getsetTemplate(getsetData);
				 var entityName = entitysArr[i].name;
				 var firstChar =entityName.charAt(0);
				 var firstCharUpper = entityName.charAt(0).toUpperCase();
				 var entityRealName = entityName.replace(firstChar,firstCharUpper)+"VO";
				 $("#columns_"+entityRealName).append(getsetHtml);
			
			 }
		}
	}
	 return voGen;
})();