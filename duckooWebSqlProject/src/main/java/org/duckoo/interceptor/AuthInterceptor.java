package org.duckoo.interceptor;

import java.util.HashMap;
import java.util.Map;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.springframework.web.servlet.handler.HandlerInterceptorAdapter;

public class AuthInterceptor extends HandlerInterceptorAdapter {
	
	private void saveDest(HttpServletRequest request){
		String uri =request.getRequestURI();
		String query = request.getQueryString();
		
		if(query==null||query.equals("null")){
			query="";
		}else{
			query="?"+query;
		}
		
		if(request.getMethod().equals("GET")){
			request.getSession().setAttribute("dest", uri+query);
		}
	}
	
	
	@Override
	public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler)
			throws Exception {
		System.out.println("taebongPage");
		HttpSession session = request.getSession();
					
		if(session.getAttribute("login")==null){
			
			saveDest(request);
			System.out.println("sessionNull");
			response.sendRedirect("/main/index");
			return false;
		}else{
			Cookie[] cookie =(Cookie[]) session.getAttribute("login");
			
			Map<String,String> cookieList = new HashMap<>();
			if(cookie==null){
				saveDest(request);
				System.out.println("CookieNull");
				response.sendRedirect("/main/index");
				return false;
			} else{
				for(int i=0; i<cookie.length;i++){
					cookieList.put(cookie[i].getName(), cookie[i].getValue());
				}
				if(cookieList.get("username")==null){
					saveDest(request);
					System.out.println("usernameNull");
					response.sendRedirect("/main/index");
					return false;
				}
			}

		}
		return true;
	}
	
}
