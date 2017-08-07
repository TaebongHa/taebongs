<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<div class="modal fade" id="makeSchemaModal" role="dialog">
    <div class="modal-dialog modal-sm">
      <div class="modal-content">
        <div class="modal-header">
          <button type="button" class="close" data-dismiss="modal">&times;</button>
          <h4 class="modal-title">스키마 생성</h4>
        </div>
        <div class="modal-sbody">
          <div style="margin-left:30px;">스키마 이름
          <input id="schemaName" type='text' style="width:100px; border-top-style:solid;border-top-color:#c8c8c8; border-left-style:solid;border-left-color:#c8c8c8;"></input>
                    
          </div>
        </div>
        <div class="modal-footer">
          <button id="makeSchemaFinalBtn" type="button" class="btn btn-success">Save</button>
          <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
        </div>
      </div>
    </div>
</div>


<script>
$("#makeSchemaFinalBtn").on("click",function(e){
	e.stopPropagation();
	e.preventDefault();
	var newSchemaName = document.getElementById("schemaName").value;
	Newschema.delCurrentAllInfo();
	var currentSchemaName = document.getElementById("currentSchemaName");
	currentSchemaName.innerText=newSchemaName;
	SchemaManager.SetNewSchema(newSchemaName);
	$("#makeSchemaModal").modal("hide");
});



</script>