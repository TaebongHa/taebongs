var modalAttribute=(function(){
	var head= "<div class='modalTr' style='height:46px'>"+
        "<div class='modalTh'>키타입</div>"+
        "<div class='modalTh'>논리이름</div>"+
        "<div class='modalTh'>물리이름</div>"+
        "<div class='modalTh'>데이터타입</div>"+
        "<div class='modalTh'>기본값</div>"+
       "<div class='modalTh'>제약조건</div>"+
    "</div>";
	
var body=
	"<div class='attrBoxHeader'>"+String(head)+"</div>"+
	" <div class='attrBox'>"+
    " <div class='tbl'></div>"+
    "</div>"+
    "<div class='addAttrBtnBox'><button class='addAttrBtn'>새컬럼+</button></div>"; 
	
var columnHTML= $("#attrAddForm").html();
var columnTemplate=Handlebars.compile(columnHTML);
	
var target=undefined;
var entity=undefined;

var Obserable= DObserable.createObserable();

Handlebars.registerHelper('ifDate', function(datetype, options) {
	  if(datetype === "date"||datetype === "datetime"||datetype === "timestamp") {
	    return options.fn(this);
	  }
	  return options.inverse(this);
	});


function click_trDatas(e){
	 //var $div = $("div");
	 //$div.css("background-color","");
	 
	 var $that=$(e.that);  
	 var curColumn = $that.parent();
	 var columnArr = $that.parent().parent().children();
	 var columnCount = $that.parent().parent().children().length;
	
	for(var i=0;i<columnCount; i+=3){
		 var $preCol = $("#"+columnArr[i].getAttribute("id"));
		 var $hideDiv = $("#"+$preCol.attr("name"));
		 $preCol.css("background-color","");
		 if($preCol.attr("id")===curColumn.attr("id")){
			 
		 }else{
			 if($hideDiv.css("display")==='block'){
				 //console.log("col:",$preCol);
				 //console.log("hiden:",$hideDiv);
				 $preCol.css("background-color","");
				 $hideDiv.css("height","0px");
				 $hideDiv.css("padding-top","0px");
				 //setTimeout(function(){$hideDiv.css("display","none");},270); 안먹힘....
				 $hideDiv.css("display","none");
				 //console.log("none?:",$hideDiv.css("display"));
			 }
		 }
	 };
	 
	 
	 curColumn.css("background-color","#269abc");
	 
	 target = $that.parent();
	 var $hiddenBtnDiv = $("#"+$that.parent().attr("name"));
	 if($hiddenBtnDiv.css("display")==='none'){
			$hiddenBtnDiv.css("display","block");
			setTimeout(function(){$hiddenBtnDiv.css("padding-top","15px");},0.1);
			setTimeout(function(){$hiddenBtnDiv.css("height","49px");},0.1);
	}
	else{
			$hiddenBtnDiv.css("height","0px");
			$hiddenBtnDiv.css("padding-top","0px");
			setTimeout(function(){$hiddenBtnDiv.css("display","none");},270);
	}
	 
}
var obb=Object.create(Obsever);
obb.init("colorChange",click_trDatas);
Obserable.setEventObserver("click_trDatas",obb);


function openConstraintBtn(e){
	        
/*	e.event
	e.that;
*/	
// console.log("evetn.: ", e)	;
	var id=$(e.that).attr("data-openCB");
	var $hiddenDiv=$("#openDiv_"+id);
	var $btnsDiv=$("#openAttrDelUpDiv_"+id);
	if($hiddenDiv.css("display")==='none'){
		$hiddenDiv.css("display","block");
		setTimeout(function(){$hiddenDiv.css("padding-top","15px");},0.1);
		setTimeout(function(){$hiddenDiv.css("height","49px");},0.1);
	}
	else{
		$hiddenDiv.css("height","0px");
		$hiddenDiv.css("padding-top","0px");
		setTimeout(function(){$hiddenDiv.css("display","none");},270);
	}
};
obb=Object.create(Obsever);
obb.init("openConstraintBtn2",openConstraintBtn);
Obserable.setEventObserver("openConstraintBtn",obb);

function attrInputChange(e){
	var id = $(e.that).attr("data-updateAttrBtn");
	
    var keyType = $("#keyType_"+id).text();
    var lName = $("#lName_"+id).text();
    var pName = $("#pName_"+id).text();
    var dataType = $("#dataType_"+id).text().split("(")[0].trim();
    
    if(dataType=="date"||dataType=="datetime"||dataType=="timestamp"){
    	var datalength = "";
    } else {
    	var datalength = $("#dataType_"+id).text().split("(")[1].replace(")","").trim();
    }
    var defaultVal = $("#default_"+id).text();
    var notNull = $("#notNull_"+id).is(":checked");
    var autoIncre = $("#autoIncre_"+id).is(":checked");
    var unique = $("#uniqueVal_"+id).is(":checked");
    
    var $KeyTypeUp=$("#keyTypeUp");
    
    if(keyType==="PK"){
    	$KeyTypeUp.val("PK").prop("selected", true);	
    }else if(keyType==="PK/FK"){
    	$KeyTypeUp.val("PKFK").prop("selected", true);
    }else if(keyType==="FK"){
    	$KeyTypeUp.val("FK").prop("selected", true);
    }else{
    	$KeyTypeUp.val("None").prop("selected", true);
    }
    var $updateAttrModalWindow=$("#updateAttrModalWindow");
    $("#lNameUp").val(lName);
    $("#pNameUp").val(pName);
    $("#datetypeUp").val(dataType).prop("selected", true);
    $("#datelengthUp").val(datalength);
    $("#defaultValUp").val(defaultVal);
    $("#notNullUp").attr("checked",notNull);
    $("#autoIncreUp").attr("checked",autoIncre);
    $("#uniqueValUp").attr("checked",unique);
    $("#updateAttrFinalBtn").attr("data-id",String(id));
    $updateAttrModalWindow.modal();
};
obb=Object.create(Obsever);
obb.init("attrInputChange2",attrInputChange);
Obserable.setEventObserver("attrInputChange",obb);

function updateAttrFinalBtn(e){
	var $that = $(e.that);
	//console.log("that: ",$that);
	var id= $that.attr("data-id");
	//console.log("ididid",Number(id));
	var attr =  entity.getAttr(Number(id));
	//console.log("uafb attr : ",attr);
	var keyType = $("#keyTypeUp option:selected").val();
	if(keyType==="PK"){
		attr.isPk = true;
		attr.isFk = false;
	}else if(keyType==="FK"){
		attr.isPk = false;
		attr.isFk = true;
	}else if(keyType==="None"){
		attr.isPk = false;
		attr.isFk = false;
	}else{
		attr.isPk = true;
		attr.isFk = true;	
	}	
	attr.lName = $("#lNameUp").val();
    attr.pName = $("#pNameUp").val();
    attr.datetype = $("#dataTypeUp").val();
    attr.defaultVal = $("#defaultValUp").val();
    attr.notNull = $("#notNullUp").is(":checked");
    attr.autoIncrement = $("#autoIncreUp").is(":checked");
    
    var attr1= attr.clone();
    delete attr1["isPk"];
    delete attr1["isFk"];
    delete attr1["notNull"];
    delete attr1["autoIncrement"];
    
    if(attrNodeManager.hasNode(id)){
    	   attrNodeManager.updateTourAll(String(id),{datetype:attr.datetype});
    	    attrNodeManager.updateTourChild(String(id),attr1);
    	    attrNodeManager.keyTypeTour(String(id),{isPk:attr.isPk,isFk:attr.isFk});
    	
    }
    tagSetAttr();
    
}
obb=Object.create(Obsever);
obb.init("updateAttrFinalBtn2",updateAttrFinalBtn);
Obserable.setEventObserver("updateAttrFinalBtn",obb);

function delBtn(e){
	 if(!target)return;
	  var id=target.attr("id");
	 
	  var keyType = document.getElementById("keyType_"+id).innerHTML;
	  var pName=document.getElementById("pName_"+id).innerHTML;
	  
	  confirms(keyType, pName);
	  
};
obb=Object.create(Obsever);
obb.init("delBtn2",delBtn);
Obserable.setEventObserver("delBtn",obb);

function confirms(keyType, pName){
	if(keyType==="FK"||keyType==="PK/FK"||keyType==="PK"){
		$("#confrimModal").modal();
		
	} else {
		var id=target.attr("id");
		entity.deleteAttr(Number(id));
		var $openAttrDelUpDiv= $("#openAttrDelUpDiv_"+id);
		var $openDiv = $("openDiv_"+id);
		$openAttrDelUpDiv.remove();
		$openDiv.remove();
		target.remove();
	}
};

function confirmYes(){
	
	var id = target.attr("id");
	if(attrNodeManager.hasPK(id))
	 attrNodeManager.deleteTour(Number(id));
	else{
	 entity.deleteAttr(Number(id));
	}
	//console.log("delete Atfer:",attrNodeManager);
	entity.deleteAttr(Number(id));
	var $openAttrDelUpDiv= $("#openAttrDelUpDiv_"+id);
	var $openDiv = $("openDiv_"+id);
	$openAttrDelUpDiv.remove();
	$openDiv.remove();
	target.remove();
	
	
	v(entity).entitySizing();
	$("#confrimModal").modal('hide');	
	
		
};
obb=Object.create(Obsever);
obb.init("confirmYes2",confirmYes);
Obserable.setEventObserver("confirmYes",obb);


function addAttrFinalBtn(e){
	var isPk=$("#keyType option:selected").val()==="PK"?true:false;
	var lName = $("#lName").val();
    var pName = $("#pName").val();
    var dataType = $("#datetype option:selected").val();
    var defaultVal = $("#defaultVal").val();
    var datelength = $("#datelength").val();
    var notNull = $("#notNull").is(":checked");
    var autoIncre = $("#autoIncre").is(":checked");
    var uniqueVal = $("#uniqueVal").is(":checked");
    var isFk = false; 
	//entity.setAttr({isPk:isPk,datelength:datelength, lName:lName,pName:pName,domainName:"none",datetype:dataType,notNull:notNull,autoIncrement:autoIncre,uniqueVal:uniqueVal});
    var attr={isPk:isPk, lName:lName,pName:pName,domainName:"none",datetype:dataType,datelength:datelength,notNull:notNull,autoIncrement:autoIncre,uniqueVal:uniqueVal,isFk:isFk};
    tagSetAttr(entity);
    var pkArr= entity.search({isPk:true});
    console.log("pkArr:::::::::",pkArr);
    var newAttr = entity.setAttr(attr).clone();
   
    if(isPk) {
    	 //console.log("cAttr: ",newAttr);
    	 //부실 공사.
    	 var id = (pkArr[0] && pkArr[0].id) || [];
    	 attrNodeManager.addNodeTour(id,newAttr);
    }
    entity.sortAttribute();
    //console.log("소트엔티티:",entity);
    v(entity).refresh();
    v(entity).entitySizing();
    tagSetAttr();
    //console.log("엔티티araboja:",EntityManager.getEntityByName());
    //console.log("노트도 좀 보자:",attrNodeManager.getAllNode());
    //console.log("릴레이션좀 보자:",relationManager.get());
}
obb=Object.create(Obsever);
obb.init("addAttrFinalBtn2",addAttrFinalBtn);
Obserable.setEventObserver("addAttrFinalBtn",obb);

function saveBtn(e){
    EntityManager.setEntity(entity);
    var $entity = $("#"+entity.name);
    
    v(entity).refresh();
   
    var $innerEntity = $("[data-innerEntity='"+entity.name+"']");
    v(entity).entitySizing();
}
obb=Object.create(Obsever);
obb.init("saveBtn2",saveBtn);
Obserable.setEventObserver("saveBtn",obb);



function tagSetAttr(){
	var attr= entity.getAttr();
	//console.log("tagSetAttr:",attr);//값살아있음
	var $tbl=  $(".tbl");
	 $tbl.html("");
	for(var i=0,len=attr.length;i<len;i++){
		 $tbl.append(columnTemplate(attr[i]));
	}
};

function setModal(enti,modal){
	entity=enti;
	modal.setViewPort(body);
	 tagSetAttr();
}


return {
	    setModal:setModal,
	    Obserable:Obserable
	  };
})();