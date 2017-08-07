<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ page import="java.util.HashMap" %>
<%@ page import="java.util.Map" %>
 <link rel="stylesheet" href="/resources/duckoo/css/menu.css?<%=request.getParameter("token")%>">  
 <%Cookie[] cookies = (Cookie[])session.getAttribute("login");
 	Map<String,String> cookieList = new HashMap<String,String>();
 	if(cookies==null){
 		cookieList.put("username",null);
 	} else{
 		for(int i =0; i<cookies.length; i++){
 				cookieList.put(cookies[i].getName(),cookies[i].getValue());
 		}
 	}
 	pageContext.setAttribute("username",cookieList.get("username"));
 %>   
   
   
   
   
   <div id="pageTab">
	 <ul class="nav nav-tabs">
    		<div id="menuBar">
    		<div id="currentSchemaName" style="width:300px; font-weight:bold; font-size:20px; height:100%; float:left;"></div>			
			<button style="float:right; margin-top:2px; vertical-align:middle;"><i class="fa fa-bars fa-2x" aria-hidden="true"></i></button>
            <div class="genBtnListWrap" style="float:right; width:200px; display:inline-block;">
                <button id="genListBtn"class="button btn btn-success" type="button" style="vertical-align:middle; float:right;"><span>Generate</span></button>
                <div class="genBtnListDiv">
                    <button id="genTest" class="button btn btn-success" type="button" style="vertical-align:middle; float:right;" data-toggle="tooltip" data-placement="left" title="CREATE 쿼리를 생성합니다."><span>Generate-SQL</span></button>
                    <button id="genJpaBtn" class="button btn btn-success" type="button" style="vertical-align:middle; float:right;" data-toggle="tooltip" data-placement="left" title="JPA 코드를 생성합니다."><span>Generate-JPA Code</span></button>
                    <button id="genVoBtn" class="button btn btn-success" type="button" style="vertical-align:middle; float:right;" data-toggle="tooltip" data-placement="left" title="VO 코드를 생성합니다."><span>Generate-VO Code</span></button>
                    <button id="erdSaveBtn" class="button btn btn-success" type="button" style="vertical-align:middle; float:right;" data-toggle="tooltip" data-placement="left" title="SAVE"><span>SAVE</span></button>
                    <button class="button btn btn-success" type="button" style="vertical-align:middle; float:right;" data-toggle="tooltip" data-placement="bottom" title="DB에 테이블을 생성합니다."><span>Insert DB</span></button> 
			    </div>
			</div>
            
    	</ul>
	</div>
	
		
	
	
	
	
	
<script id="__ConsoleTemp__" type="text/x-handlebars-template">
<div id="{{id}}" class="console">
		<div class="consoleHeader">
			<div class="menuClosebtn" id="consoleCloseBtn" >&times;</div>	
		</div>
	</div>
</script>	

<script id="__sidebarTemp__" type="text/x-handlebars-template">
	<div id="{{id}}" class="sideBar">
	 	<div class='sideBarHeader'>
	 		<div class="menuClosebtn" id="sideBarCloseBtn" >&times;</div>
		</div>
		<div id="sidebody_{{id}}" class="sideBarBody">
			
		</div>
	</div>
</script>
	
<script id="mainNaviBar" type="text/x-handlebars-template">
	<div id="mainNaviBar">
		<button id="makeSchemaBtn" class="btn btn-success" style="margin-top:5px; margin-left:5px;" type="button" data-toggle="tooltip" data-placement="bottom" title="스키마생성">
	 		<i class="fa fa-database" aria-hidden="true"></i>
	 	</button>
		<button id="makeTableBtn" class="btn btn-success" style="margin-top:5px; margin-left:5px;" type="button" data-toggle="tooltip" data-placement="bottom" title="테이블생성">
	 		<i class="fa fa-table" aria-hidden="true"></i>
	 	</button>
		<button id="makeRelationBtn" class="btn btn-success" style="margin-top:5px;" type="button" data-toggle="tooltip" data-placement="bottom" title="관계생성">
			<i class="fa fa-long-arrow-down" aria-hidden="true"></i>
		</button>
		<div class="dropdown" style="float:left;">
  			<button class="dropbtn">Menu</button>
  			<div class="dropdown-content" data-id='menu' style="left:0;">
    		</div>
		</div>
	</div>
</script>

 <!-- 잠시백업  <a href="#" onclick="consoleOpen()"><i class="fa fa-television" style="margin-right:10px;" aria-hidden="true"></i>Console</a>
  -->

