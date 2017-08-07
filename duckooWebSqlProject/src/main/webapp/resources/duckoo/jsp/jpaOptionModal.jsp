<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>

<div class="modal fade" id="jpa_opt" role="dialog" >
    <div class="modal-dialog modal-sm">
      <div class="modal-content">
        <div class="modal-header">
          <button type="button" class="close" data-dismiss="modal">&times;</button>
          <h4 class="modal-stitle">jpa 코드생성 옵션..</h4>
        </div>
        <div class="modal-sbody">
        <p>양방향 옵션은 매핑 테이블이 필요할 수 있으며 </p>
         <select id="sourceCol">
        		<option selected="selected" value="oneSide">단방향</option>
        		<option value="bothSide">양방향</option>
        	</select>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-danger" data-dismiss="modal">Close</button>
          <button type="button"  id="startGen" class ="btn btn-success">conform</button>
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
$("#jpa_opt").modal();

</script>