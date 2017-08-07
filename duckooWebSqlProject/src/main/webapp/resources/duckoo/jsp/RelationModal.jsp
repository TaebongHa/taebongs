<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>

<div class="modal fade" id="tbl_nameModal" role="dialog" >
    <div class="modal-dialog modal-sm">
      <div class="modal-content">
        <div class="modal-header">
          <button type="button" class="close" data-dismiss="modal">&times;</button>
          <h4 class="modal-stitle">테이블 생성.</h4>
        </div>
        <div class="modal-sbody">
          <p>테이블 이름 입력.<input type="text" id="tbl_name"></input></p>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-danger" data-dismiss="modal">Close</button>
          <button type="button"  id="conform" class ="btn btn-success">conform</button>
        </div>
      </div>
    </div>
</div>

<div class="modal fade" id="relationModal" role="dialog" >
    <div class="modal-dialog modal-m">
      <div class="modal-content">
        <div class="modal-header">
          <button type="button" class="close" data-dismiss="modal">&times;</button>
          <h4 class="modal-Rtitle">관계생성.</h4>
        </div>
        <div class="modal-Rbody">
          <div class="identify">
          	<button type="button" id="idf" class="btn btn-info">식</button>
          </div>
          <div class="nidentify">
          	<button type="button" id="nidf"class="btn btn-danger">비식</button>
          </div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-danger" data-dismiss="modal">Close</button>
        </div>
      </div>
    </div>
</div>



<div class="modal fade" id="identified" role="dialog" >
    <div class="modal-dialog modal-m">
      <div class="modal-content">
        <div class="modal-header">
          <button type="button" class="close" data-dismiss="modal">&times;</button>
          <h4 class="modal-Rtitle">tbl_관계생성</h4>
          <h4>자동 FK컬럼 생성을 원하시면새 컬럼 생성을 체크해 주시기 바랍니다.</h4>
        </div>
        <div class="modal-Rbody">
        <div id="srcInfo">
        	<select id="sourceCol">
        		
        	</select>
        </div>
        <div id="targetInfo">
        	<select id="targetCol">
        		
        	</select>
        </div>
        <div id="options">
        	<input type="checkbox" class="option"  value="OneToOne" onclick="checkOpt(this)">1:1<br />
        	<input type="checkbox" class="option"  value="OneToMany" checked onclick="checkOpt(this)">1:M<br />
        	<input type="checkbox" class="option"  value="ManyToMany" onclick="checkOpt(this)">M:N<br />
        </div>
        <div id="genOption">
        	<input type="checkbox" class="genOption" value=true>새 컬럼생성후 연결<br/>
        </div>
        </div>
        <div class="modal-footer">
        	<button type="button" id="optSelect"class="btn btn-success">옵션설정.</button>
          <button type="button" class="btn btn-danger" data-dismiss="modal">Close</button>
           <button type="button" id="relSave" class="btn btn-success" data-dismiss="modal">save</button>
        </div>
      </div>
    </div>
</div>
<div class="modal fade" id="optionSelect" role="dialog" >
    <div class="modal-dialog modal-m">
      <div class="modal-content">
        <div class="modal-header">
          <button type="button" class="close" data-dismiss="modal">&times;</button>
          <h4 class="modal-Rtitle"></h4>
          <h4></h4>
        </div>
        <div class="modal-Rbody">
     
        <div id="resOption">
        	<input type="checkbox" class="resOption"  value="restrict" checked onclick="checkRes(this)">restrict<br />
        	<input type="checkbox" class="resOption"  value="cascade" onclick="checkRes(this)">cascade<br />
        	<input type="checkbox" class="resOption"  value="no action" onclick="checkRes(this)">no action<br />
        	<input type="checkbox" class="resOption"  value="set null" onclick="checkRes(this)">set null<br />
        </div>
        
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-danger" data-dismiss="modal">Close</button>
           <button type="button" id="optSave" class="btn btn-success" data-dismiss="modal">save</button>
        </div>
      </div>
    </div>
</div>


<script type="text/javascript" src="/resources/duckoo/js/relationFunction.js?<%=request.getParameter("token")%>"></script>

<script type="text/javascript" src="/resources/duckoo/js/node/AttrNode.js?<%=request.getParameter("token")%>"></script>
<script type="text/javascript" src="/resources/duckoo/js/node/AttrNodeManager.js?<%=request.getParameter("token")%>"></script>

<script type="text/javascript" src="/resources/duckoo/js/relation/Relation.js?<%=request.getParameter("token")%>"></script>
<script type="text/javascript" src="/resources/duckoo/js/relation/RelationManager.js?<%=request.getParameter("token")%>"></script>


<script>

var $document=$document || $(document); 

$document.on("click","#makeTableBtn",function(e){

	$("#tbl_nameModal").modal({backdrop:'static'});
});

$("#conform").on("click",function(e){
	 
	 var tempName = $("#tbl_name").val().trim();
	 
	 if(!EntityControll.isEntityExist(tempName)){
	 	var entity=EntityManager.createEntity({name:tempName,attr:[]});
	   v(entity).show();
	 	
	 	$("#tbl_nameModal").modal('hide');
	 }
	 else{
		 alert("중복.");
	 }
});

$document.on("click","#makeRelationBtn",function(e){
 	e.stopPropagation();
	e.preventDefault();
	
	relationfunction.initiateElementArr();
	var icon = $(this);
	var mkFlag=relationfunction.changeFlagState();
	var color="#5cb85c";
	if(mkFlag)
	  color="#FF0066";
	icon.css("background-color",color);

});

