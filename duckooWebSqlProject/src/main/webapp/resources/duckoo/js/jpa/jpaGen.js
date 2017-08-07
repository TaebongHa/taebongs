var jpaGen = (function(){
	
	var cf;
	
	function jpaGen(){
		
	}
	jpaGen.prototype.generate = function(){
	 var classInfos = classManager.getClassInfoArr();
	 var emclass=[];
	 for(var i=0; i<classInfos.length; i++){
		 if(classInfos[i].Emclass!=undefined){
			 emclass.push(classInfos[i].Emclass);
		 }
	 }
	 var classInfo = emclass.concat(classInfos);
	 var $javaClassText = $("#javaClassText");//클래스들 붙일 곳
	 var $jpaCodeTab =$("#jpaCodeTab");
	 
	 var classInfoSource = $("#javaClasss").html();//클래스핸들소스
	 var javaTemplate = Handlebars.compile(classInfoSource);//클래스핸들바스컴파일
	 
	 var classAnnotationSource = $("#classAnnotations").html();//클래스어노테이션소스
	 var classAnnotationTemplate = Handlebars.compile(classAnnotationSource);// 클래스어노테이션컴파일
	 
	 var jpaCodeTitleSource = $("#jpaCodeTitle").html();
	 var jpaCodeTitleTemplate = Handlebars.compile(jpaCodeTitleSource);
	 
	 Handlebars.registerHelper('ifInteger', function(dataType, options) {
		  if(dataType == "Integer") {
		    return options.fn(this);
		  }
		  return options.inverse(this);
		});
	 
	 
	 for(var i=0; i<classInfo.length; i++){
		 var className = classInfo[i].className;
		 var shopClassName = "#"+className;
		 var shopData = {className:shopClassName}
	 	 var javaData = {className:className}; 
		 var javaHtml = javaTemplate(javaData);
		 var jpaTitleHtml = jpaCodeTitleTemplate(shopData);
	 	 $javaClassText.append(javaHtml);
	 	 $jpaCodeTab.append(jpaTitleHtml);
	 	 for(var j=0; j<classInfo[i].annotations.length; j++){
		 		var annotation = classInfo[i].annotations[j];
		 		var classAnnotationData = {className:classInfo[i].className,annotation:annotation};
		 		
		 		var classAnnotationHtml = classAnnotationTemplate(classAnnotationData);
		 		$("#annotations_"+classInfo[i].className).append(classAnnotationHtml);
		 	 }	 
	 }
	 
	 
	 var columnDivsSource = $("#columnDivs").html();//컬럼디아브이소스
	 var columnDivsTemplate = Handlebars.compile(columnDivsSource); //컬럼디아브이컴파일
	 
	 for(var i=0; i<classInfo.length; i++){
		 for(var j=0; j<classInfo[i].properties.length; j++){
			 var pName = classInfo[i].properties[j].pName;
			 var pNameData = {className:classInfo[i].className,pName:pName};
			 var pNameHtml = columnDivsTemplate(pNameData);
			 $("#columns_"+classInfo[i].className).append(pNameHtml);
		 }
	 }
	 var columnAnnoSource;//컬럼어노소스
	 var columnAnnoTemplate;// 컬럼어노컴파일 
	 
	 for(var i=0; i<classInfo.length; i++){
		 for(var j=0; j<classInfo[i].properties.length; j++){
			 for(var k=0; k<classInfo[i].properties[j].annotations.length; k++){
				 var anno = classInfo[i].properties[j].annotations[k];
				 var annoData;
				 switch (anno){
				 	case "Column" : 
				 		columnAnnoSource = $("#annoColumn").html();
				 		columnAnnoTemplate = Handlebars.compile(columnAnnoSource);
				 		annoData={propAnno:"Column", colName:classInfo[i].properties[j].colName};
				 		var annoHtml = columnAnnoTemplate(annoData);
						 $("#columnDiv_"+classInfo[i].className+"_"+classInfo[i].properties[j].pName).append(annoHtml);
				 		break;
				 	case "Id" : 
				 		var dataType = classInfo[i].properties[j].dataType;
				 		columnAnnoSource = $("#annoId").html();
				 		columnAnnoTemplate = Handlebars.compile(columnAnnoSource);
				 		annoData={propAnno:"Id",dataType:dataType};
				 		var annoHtml = columnAnnoTemplate(annoData);
						 $("#columnDiv_"+classInfo[i].className+"_"+classInfo[i].properties[j].pName).append(annoHtml);
				 		break;
				 	case "JoinColumn" : 
				 		var joinCols = classInfo[i].properties[j].joinedColumn;
				 		if(joinCols.length>=2){
				 			columnAnnoSource = $("#annoJoinColumnStart").html();
			 				columnAnnoTemplate = Handlebars.compile(columnAnnoSource);
			 				var annoHtml = columnAnnoTemplate();
			 				$("#columnDiv_"+classInfo[i].className+"_"+classInfo[i].properties[j].pName).append(annoHtml);
				 			joinCols.forEach(function(key){
				 				var colName=key.pName.toUpperCase();
				 				columnAnnoSource = $("#annoJoinCol").html();
				 				columnAnnoTemplate = Handlebars.compile(columnAnnoSource);
				 				annoData={propAnno:"JoinColumn", colName:colName};
				 				var annoHtml = columnAnnoTemplate(annoData);
				 				$("#columnDiv_"+classInfo[i].className+"_"+classInfo[i].properties[j].pName).append(annoHtml);
				 			});
				 			columnAnnoSource = $("#annoJoinColumnEnd").html();
			 				columnAnnoTemplate = Handlebars.compile(columnAnnoSource);
			 				var annoHtml = columnAnnoTemplate();
			 				$("#columnDiv_"+classInfo[i].className+"_"+classInfo[i].properties[j].pName).append(annoHtml);
				 		} else{
				 			var colName = joinCols[0].pName.toUpperCase();
			 				columnAnnoSource = $("#annoJoinCol").html();
			 				columnAnnoTemplate = Handlebars.compile(columnAnnoSource);
			 				annoData={propAnno:"JoinColumn", colName:colName};
			 				var annoHtml = columnAnnoTemplate(annoData);
			 				$("#columnDiv_"+classInfo[i].className+"_"+classInfo[i].properties[j].pName).append(annoHtml);
				 		}
				 		break;
				 	case "OneToMany" : 
				 		columnAnnoSource = $("#annoOTM").html();
				 		columnAnnoTemplate = Handlebars.compile(columnAnnoSource);
				 		annoData={propAnno:"OneToMany",className:classInfo[i].tableName}
				 		var annoHtml = columnAnnoTemplate(annoData);
						 $("#columnDiv_"+classInfo[i].className+"_"+classInfo[i].properties[j].pName).append(annoHtml);
				 		break;
				 	case "ManyToOne" : 
				 		columnAnnoSource = $("#annoMTO").html();
				 		columnAnnoTemplate = Handlebars.compile(columnAnnoSource);
				 		annoData={propAnno:"ManyToOne"}
				 		var annoHtml = columnAnnoTemplate(annoData);
						 $("#columnDiv_"+classInfo[i].className+"_"+classInfo[i].properties[j].pName).append(annoHtml);
				 		break;
				 	case "EmbeddedId" : 
				 		columnAnnoSource = $("#annoEBDID").html();
				 		columnAnnoTemplate = Handlebars.compile(columnAnnoSource);
				 		annoData={propAnno:"EmbeddedId"}
				 		var annoHtml = columnAnnoTemplate(annoData);
						 $("#columnDiv_"+classInfo[i].className+"_"+classInfo[i].properties[j].pName).append(annoHtml);
				 		break;
				 }
				 
			 }
		 }
		 
	 }
	 
	 
	 var columnValSource = $("#columnVal").html();//컬럼변수소스
	 var coulumnValTemplate = Handlebars.compile(columnValSource);//컬럼변수템플릿
	  
	 for(var i=0; i<classInfo.length; i++){
		 for(var j=0; j<classInfo[i].properties.length; j++){
				 var pName = classInfo[i].properties[j].pName;
				 var dataType = classInfo[i].properties[j].dataType;
				
				 for(var k=0; k<classInfo[i].properties[j].annotations.length; k++){
					 if(classInfo[i].properties[j].annotations[k]=="OneToMany"){
						 dataType = "List<"+classInfo[i].properties[j].dataType+">";
						 pName = classInfo[i].properties[j].pName +" = new ArrayList<>()";
					 }
				 }
				 
				 
				 var valData = {pName:pName,dataType:dataType};
				 
				 
				 
				 var valHtml = coulumnValTemplate(valData);
				 $("#columnDiv_"+classInfo[i].className+"_"+classInfo[i].properties[j].pName).append(valHtml);
		 }
	 }
	}
	 return jpaGen;
})();