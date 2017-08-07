<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!-- Modal -->
  <div class="modal fade" id="confrimModal" role="dialog">
    <div class="modal-dialog confirmModal" style="width:500px; height:60px;">
      <div class="modal-content">
        <div class="modal-header">
          <button type="button" class="close" data-dismiss="modal">&times;</button>
          <h4 class="modal-title">컬럼삭제확인</h4>
        </div>
        <div class="cmodal-body" style="width:100%">
          <p>관계와 복합외래키가 모두 삭제됩니다. 삭제하시겠습니까?</p>
        </div>
        <div class="modal-footer">
          <button type="button" id="confirmYes" class="btn btn-success" data-dismiss="modal">예</button>
          <button type="button" id="confirmNo" class="btn btn-default" data-dismiss="modal">아니오</button>
        </div>
      </div>
    </div>
  </div>