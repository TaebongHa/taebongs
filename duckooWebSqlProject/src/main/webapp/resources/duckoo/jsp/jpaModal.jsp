<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ page import="java.util.Random" %>
<% Random random = new Random(); 
    int token= random.nextInt();
%> 	

<div class="modal fade" id="jpaModal" role="dialog" style="width:100%; height:100%;">
    <div class="modal-dialog modal-lg">
      <div class="modal-content">
        <div class="modal-header">
          <button type="button" class="close" data-dismiss="modal">&times;</button>
          <h4 class="modal-title">Modal Header</h4>
        </div>
        <div class="modal-body">
        	<ul id="jpaCodeTab" class="nav nav-tabs">  				 

    	
  			</ul>
          	
          	<div id="javaClassText" class="tab-content" style="width:100%; height:inherit; float:left; overflow:auto;">
			
			
			
			
			</div>
        </div>
        <div class="modal-footer">
          <button id="javaCodeDivCloseBtn" type="button" class="btn btn-danger">Close</button>
        </div>
      </div>
    </div>
  </div>
 
  
<script id="javaClasss" type="text/x-handlebars-template">
<div class="tab-pane fade" id="{{className}}" style="width:100%; font-weight: bold;">
    <div style="width:auto; float:left; color:#880055;">import</div><div style="margin-left:3px; width:auto; float:left; color:#040000;"> java.util.*;</div>
    <br>
    <div style="width:auto; float:left; color:#880055;">import</div><div style="margin-left:3px; width:auto; float:left; color:#040000;"> javax.persistence.*;</div>
    <br>
	<br>
    <div id="annotations_{{className}}">
     
    </div>
    <div style="width:auto; float:left; color:#880055;">public class</div><div style="margin-left:3px; width:auto; float:left; color:#040000;"> {{className}} {</div>
    <br>
    <br>
    <div style="width:auto; float:left; color:#880055;">public </div><div style="margin-left:5px;  float:left; color:#040000;">{{className}}(){</div><div style="margin-left:3px; width:auto; float:left; color:#040000;">};</div>
    
    <div id="columns_{{className}}">
	
	</div>
    
    <br>
    <div style="width:auto; float:left;"></div><div style="margin-left:3px; width:auto; float:left; color:#040000;">}</div>
</div>
</script>
<script id="classAnnotations" type="text/x-handlebars-template">
	<div id="annotation_{{className}}_{{anotation}}" style="color:#63666B">@{{annotation}}</div>
</script>


<script id="columnDivs" type="text/x-handlebars-template">	
	<br>
    <div id="columnDiv_{{className}}_{{pName}}">
	</div>
</script>

<script id="annoColumn" type="text/x-handlebars-template">
<br>
<div style="color:#63666B; width:auto; float:left;">@{{propAnno}}</div><div style="color:#040000; float:left;">(name=</div><div style="color:#2C03F5; float:left;">"{{colName}}"</div><div style="color:#040000; float:left;">)</div>
</script>

<script id="annoId" type="text/x-handlebars-template">
{{#ifInteger dataType}}
<br>
<div style="color:#63666B; float:left; width:100%;">@{{propAnno}}</div>
<br>
<div style="color:#63666B; float:left; width:100%;">@GeneratedValue(strategy=GenerationType.IDENTITY)</div>
{{else}}
<br>
<div style="color:#63666B; float:left; width:100%;">@{{propAnno}}</div>
{{/ifInteger}}
</script>

<script id="annoOTM" type="text/x-handlebars-template">
<br>
<div style="color:#63666B; width:auto; float:left;">@{{propAnno}}</div><div style="color:#040000; float:left;">(mappedBy=</div><div style="color:#2C03F5; float:left;">"{{className}}"</div><div style="color:#040000; float:left;">)</div>
</script>

<script id="annoEBDID" type="text/x-handlebars-template">
<br>
<div style="color:#63666B; float:left; width:100%;">@{{propAnno}}</div>
</script>

<script id="annoMTO" type="text/x-handlebars-template">
<br>
<div style="color:#63666B; float:left; width:100%;">@{{propAnno}}</div>
</script>

<script id="annoJoinCol" type="text/x-handlebars-template">
<br>
<div style="color:#63666B; float:left; width:auto;">@{{propAnno}}</div><div style="color:#040000; float:left;">(name=</div><div style="color:#2C03F5; float:left;">"{{colName}}"</div><div style="color:#040000; float:left;">)</div>
</script>

<script id="annoJoinColumnStart" type="text/x-handlebars-template">
<br>
<div style="color:#63666B; float:left; width:100%;">@Joincolumns(</div>
</script>
<script id="annoJoinColumnEnd" type="text/x-handlebars-template">
<br>
<div style="color:#63666B; float:left; width:100%;">)</div>
</script>


<script id="columnVal" type="text/x-handlebars-template">
	<br>
	<div style="float:left; color:#880055;">private </div>
	
	<div style="margin-left:5px; float:left; color:#040000;">{{dataType}} </div><div style="margin-left:5px; color:#2C03F5; float:left;">{{pName}}</div><div style="float:left; color:#040000;">;</div>
</script>

<script id="jpaCodeTitle" type="text/x-handlebars-template">
	<li><a data-toggle="tab" href="{{className}}">{{className}}</a></li>
</script>

<script>

$("#javaCodeDivCloseBtn").on("click",function(e){
	e.stopPropagation();
    e.preventDefault();
    $("#javaClassText").empty();
    $("#jpaCodeTab").empty();
    classManager.delclassInfo();
    $("#jpaModal").modal("hide");
});


</script>


<script type="text/javascript" src="/resources/duckoo/js/jpa/jpaGen.js?<%=token %>"></script>

