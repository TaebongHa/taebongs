<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>  
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>Insert title here</title>
<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css">
<link rel="stylesheet" href="//code.jquery.com/ui/1.12.1/themes/base/jquery-ui.css">
   <link rel="stylesheet" href="http://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css">
<style>
.modal-body{
position:relative;
display:inline-block;
width:100%;
height:400px;

}
.columns{
	width:100%;
	height:100%;
	display:block;
	float:left;
	position: relative;

}
.col{
	width:10%;
	height: 10%;

}
.side_tab{
	height:100%;
	width:20%;
	position: relative;
	text-align: center;
}
.general{
	tabindex:'-1';
}
.general:hover{
	background-color: #2ECCFA;
	-webkit-transform: scale(1.4, 1.4); /* Safari */
    transform: scale(1.4, 1.4);
}
.general:focus{
background-color: red;
}

</style>
</head>
<body>
<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script>
<script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js"></script>
  <script type="text/javascript" src="/resources/conjs/modalChange.js"></script>

  <!-- Modal -->
  <div class="modal fade" id="tbl_nameModal" role="dialog">
    <div class="modal-dialog modal-sm">
      <div class="modal-content">
        <div class="modal-header">
          <button type="button" class="close" data-dismiss="modal">&times;</button>
          <h4 class="modal-title">테이블 생성.</h4>
        </div>
        <div class="modal-body">
          <p>테이블 이름 입력.</p><input type="text" id="tbl_name"></input>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
        </div>
      </div>
    </div>
  </div>



<script>

</script>

</body>
</html>