<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ page import="java.util.Random" %>
<% Random random = new Random(); 
    int token= random.nextInt();
%> 	

<div class="modal fade" id="voModal" role="dialog" style="width:100%; height:100%;">
    <div class="modal-dialog modal-lg">
      <div class="modal-content">
        <div class="modal-header">
          <button type="button" class="close" data-dismiss="modal">&times;</button>
          <h4 class="modal-title">VO Codes</h4>
        </div>
        <div class="modal-body">
        	<ul id="voCodeTab" class="nav nav-tabs">  				 

    	
  			</ul>
          	
          	<div id="voClassText" class="tab-content" style="width:100%; height:inherit; float:left; overflow:auto;">			
			
			
			
			</div>
        </div>
        <div class="modal-footer">
          <button id="voCodeDivCloseBtn" type="button" class="btn btn-danger">Close</button>
        </div>
      </div>
    </div>
  </div>
 
<script id="inTab" type="text/x-handlebars-template">
<div class="tab-pane fade" id="{{className}}" style="width:100%; font-weight: bold;">
    <div style="width:auto; float:left; color:#880055;">public class</div><div style="margin-left:3px; width:auto; float:left; color:#040000;"> {{className}} {</div>
    <br>
    <div id="columns_{{className}}">
	
	</div>
    
    <br>
    <div style="width:auto; float:left;"></div><div style="margin-left:3px; width:auto; float:left; color:#040000;">}</div>
</div>
</script>

<script id="voCodeTitle" type="text/x-handlebars-template">
	<li><a data-toggle="tab" href="{{className}}">{{className}}</a></li>
</script>

<script id="voColumnVal" type="text/x-handlebars-template">
	<br>
	<div style="float:left; color:#880055;">private </div>
	
	<div style="margin-left:5px; float:left; color:#040000;">{{dataType}} </div><div style="margin-left:5px; color:#2C03F5; float:left;">{{pName}}</div><div style="float:left; color:#040000;">;</div>
</script>

<script id="voGetSet" type="text/x-handlebars-template">
	<br>
	<div style="float:left; color:#880055;">public </div>
	<div style="margin-left:5px; float:left; color:#040000;">{{dataType}} </div>
	<div style="margin-left:5px; color:#040000; float:left;">get{{upperPName}}(){</div>
	<br>
	<div style="margin-left:20px; color:#880055; float:left;">return </div><div style="margin-left:5px; color:#2C03F5; float:left;">{{pName}}</div><div style="float:left; color:#040000;">;</div>
	<br>
	<div style="float:left; color:#040000;">}</div>

	<br>
	<div style="float:left; color:#880055;">public void </div>
	<div style="margin-left:5px; color:#040000; float:left;">set{{upperPName}}(</div>
    <div style="float:left; color:#040000;">{{dataType}} </div>
	<div style="margin-left:5px; color:#613536; float:left;">{{pName}}</div>
	<div style="float:left; color:#040000;">){</div>
	<br>
	<div style="margin-left:20px; color:#880055; float:left;">this.</div><div style="color:#2C03F5; float:left;">{{pName}}</div>
	<div style="margin-left:5px; float:left; color:#040000;"> = </div>
	<div style="margin-left:5px; color:#613536; float:left;">{{pName}}</div>
	<div style="float:left; color:#040000;">;</div>
	<br>
	<div style="float:left; color:#040000;">}</div>

</script>

<script>

$("#voCodeDivCloseBtn").on("click",function(e){
	e.stopPropagation();
    e.preventDefault();
    $("#voClassText").empty();
    $("#voCodeTab").empty();
    classManager.delclassInfo();
    $("#voModal").modal("hide");
});


</script>


<script type="text/javascript" src="/resources/duckoo/js/vo/vo.js?<%=token %>"></script>