$("#idf").on("click",function(e){
		e.stopPropagation();
		e.preventDefault();
		relationfunction.getTempRelation().relationLine = "identify";
		$("#relationModal").modal("hide");
		$("#identified").modal({backdrop:'static'});
		var tempArr = relationfunction.getElementArr();
		relationfunction.collectSelectOption(EntityManager.getEntityByName(tempArr[0]) , true , relationfunction.getTempRelation().relationLine);
		relationfunction.collectSelectOption(EntityManager.getEntityByName(tempArr[1]), false ,relationfunction.getTempRelation().relationLine);
	});
$("#nidf").on("click",function(e){
	e.stopPropagation();
	e.preventDefault();
	relationfunction.getTempRelation().relationLine = "nidentify";
	$("#relationModal").modal("hide");
	$("#identified").modal({backdrop:'static'});
	var tempArr = relationfunction.getElementArr();
	relationfunction.collectSelectOption(EntityManager.getEntityByName(tempArr[0]),true,relationfunction.getTempRelation().relationLine);
	relationfunction.collectSelectOption(EntityManager.getEntityByName(tempArr[1]),false,relationfunction.getTempRelation().relationLine);
});

$("#relSave").on("click",function(e){
	e.stopPropagation();
	e.preventDefault();
	//console.log(relationfunction.getSrcPK());
	//console.log(relationfunction.getTarPK());
	
	var targetName= relationfunction.MatchName().split("+");
	var firstName = "";
	var lastName = "";
	var autoFlag = false;  
	$(".genOption").each(function() {
   	  
        if($(this).is(':checked')){
        	autoFlag =  true;
        }else{
        autoFlag= false;
        }
     });
	//console.log("autoFlag",autoFlag);
	if(autoFlag){
		relationfunction.autoGen(relationfunction.getTempRelation().source,relationfunction.getTempRelation().target,relationfunction.getTempRelation().relationLine);
	}
	else if(!EntityControll.isEffectiveName(targetName)){
		alert("중복된 컬럼이 등록되었습니다 다시시도하세요.");
		$("#identified").modal('hide');
		$("#makeRelationBtn").trigger("click");
		return;
	}else if(EntityControll.isPkExist(relationfunction.getSrcPK(),relationfunction.getTarPK())){
	//console.log($("#sourceCol option:selected").val());
	
	relationfunction.getTempRelation().relationAttr=[$("#sourceCol option:selected").val(),relationfunction.MatchName()];
	
     $(".option").each(function() {
   	  
        if($(this).is(':checked')){
       	
       	relationfunction.getTempRelation().relationType = ($(this).val());
      
        }
        checkBoxInitiate("option");
     });   
     for(var i= 0; i<targetName.length;i++){
     	var getFKAttr = EntityManager.getEntityByName(relationfunction.getTempRelation().target).search({pName:targetName[i]})[0];
     	//console.log("target's FK attribute : ",getFKAttr);
     	//console.log("the clone of src Attr :" , EntityManager.getEntityByName(relationfunction.getTempRelation().source).search({pName:relationfunction.getSrcPK()[i].pName})[0]);
     	getFKAttr.datetype = EntityManager.getEntityByName(relationfunction.getTempRelation().source).search({pName:relationfunction.getSrcPK()[i].pName})[0].clone().datetype;
     	
     	firstName += EntityManager.getEntityByName(relationfunction.getTempRelation().source).search({pName:relationfunction.getSrcPK()[i].pName})[0].id;
     	lastName += getFKAttr.id;
     	
     	if(relationfunction.getTempRelation().relationLine=="identify"){
     		getFKAttr.isFk = true;
     	}else{
     		getFKAttr.isFk = true;
     		getFKAttr.isPk = false;
     	}
     	relationfunction.getTempRelation().name = firstName +"_"+lastName;
     	//console.log("pk error is correct? : " ,relationfunction.getTempRelation());
     }

	
	relationfunction.registRelationShipManager();
	
	//console.log("relation ship saved : ",RelationShipManager.getRelationship(relationfunction.getTempRelation().name));
	
	}else{
		alert("대응되는 Attribute를 찾을 수 없습니다. 자동생성은 AutoGenerete를 체크하세요");
	}
	
	$("#makeRelationBtn").trigger("click");
	
	$("#identified").modal('hide');
});

$(".genOption").on("click",function(e){
	var genVal = $(this).val();
	genVal= (genVal==="true")?false:true;
	
	
	//console.log("first flag",genVal);
	
	$(this).val(genVal);
	//console.log("change complete? :",$(this).val());
	if(!genVal){
		$("#targetInfo").css("visibility","hidden");
		
	}
	else{
		$("#targetInfo").css("visibility","visible");
	}
	
})
$("#optSelect").on("click",function(e){
	$("#optionSelect").modal({backdrop:'static'});
	 
	
	
	
})
$("#optSave").on("click",function(e){
	restrictSelect();

});

function checkRes(chk){
    var obj = $(".resOption");
    for(var i=0; i<obj.length; i++){
        if(obj[i] != chk){
            obj[i].checked = false;
        }
    }
} 

function checkOpt(chk){
    var obj = $(".option");
    for(var i=0; i<obj.length; i++){
        if(obj[i] != chk){
            obj[i].checked = false;
        }
    }
}
function restrictSelect(){
	 $(".resOption").each(function() {
	  	  
		if($(this).is(':checked')){     	
	   relationfunction.getTempRelation().restrictType = ($(this).val())}
		
	
	})
	checkBoxInitiate("resOption");
}

function checkBoxInitiate(optionValueClass){
	var obj = $("."+optionValueClass);
	//console.log("restrict option array:",obj);
   for(var i=0; i<obj.length; i++){
   		
       if(i!=0){
           obj[i].checked = false;
       }
       else{
       	obj[i].checked = true;
       }
   }
};

</script>