<script id="menuItem" type="text/x-handlebars-template">
   {{#itemList}}
	<a href="#" id='item_{{id}}'><i class="fa fa-folder-open-o" style="margin-right:10px;" aria-hidden="true"></i>{{name}}</a>
   {{/itemList}}
</script>	


<script id="sidebarItem" type="text/x-handlebars-template">
<ul class="sidebarItemList">  
 {{#this}}
    <li class="sideItem" data-name={{this}}>{{this}} {{#genEntityList this}}{{/genEntityList}} </li>
  {{/this}}
</ul>
</script>	


<script id="entityList" type="text/x-handlebars-template">
<ul id="el_{{id}}" style="display:none;">  
 {{#arr}}
    <li class="entityList" data-name={{this}}>{{this}}</li>
  {{/arr}}
</ul>
</script>	



<script type="text/javascript" src="/resources/duckoo/js/menu/model/Menu.js?<%=request.getParameter("token")%>"></script>
<script type="text/javascript" src="/resources/duckoo/js/menu/view/MenuView.js?<%=request.getParameter("token")%>"></script>
<script type="text/javascript" src="/resources/duckoo/js/menu/controller/MenuCon.js?<%=request.getParameter("token")%>"></script>


<script type="text/javascript" src="/resources/duckoo/js/menu/item/model/Console.js?<%=request.getParameter("token")%>"></script>
<script type="text/javascript" src="/resources/duckoo/js/menu/item/view/ConsoleView.js?<%=request.getParameter("token")%>"></script>
<script type="text/javascript" src="/resources/duckoo/js/menu/item/controller/ConsoleCon.js?<%=request.getParameter("token")%>"></script>

<script type="text/javascript" src="/resources/duckoo/js/menu/item/model/Sidebar.js?<%=request.getParameter("token")%>"></script>
<script type="text/javascript" src="/resources/duckoo/js/menu/item/view/SidebarView.js?<%=request.getParameter("token")%>"></script>
<script type="text/javascript" src="/resources/duckoo/js/menu/item/controller/SidebarCon.js?<%=request.getParameter("token")%>"></script>

<script type="text/javascript">
 var $document=$document || $(document); 

 var menuCon=new MenuCon(new Menu());
 var consoleCon= new ConsoleCon(new Console());
 var sidebarCon= new SidebarCon(new Sidebar());
 menuCon.regItem(sidebarCon.transToMenuItem());
 menuCon.regItem(consoleCon.transToMenuItem());
 menuCon.render();  
 
 
 $('[data-toggle="tooltip"]').tooltip();
 
$document.on("click","#item_"+consoleCon.getId(),function(e){
	e.stopPropagation();
    e.preventDefault();
	consoleCon.open();
})

$document.on("click","#consoleCloseBtn",function(e){
	e.stopPropagation();
    e.preventDefault();
	consoleCon.close();
})

$document.on("click","#item_"+sidebarCon.getId(),function(e){
	e.stopPropagation();
    e.preventDefault();
	sidebarCon.open();
	// 
	var keys=SchemaManager.getKeys();
	console.log("keys?",keys);
	sidebarCon.renderItem(keys);
})

$document.on("click","#sideBarCloseBtn",function(e){
	e.stopPropagation();
    e.preventDefault();
	sidebarCon.close();
})

$document.on("click",".sideItem",function(e){
	e.stopPropagation();
    e.preventDefault();
	var name = $(this).attr("data-name");
	//SchemaManager.focusOn(name);
	SchemaManager.focusOn(name);
	var earr= SchemaManager.getEntitysNames(name);
	sidebarCon.toggleEntityList(name);
	var currentSchemaName = document.getElementById("currentSchemaName");
	currentSchemaName.innerText=name;
	
})

$document.on("click",".entityList",function(e){
	e.stopPropagation();
    e.preventDefault();
	var name = $(this).attr("data-name");
	console.log("entitly: ",name);
	/*
	*/
	  var cEntity=EntityManager.getEntityByName(name).clone();
	  modalAttribute.setModal(cEntity,modal);
	  $("#myModal").modal();
});


$(document).on("click","#makeSchemaBtn",function(e){
	e.stopPropagation();
    e.preventDefault();
	$("#makeSchemaModal").modal();
});



$("#erdSaveBtn").on("click",function(e){
	e.stopPropagation();
    e.preventDefault();
    var currentSchemaName = document.getElementById("currentSchemaName").innerText;
    SchemaManager.SetNewSchema(currentSchemaName);
	SaveAndLoad.saveToJson();
});

$("#genJpaBtn").on("click",function(e){
	e.stopPropagation();
    e.preventDefault();
    classManager.delclassInfo();
     var cf = new classifier();
	 var attrNodes = attrNodeManager.getAllNode();
	 var key= Object.keys(attrNodes);
	 console.log("key:",key);
	 var arr = [];
	  key.forEach(function(val){
		  console.log("attrNodesVal:",attrNodes[val]);
		if(attrNodes[val].entity!=undefined){
			
			arr.push(attrNodes[val]);
		}
		
	 }); 
	  
	  console.log("arr:",arr);
	  
	 arr.forEach(function(at){
		 cf.classClassify(at);
		 
	 });
	 console.log("새로운 노드 들어갔니? :",arr);
	 
	 cf.active();
	var jg = new jpaGen();
	jg.generate();	
	$("#jpaModal").modal();
});
$("#genVoBtn").on("click",function(e){
	e.stopPropagation();
    e.preventDefault();
	var vg = new voGen();
	vg.generate();
	$("#voModal").modal();
});




</script>




