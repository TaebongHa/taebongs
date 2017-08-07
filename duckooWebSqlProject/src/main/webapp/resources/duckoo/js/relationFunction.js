
var relationfunction=(function(){
	var flag = false;
	var tempRelation = undefined;
	var elementArr=[];
	var srcPKElement=[];
	var tarPKElemnet=[];
	var relId  =new Count();
	
	
	
	function prepareStatement(e){
		if(flag){	
			
			var id = $(e.that).attr('id');
		 	if(elementArr.length==0){
			
				elementArr.push(id);
				//console.log("firstArr :",elementArr);
				return;
		 	}
		 	else if(elementArr[0]!==id){
		    	var fid= elementArr[0];//relationship 이용해서  modal작업끝나고 랜더링
		    	elementArr.push(id);
		    	//console.log("second :",elementArr);
		    	$("#relationModal").modal({backdrop:'static'});
		    	tempRelation= {source:fid,target:id};
		    	
		    	//console.log("tempRelation : ",tempRelation);

		    	return;
		     }
		 }
	}
	  
	 var observer=Object.create(Obsever);
	 
	  observer.init("relationModalclick",prepareStatement);
	  EntityManager.Obserable.setEventObserver("click",observer);
	  

	 function collectSelectOption(EntityObject,isSource,relationType){
		 //console.log("entity :" ,EntityObject);
		 var pkAttrArray = [];
		 //console.log("the result of search :",EntityObject.search({isPk:true}));
		if(tempRelation.relationLine=="identify"||isSource){
			pkAttrArray = collectPKElement(EntityObject,pkAttrArray,isSource);
			//console.log("Collect comp : " ,pkAttrArray);
		}
		else if(tempRelation.relationLine=="nidentify"){
			pkAttrArray =  collectStdElement(EntityObject,pkAttrArray,isSource);
			//console.log("Collect comp : " ,pkAttrArray);
		}
		
		 if(isSource){
			 srcPKElement = pkAttrArray;
		 }
		 else{
			 tarPKElement = pkAttrArray;
		 }
		 createSelectOption(pkAttrArray,isSource,relationType);
		 
	 }
	 function createSelectOption(pkAttrArr,isSource,relationType){
		 var targetLink;
		 //console.log("Attribute Collected : " , pkAttrArr)
		 if(isSource){
			 targetLink = $("#sourceCol"); 
		 
		 targetLink.html("");
		 var insideStr="";
		 for(var i = 0;i<pkAttrArr.length;i++){
			 insideStr += pkAttrArr[i].pName+"";
			 insideStr +="+";
			 }
		 insideStr = insideStr.substring(0,insideStr.length-1);
		 
		 var str = "<option value="+insideStr+">"+insideStr+"</option>"
		 

		 targetLink.append(str);
		 }else{
			 targetSelectOption(pkAttrArr);
		 }
		 
	 }
	 function targetSelectOption(pkAttrArr){
		 var targetLink = $("#targetInfo");
		 targetLink.html("");
		 
		 for(var i =0;i<srcPKElement.length;i++){
			 var str="";
			 str+="<p>"+srcPKElement[i].pName+"과 매칭될 컬럼.</p>"
			 str += "<select class = 'tarCol'>"
				 
				 for(var j=0;j<pkAttrArr.length;j++){
					 
					 str+="<option class='tarVal' value="+pkAttrArr[j].pName+">"+pkAttrArr[j].pName+"</option>"
				 }
			 str+="</select>"
			 targetLink.append(str);
		 }
		 
	 }
	function collectPKElement(EntityObject,pkAttrArray,isSource){
		for(var i=0;i<EntityObject.attr.length;i++){
			 
			  if(EntityObject.attr[i].isPk){
				 pkAttrArray.push(EntityObject.attr[i]);
			 }
		 } 
		return pkAttrArray;
	}
	function collectStdElement(EntityObject,pkAttrArray,isSource){
		for(var i=0;i<EntityObject.attr.length;i++){
			 
			 if(!isSource&&(!EntityObject.attr[i].isPk)&&(!EntityObject.attr[i].isFk)){
					pkAttrArray.push(EntityObject.attr[i]);
				 }
		 }
		return pkAttrArray;
	}
	function changeFlagState(){
		flag = (!flag);
		return flag;
	}
	function getTempRelation(){
		return tempRelation;
		
	};
	function getSrcPK(){
		return srcPKElement;
	}
	function getTarPK(){
		return tarPKElement;
	}
	function getElementArr(){
		var tempEleArr = elementArr;
		elementArr=[];
		return tempEleArr;
	}
	function initiateElementArr(){
		elementArr=[];
	}
	function setTempRelation(relation){
		tempRelation = relation;
	}
	
	function registRelationShipManager(){
		
		if(typeof tempRelation.restrictType==="undefined"){
			restrictSelect();			
		}

		tempRelation.id = relationfunction.relId.gen();
		
		var firstName;
		var lastName;
		var tempRelAtt = tempRelation.name;
		var srcAttArr = tempRelAtt.split("_")[0].split("/");
		var tarAttArr = tempRelAtt.split("_")[1].split("/");
		
		tempRelation.count = srcAttArr.length;
		console.log("ASDfasfdsdfasdfasdfasdfsadfsadfasdfsaf",tarAttArr);
		for(var i=0,len=tarAttArr.length;i<len ;i++ ){
			var sId=srcAttArr[i];
			var tId=tarAttArr[i];
			var src= attrNodeManager.get(sId);
			// 일단
			src.entity=tempRelation.source;
			
			src.relIdPush(tempRelation.id);
			var tag= attrNodeManager.get(tId);
			tag.entity=tempRelation.target;
			
			tag.relIdPush(tempRelation.id);
			attrNodeManager.link(sId,tId);
		}
	     console.log("제대로 들어갔냐: ",attrNodeManager);
		
		var  relation= new Relation(tempRelation);
		
		relationManager.add(relation);
	    
		console.log("tempRelation???",tempRelation);
		//console.log("저장됨? : ",relationManager.get(tempRelation.name));	
		
		renderManager.connectDiv({$source:$("#"+tempRelation.source) ,$target:$("#"+tempRelation.target),id:tempRelation.id,lineType:tempRelation.relationLine});
		
		
		v(EntityManager.getEntityByName(tempRelation.source)).refresh();
		v(EntityManager.getEntityByName(tempRelation.target)).refresh();
		
		
	}
	
	
	
	function autoGen(srcElementId,tarElementId,connectionType){

		
		var tempString = $("#sourceCol option:selected").val();
		var firstName = "";
		var lastName = "";
		var tempArr = tempString.split("+");
		//var targetAttrNames="";
		//console.log("names of selected pk's : ",tempArr)
		
		var cloneArr = [];
	    $(".option").each(function() {
	  	  
	       if($(this).is(':checked')){
	      	
	      	tempRelation.relationType = ($(this).val());
	      	
	       }
	    }); 
		//배열로나옴
		for(var i=0;i<tempArr.length;i++){
			var cloneAttr = EntityManager.getEntityByName(srcElementId).search({pName:tempArr[i]})[0].clone();
			firstName +=EntityManager.getEntityByName(srcElementId).search({pName:tempArr[i]})[0].clone().id+"/";
			cloneAttr.isFk = true;
			cloneAttr.id=undefined;
			initiateFKAttr(cloneAttr);
			if(connectionType=="nidentify"){cloneAttr.isPk=false;}
			cloneArr.push(cloneAttr);
			
		}
		
		while(EntityControll.isNameExist(cloneArr,tempRelation)){
			cloneArr = makeName(cloneArr);
			
			if(!EntityControll.isNameExist(cloneArr,tempRelation)){
				break;
			}
		}
	
		//renderManager.connectDiv({$source:$("#"+relationfunction.getTempRelation().source) ,$target:$("#"+relationfunction.getTempRelation().target),id:relationfunction.getTempRelation().source+" "+relationfunction.getTempRelation().target,lineType:relationfunction.getTempRelation().relationLine});
		for(var j = 0;j<cloneArr.length;j++){
			//targetAttrNames += (cloneArr[j].pName+"+");
	  		EntityManager.setAttribute(tarElementId, cloneArr[j]);
		}
			//console.log("the information of cloneArr :",cloneArr);
		
			for(var i=0;i<cloneArr.length;i++){
				lastName +=EntityManager.getEntityByName(tempRelation.target).search({pName:cloneArr[i].pName})[0].id+"/";
				
			}

				
			firstName = firstName.substring(0,firstName.length-1);
			lastName = lastName.substring(0,lastName.length-1);
			tempRelation.name = firstName +"_"+lastName;
			
			
		registRelationShipManager(tempRelation);
		initiateTempRelation();
		
	
	}
	function MatchName(){
		var tempSelectedValue = [];
		var resultStr="";
		var domTarget = $(".tarCol option:selected");
		//console.log("selected dom target : ",domTarget);
		for(var i = 0;i<domTarget.length;i++){
			tempSelectedValue.push(domTarget[i].value);
			resultStr += domTarget[i].value+"+";
		}
		//console.log("collecting Target's FK option :", tempSelectedValue);
		//console.log("the result of String name : ",resultStr.substring(0,resultStr.length-1));
		
		
		return resultStr.substring(0,resultStr.length-1);
	}
	function makeName(tempCloneArr){
		for(var j = 0;j<tempCloneArr.length;j++){
			tempCloneArr[j].pName = tempRelation.source+"_"+tempCloneArr[j].pName;
		}
		return tempCloneArr;
		
	}
	function initiateFKAttr(attr){
		//attr.unique = false;
		attr.autoIncrement = false;
		
	}
	function initiateTempRelation(){
		tempRelation={};
	}
	 return {changeFlagState:changeFlagState,
		 	getTempRelation:getTempRelation,
		 	collectSelectOption:collectSelectOption,
		 	getSrcPK:getSrcPK,
		 	getTarPK:getTarPK,
		 	relId:relId,
		 	registRelationShipManager:registRelationShipManager,
		 	getElementArr:getElementArr,
		 	initiateElementArr:initiateElementArr,
		 	autoGen:autoGen,
		 	MatchName:MatchName,
		 	initiateTempRelation:initiateTempRelation,
		 	setTempRelation:setTempRelation}
})();