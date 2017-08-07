package org.duckoo.interceptor;

import java.util.HashMap;
import java.util.Map;

import javax.inject.Inject;
import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.duckoo.domain.UserVO;
import org.duckoo.service.ServiceDAO;
import org.duckoo.service.ServiceDAOImpl;
import org.springframework.web.servlet.ModelAndView;
import org.springframework.web.servlet.handler.HandlerInterceptorAdapter;

public class LoginInterceptor extends HandlerInterceptorAdapter {
	
	@Inject
	ServiceDAO service;
	
	
	private static final String LOGIN = "login";

	@Override
	public void postHandle(HttpServletRequest request, HttpServletResponse response, Object handler,
			ModelAndView modelAndView) throws Exception {
		HttpSession session = request.getSession();
		Cookie[] cookies = request.getCookies();
		Map<String,String> cookieList = new HashMap<>();
		if(cookies==null){
				
		}else{
			
			for(int i=0; i<cookies.length; i++){
				cookieList.put(cookies[i].getName(), cookies[i].getValue());
			}
			
			if(cookieList.get("username")==null){
				
			}else{
				
				session.setAttribute(LOGIN, cookies);
				
				UserVO userCheckVO=service.read(cookieList.get("userid"));
			
				if(userCheckVO==null){
					
					UserVO vo = new UserVO();
					vo.setUserid(cookieList.get("userid"));
					vo.setUsername(cookieList.get("username"));
					System.out.println(vo.getUserid()+":"+vo.getUsername());
					
					service.registerUser(vo);
					
					System.out.println("쿠키생성&회원정보저장");
				}else{
					
				}
				
/*				Object dest = session.getAttribute("dest");
				System.out.println("dest: "+(String)dest);
				if(dest!=null){
					response.sendRedirect((String)dest);
				}*/
			}
			
		}
		
	    
	}

	@Override
	public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler)
			throws Exception {
		
		HttpSession session = request.getSession();
		
		if(session.getAttribute(LOGIN)!=null){
			session.removeAttribute(LOGIN);
		}
		return true;
	}
	
	
}
