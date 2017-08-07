<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ page import="java.util.Random" %>
<%@ page import="java.util.HashMap" %>
<%@ page import="java.util.Map" %>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta name="google-site-verification" content="AoPPBP2WJZGi56B7Tw5LC9kcl8FVCzfbX5qfG7zCDfI" />
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<meta name = "google-signin-client_id"content = "271929324186-nb92pvj0v2cdv4cr7chvt84nvu6q2t4o.apps.googleusercontent.com">
<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1">
<meta name="description" content="">  
<meta name="author" content="">
<title>Web ERD Main</title>
<% Random random = new Random(); 
    int token= random.nextInt();
%>
<%Cookie[] cookies = (Cookie[])session.getAttribute("login");
 	Map<String,String> cookieList = new HashMap<String,String>();
 	if(cookies==null){
 		cookieList.put("username",null);
 	} else{
 		for(int i =0; i<cookies.length; i++){
 				cookieList.put(cookies[i].getName(),cookies[i].getValue());
 		}
 	}
 	pageContext.setAttribute("username",cookieList.get("username"));
 %> 	
<script
  src="https://code.jquery.com/jquery-3.2.1.min.js"
  integrity="sha256-hwg4gsxgFZhOsEEamdOYGBf13FyQuiTwlAQgxVSNgt4="
  crossorigin="anonymous"></script>
<link rel="stylesheet" href="/resources/font-awesome-4.7.0/css/font-awesome.min.css">
<script src="https://cdn.jsdelivr.net/semantic-ui/2.2.10/semantic.min.js"></script>
<script src="https://apis.google.com/js/platform.js" async defer></script>
    <link rel="stylesheet" href="/resources/mains/css/base.css">  
    <link rel="stylesheet" href="/resources/mains/css/main.css">
    <link rel="stylesheet" href="/resources/mains/css/vendor.css">     
	<script src="/resources/mains/js/modernizr.js"></script>
<script src="https://apis.google.com/js/platform.js?onload=onLoad" async defer></script>
    <link rel="icon" type="image/png" href="favicon.png">
</head>

<body>
    <header class="mainHeader">

   	<div class="row">

   		<div class="logo">
	         <a href="#">Lhander</a>
	      </div>

	   	<nav id="main-nav-wrap">
				<ul class="main-navigation">
					<li class="current"><a class="smoothscroll" href="#intro" title="">Home</a></li>
					<li><a class="smoothscroll" href="/sql/testTaebong" title="">ERD page</a></li>
					<li><a class="smoothscroll" href="#features" title="">NONE</a></li>
					<li><a class="smoothscroll" href="/board/list" title="">Q&A</a></li>
					<li><a class="smoothscroll" href="/board/faq" title="">FAQ</a></li>
					<c:set var="username" value='<%=cookieList.get("username") %>'></c:set>
					<c:choose>
						<c:when test="${username == null}">
							<li class="highlight with-sep"><a id="customBtn" class="g-signin2"  data-onsuccess="onSignIn">LOGIN</a></li>
						</c:when>
						<c:otherwise>
							<li class="highlight with-sep"><a href="#"><%=cookieList.get("username") %> 님</a></li>
							<li><a class="smoothscroll" href="#logout" title="">LOGOUT</a></li>		
						</c:otherwise>
					</c:choose>					
										
				</ul>
			</nav>

			<a class="menu-toggle" href="#"><span>Menu</span></a>
   		
   	</div>   	
   	
   </header>

    <section id="intro">

   	<div class="shadow-overlay"></div>

   	<div class="intro-content">
   		<div class="row">

   			<div class="col-twelve">


	   			<h5>Hello welcome to duckoo ERD.</h5>
	   			<h1>ERD는 밥찌끄레기</h1>
                <a class="button stroke smoothscroll" href="#process" title="">START!</a>
	   		</div>  
   			
   		</div>   		 		
   	</div> 

   </section>
   <div style="display:none">
		<form id="garaForm" method="get" action="/main/index"></form>
   </div>
	<div id="preloader" style="display: block;"> 
    	<div id="loader" style="display: block;"></div>
   </div>
   
	<script src="/resources/mains/js/main.js?name=<%=token %>"></script>
</html>