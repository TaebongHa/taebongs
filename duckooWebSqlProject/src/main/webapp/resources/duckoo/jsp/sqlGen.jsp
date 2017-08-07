<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">

<script id="attributeMySQL" type="text/x-handlebars-template"> <div> {{pName}} {{#genMySQLType domainName datetype datelength}}{{/genMySQLType}} {{#isNotNull isPk notNull}}{{/isNotNull}} {{#if autoIncrement}}AUTO_IMCREMENT{{/if}} {{#genMysqlEXP defaultExp}}{{/genMysqlEXP}} </div></script>
 <script id="mysqlCreateDDL" type="text/x-handlebars-template">
<div>  
<font color="blue">create table</font> {{name}}(  
  {{#genMySqlAttribute this}}{{/genMySqlAttribute}}
);
</div> 

<div> 
<font color="blue"> ALTER TABLE </font>  {{name}}
<font color="#880055"> ADD </font> <font color="blue"> CONSTRAINT</font>  PK_{{name}} <font color="blue"> PRIMARY KEY </font> {{#getPk this}}{{/getPk}}
</div>

<div>  
{{#genFK this}}{{/genFK}}
</div> 
</script>




<script id="attributeOracle" type="text/x-handlebars-template"> <div> {{pName}} {{#genOracleType domainName datetype datelength}}{{/genOracleType}} {{#isNotNull isPk notNull}}{{/isNotNull}}{{#genOracleEXP defaultExp}}{{/genOracleEXP}} </div></script>
 <script id="oracleCreateDDL" type="text/x-handlebars-template">
<div> 
create table {{name}} (  
  {{#genOracleAttribute this}}{{/genOracleAttribute}} 
);
</div>

<div>
ALTER TABLE {{name}}
ADD CONSTRAINT PK_{{name}} PRIMARY KEY {{#getPk this}}{{/getPk}}
</div>

<div>
{{#genFK this}}{{/genFK}}
</div>
</script>



 
<script type="text/javascript" src="/resources/duckoo/js/sql/commonSql/CommonSql.js?<%=request.getParameter("token")%>"></script>
<script type="text/javascript" src="/resources/duckoo/js/sql/mysql/GenMysqlSql.js?<%=request.getParameter("token")%>"></script>
<script type="text/javascript" src="/resources/duckoo/js/sql/oracle/GenOracleSql.js?<%=request.getParameter("token")%>"></script>
<script type="text/javascript" src="/resources/duckoo/js/sql/sqlFactory.js?<%=request.getParameter("token")%>"></script>

<!-- Modal -->
  <div class="modal fade" id="sqlSelectModal" role="dialog">
    <div class="modal-dialog modal-sm">
      <div class="modal-content">
        <div class="modal-header">
          <button type="button" class="close" data-dismiss="modal">&times;</button>
          <h4 class="modal-title">SQL 선택</h4>
        </div>
        <div class="modal-sqlbody">
        <div align="center">
          <button class="makeSQLBtn" data-val="oracle">ORACLE</button>
          <button class="makeSQLBtn" data-val="mysql">MYSQL</button>
        </div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
        </div>
      </div>
    </div>
 </div>


<div class="modal fade" id="sqlQueryModal" role="dialog" style="width:100%; height:100%;">
    <div class="modal-dialog modal-lg">
      <div class="modal-content">
        <div class="modal-header">
          <button type="button" class="close" data-dismiss="modal">&times;</button>
          <h4 class="modal-title">Create Query</h4>
        </div>
        <div class="modal-body" style="height:400px;">
			<div id="queryDiv" style="overflow:auto; height:100%;">
			</div>
        </div>
        <div class="modal-footer">
          <button id="closeSqlQueryBtn" type="button" class="btn btn-danger">Close</button>
        </div>
      </div>
    </div>
  </div>

<script type="text/javascript">
SqlFactory.add(GenMysqlSql);
SqlFactory.add(GenOracleSql);


var $document =$document ||$(document);
var $sqlSelectModal=$("#sqlSelectModal");
var $makeSQLBtn = $(".makeSQLBtn");
var $sqlQueryModal = $("#sqlQueryModal");
var $queryDiv = $("#queryDiv");

$document.on("click","#genTest",function(e){
	$sqlSelectModal.modal();
});

$makeSQLBtn.on("click",function(e){
	e.stopPropagation();
	e.preventDefault();
	var entityArr= EntityManager.getEntityByName();
	var key= Object.keys(entityArr);
	var selDB= $(this).attr("data-val");
	var genSql=SqlFactory.get(""+selDB);
	var sqls="";
	for(var i=0,len=key.length;i<len;i++){
		   var sql = genSql.genCreateTableDDL(entityArr[key[i]]);
			  sqls+=sql+"\n";
	}
	$sqlSelectModal.modal("hide");
	$queryDiv.html(sqls);
	$sqlQueryModal.modal();
});
$("#closeSqlQueryBtn").on("click",function(e){
	e.stopPropagation();
	e.preventDefault();
	$queryDiv.empty();
	$sqlQueryModal.modal("hide");
});

</script>
