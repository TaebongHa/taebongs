<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ page import="java.util.Random" %>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta name="google-site-verification" content="AoPPBP2WJZGi56B7Tw5LC9kcl8FVCzfbX5qfG7zCDfI" />
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<meta name = "google-signin-client_id"content = "271929324186-nb92pvj0v2cdv4cr7chvt84nvu6q2t4o.apps.googleusercontent.com">
<title>erd main</title>
<% Random random = new Random(); 
    int token= random.nextInt();
%> 		 		
<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css">
    <link rel="stylesheet" href="//code.jquery.com/ui/1.12.1/themes/base/jquery-ui.css">
    <link rel="stylesheet" href="/resources/font-awesome-4.7.0/css/font-awesome.min.css">
    <link rel="stylesheet" href="/resources/duckoo/css/mainModal.css">
    <link rel="stylesheet" href="/resources/duckoo/css/loading.css">
    <link rel="stylesheet" href="/resources/duckoo/css/selectPage.css?<%=token%>">
<script
  src="https://code.jquery.com/jquery-3.2.1.min.js"
  integrity="sha256-hwg4gsxgFZhOsEEamdOYGBf13FyQuiTwlAQgxVSNgt4="
  crossorigin="anonymous"></script>
<script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/jsPlumb/1.7.2/jquery.jsPlumb.js"></script>
<script src="https://code.jquery.com/ui/1.12.1/jquery-ui.min.js"
		integrity="sha256-VazP97ZCwtekAsvgPBSUwPFKdrwD3unUfSGVYrahUqU="
		crossorigin="anonymous"></script>
<script type="text/javascript" src="/resources/duckoo/js/duckooPlumb.js?<%=token%>"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/jquery.nicescroll/3.7.3/jquery.nicescroll.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/jquery.nicescroll/3.7.3/jquery.nicescroll.js"></script> 
 <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/handlebars.js/4.0.8/handlebars.js"></script>
<script type="text/javascript" src="/resources/duckoo/js/Observer.js?<%=token%>"></script>
<script type="text/javascript" src="/resources/duckoo/js/view/dView.js?<%=token%>"></script>
<script type="text/javascript" src="/resources/duckoo/js/saveAndLoad/SaveAndLoad.js?<%=token%>"></script>
<script type="text/javascript" src="/resources/duckoo/js/util/Count.js?<%=token%>"></script>
<script type="text/javascript" src="/resources/duckoo/js/util/MyArrayUtil.js?<%=token%>"></script>
<script type="text/javascript" src="/resources/duckoo/js/schema/SchemaManager.js?<%=token%>"></script>

</head>

<body class="canvas" id="canvasDiv" style="width: 6000px; height: 6000px; border: 1px solid black;">
	<div id="preloader" style="display: block;"> 
    	<div id="loader" style="display: block;"></div>
   </div>
   <div id="selectPageBody">
   		<div id="selectPageBox">
        	<button class="selecPageBtns" id="newERDBtn">NEW ERD</button>
        	<button class="selecPageBtns" id="prevERDBtn">PREV ERD</button>
    	</div>
   </div>
<jsp:include page="/resources/duckoo/jsp/entity.jsp">
<jsp:param name="token" value="<%=token%>" />
</jsp:include> 

<jsp:include page="/resources/duckoo/jsp/modalAttribute.jsp">
<jsp:param name="token" value="<%=token%>" />
</jsp:include> 

<jsp:include page="/resources/duckoo/jsp/menu.jsp">
<jsp:param name="token" value="<%=token%>" />
</jsp:include> 


<jsp:include page="/resources/duckoo/jsp/RelationModal.jsp">
<jsp:param name="token" value="<%=token%>" />
</jsp:include> 

<jsp:include page="/resources/duckoo/jsp/sqlGen.jsp">
<jsp:param name="token" value="<%=token%>" />
</jsp:include>

<script type="text/javascript" src="/resources/duckoo/js/JpaCon/emClass.js?<%=token%>"></script>
<script type="text/javascript" src="/resources/duckoo/js/JpaCon/codeUtils.js?<%=token%>"></script>
<script type="text/javascript" src="/resources/duckoo/js/JpaCon/property.js?<%=token%>"></script>
<script type="text/javascript" src="/resources/duckoo/js/JpaCon/PropMaker.js?<%=token%>"></script>
<script type="text/javascript" src="/resources/duckoo/js/JpaCon/classInfo.js?<%=token%>"></script>
<script type="text/javascript" src="/resources/duckoo/js/JpaCon/classManager.js?<%=token%>"></script>
<script type="text/javascript" src="/resources/duckoo/js/JpaCon/scanner.js?<%=token%>"></script>
<script type="text/javascript" src="/resources/duckoo/js/JpaCon/classInfoMaker.js?<%=token%>"></script>
<script type="text/javascript" src="/resources/duckoo/js/JpaCon/classifier.js?<%=token%>"></script>

<script type="text/javascript" src="/resources/duckoo/js/jpaDomain/Maps.js?<%=token%>"></script>

<jsp:include page="/resources/duckoo/jsp/jpaModal.jsp">
<jsp:param name="token" value="<%=token%>" />
</jsp:include>

<jsp:include page="/resources/duckoo/jsp/voModal.jsp">
<jsp:param name="token" value="<%=token%>" />
</jsp:include>

<jsp:include page="/resources/duckoo/jsp/makeSchemaModal.jsp">
<jsp:param name="token" value="<%=token%>" />
</jsp:include>  

<script type="text/javascript" src="/resources/duckoo/js/EntityControll.js?<%=token%>"></script>
<script type="text/javascript" src="/resources/duckoo/newSchema/newschema.js?<%=token%>"></script>

<script>
$(window).on("load",function() {
	   
    // will first fade out the loading animation 
  	$("#loader").fadeOut("slow", function(){

      // will fade out the whole DIV that covers the website.
      $("#preloader").delay(300).fadeOut("slow");

    });       

});	


jsPlumb.ready(function() {
	 setInterval(function(){
		jsPlumb.repaintEverything();
	},1000/20);
	
	  $.ajax({
		  url : '/rest/getErdPageJSON'
       , method : "POST"
		, processData : true 
		,  contentType:"application/x-www-form-urlencoded; charset=UTF-8"
		, datatype: 'json'  
		, success : function(data) {
			
		  for(var i=0,len=data.length;i<len;i++){
			 var sub= data[i];
			 if(sub[0]!=="{"){
				 sub= data[i].substring(1);
			 }
			 
			 //이렇게하니까 된다.. 왜그런지는 모름...
			 
			 
			var schema=JSON.parse(sub);
			var jObj= SchemaManager.set(schema);
		  }
		  // SaveAndLoad.saveToJson();
		}
		
	    , error : function(xhr, stat, err) {
	    	alert("error");
	    	console.log(err);
	    }
	});
	
	  
	  
	
	
});
	
</script>
   
  </body>
</html>