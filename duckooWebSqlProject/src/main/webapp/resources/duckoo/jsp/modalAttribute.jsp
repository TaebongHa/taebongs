<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
    <link rel="stylesheet" href="/resources/duckoo/css/modal.css?<%=request.getParameter("token")%>">
    <link rel="stylesheet" href="/resources/duckoo/css/entityAttr.css?<%=request.getParameter("token")%>">

 <script id="attrAddForm" type="text/x-handlebars-template">
        <div class='modalTr' id={{id}} name="openAttrDelUpDiv_{{id}}">
            <div class='datas'>
				{{#if isPk}}
					{{#if isFk}}
					<p id="keyType_{{id}}">PK/FK</p>
					{{else}}
					<p id="keyType_{{id}}">PK</p>
					{{/if}}
				{{else if isFk}}
					<p id="keyType_{{id}}">FK</p>
				{{else}}
					<p id="keyType_{{id}}">NONE</p>
				{{/if}}	
            </div>
            <div class='datas'><p id="lName_{{id}}">{{lName}}</p></div>
            <div class='datas'><p id="pName_{{id}}"{{pName}}>{{pName}}</p></div>
            <div class='datas'><p id="dataType_{{id}}">{{datetype}}
			{{#ifDate datetype}}
				</p></div>
			{{else}}
				({{datelength}})
				</p></div>
			{{/ifDate}}
            <div class='datas'><p id="default_{{id}}">{{defaultExp}}</p></div>
            <div class='datas'><button class="openConstraintBtn" data-openCB="{{id}}"><i class="fa fa-chevron-down" aria-hidden="true"></i></button></div>
        </div>
        <div class='modalTr checkBox' id="openDiv_{{id}}" name='ConstraintCheckBox'>
			{{#if notNull}}
			<input onclick="return false;" type='checkbox' id="notNull_{{id}}"  name='Not Null' value='Not Null' checked>Not Null</input>
            {{else}}
			<input onclick="return false;" type='checkbox' id="notNull_{{id}}" name='Not Null' value='Not Null'>Not Null</input>
            {{/if}}
           	{{#if autoIncrement}}
			<input onclick="return false;" type='checkbox' id="autoIncre_{{id}}" name='Autoincrement' value='Autoincrement' checked>Autoincrement</input>
			{{else}}
			<input onclick="return false;" type='checkbox' id="autoIncre_{{id}}" name='Autoincrement' value='Autoincrement'>Autoincrement</input>
			{{/if}}
			<input onclick="return false;" type='checkbox' id="uniqueVal_{{id}}" name='Unique' value='Unique'>Unique</input>
        </div>
		<div class='modalTr delUp' id="openAttrDelUpDiv_{{id}}" name='attrDelUpBtnBox'>
			<button class='updateAttrBtn' data-updateAttrBtn="{{id}}">수정</button>
			<button class='deleteAttrBtn'>삭제</button>
		</div>
</script> 
<script type="text/javascript" src="/resources/duckoo/js/modal.js?<%=request.getParameter("token")%>"></script>
<script type="text/javascript" src="/resources/duckoo/js/modalAttribute.js?<%=request.getParameter("token")%>"></script>
<jsp:include page="addAttrModal.jsp"></jsp:include>
<jsp:include page="updateAttrModal.jsp"></jsp:include>
<jsp:include page="confirmModal.jsp"></jsp:include>
<script>
$(document).on("click",".openConstraintBtn",function(e){

	e.stopPropagation();
    e.preventDefault();
	
	modalAttribute.Obserable.fire("openConstraintBtn",{event:e,that:this});
	
})
$(document).on("click",".datas",function(e){
    e.stopPropagation();
    e.preventDefault();
  /*   $("tr").css("background-color","");
    $(this).parent().css("background-color","#269abc");
   target = $(this).parent();
    */
   modalAttribute.Obserable.fire("click_trDatas",{event:e,that:this});
});
////////////////addColumn start///////////////////
$(document).on("click",".addAttrBtn",function(e){
    e.stopPropagation();
    e.preventDefault();
    $("#addAttrModalWindow").modal();
});
$(document).on("click","#addAttrFinalBtn",function(e){
	e.stopPropagation();
    e.preventDefault();
    
    modalAttribute.Obserable.fire("addAttrFinalBtn",{event:e,that:this});
    $("#addAttrModalWindow").modal("hide");
});
//////////////////////addColumn end//////////////////////////


$(document).on('click','.deleteAttrBtn',function(e){
	e.stopPropagation();
    e.preventDefault();
	/* if(!target)return;
    var id=target.attr("id");
    entity.deleteAttr(Number(id));
     target.remove();
      */
    modalAttribute.Obserable.fire("delBtn",{event:e,that:this});     
});
$("#confirmYes").on("click",function(e){
	e.stopPropagation();
    e.preventDefault();
    modalAttribute.Obserable.fire("confirmYes",{event:e,that:this});
});
///////////////////delete end//////////////////////////////////

////////////////update column start///////////////////////////
$(document).on("click",'.updateAttrBtn',function(e){
	e.stopPropagation();
    e.preventDefault();
    modalAttribute.Obserable.fire("attrInputChange",{event:e,that:this});
});
$(document).on("click","#updateAttrFinalBtn",function(e){
	e.stopPropagation();
    e.preventDefault();
    
    modalAttribute.Obserable.fire("updateAttrFinalBtn",{event:e,that:this});
    $("#updateAttrModalWindow").modal("hide");
});



////////////////update column end/////////////////////////////


$(document).on('click','#saveBtn',function(e){
    modalAttribute.Obserable.fire("saveBtn",{event:e,that:this});
    $("#myModal").modal("hide");
});

</script>