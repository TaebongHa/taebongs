<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ page import="java.util.Random" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<% Random random = new Random(); 
    int token= random.nextInt();
%> 	
<link rel="stylesheet" href="/resources/duckoo/css/addAttrModal.css?<%=token%>">
 <!-- Modal -->
  <div class="modal fade" id="addAttrModalWindow" role="dialog">
    <div class="modal-dialog modal-sm" style="width:40%;">
      <div class="modal-content">
        <div class="modal-header">
          <button type="button" class="close" data-dismiss="modal">&times;</button>
          <h4 class="modal-title"> 새 컬럼</h4>
        </div>
        <div class="modal-attrBody" id="asdfasdfasdf">	
                <div class='addRow'>
                    <div class="ctitle">키타입</div>
                    <div class="ccontent">
                        <select id="keyType" class="teststtstst">
                            <option data-pk="true" data-fk="false"  value="PK">PK</option>
                            <option data-pk="false" data-fk="false"  value="None">None</option>    
                        </select>
                    </div>
                </div>
             
                <div class='addRow'>
                    <div class="ctitle">논리이름</div>
                    <div class="ccontent">
                        <input id="lName" type='text' style="width:100px; border-top-style:solid;border-top-color:#c8c8c8; border-left-style:solid;border-left-color:#c8c8c8;"></input>
                    </div>
                </div>
             
                <div class='addRow'>
                    <div class="ctitle">물리이름</div>
                    <div class="ccontent">
                        <input id="pName" type='text' style="width:100px; border-top-style:solid;border-top-color:#c8c8c8; border-left-style:solid;border-left-color:#c8c8c8;"></input>
                    </div>
                </div>
             
                <div class='addRow'>
                    <div class="ctitle">데이터타입</div>
                    <div class="ccontent">
                         <select id="datetype">
                              <option value=""></option>
                              <option value="int">int</option>
                              <option value="varchar">varchar</option>
                              <option value="text">text</option>
                              <option value="binary">binary</option>
                              <option value="varbinary">varbinary</option>
                              <option value="blob">blob</option>
                              <option value="date">date</option>
                              <option value="datetime">datetime</option>
                              <option value="timestamp">timestamp</option>
                         </select>	 
                    </div>
                    <div class="ctitle" style="margin-left:15px;">데이터길이</div>
                    <div class="ccontent">
               			 <input id="datelength" type='text' style="width:100px; border-top-style:solid;border-top-color:#c8c8c8; border-left-style:solid;border-left-color:#c8c8c8;"></input>         
                    </div>   
                </div>
                
         
                <div class='addRow'>
                    <div class="ctitle">기본값</div>
                    <div class="ccontent">
                        <input id="defaultVal" type='text' style='width:100px; border-top-style:solid;border-top-color:#c8c8c8; border-left-style:solid;border-left-color:#c8c8c8;'></input>
                    </div>
                </div>
           
                <div class='addRow'>
                    <div class="ctitle">제약조건</div>
                    <div class="ccontent">
                        <input id="notNull" type='checkbox' name='Not Null' value='Not Null'>Not Null</input>
                        <input id="autoIncre" type='checkbox' name='Autoincrement' value='Autoincrement'>Autoincrement</input>
                        <input id="uniqueVal" type='checkbox' name='Unique' value='Unique'>Unique</input>
                    </div>
                </div>
            
        </div>
        <div class="modal-footer">
          <button type="button" id="addAttrFinalBtn" class="btn btn-success">Add</button>
          <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
        </div>
      </div>
    </div>
  </div>