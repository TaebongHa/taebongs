
var modal=(function(){
$("body").append(
"<div class='modal fade' id='myModal' role='dialog'>"+
 "   <div class='modal-dialog modal-lg'>"+
   "   <div class='modal-content'>"+
    "    <div class='modal-header'>"+
      "    <h4 class='modal-title'>애트리뷰트 속성</h4>"+
     "   </div>"+
      "  <div class='modal-body'>"+
      "      <div class='modalSideBar'>"+
       "             <div class='attrMenu' tabindex='-1'>"+
        "                    컬럼속성"+
         "           </div>"+
         "   </div>"+
         "   <div class='contents'>"+
         "   </div>"+
       " </div>"+
       " <div class='modal-footer'>"+
       "   <button id='saveBtn' type='button' class='btn btn-info'>Save</button>"+
        "  <button type='button' class='btn btn-info' data-dismiss='modal'>Close</button>"+
       " </div>"+
      " </div>"+
    " </div>"+
  "</div>");
	
 function setViewPort(str){
	 $(".contents").html(str);
 }
 
return{setViewPort:setViewPort};
})();