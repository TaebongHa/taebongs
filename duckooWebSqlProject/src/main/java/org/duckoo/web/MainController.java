package org.duckoo.web;


import javax.servlet.http.Cookie;
import javax.servlet.http.HttpSession;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("/main")
public class MainController {
	
	@GetMapping("/index")
	public void getIndex1(){
		
	}
	@PostMapping("/index")
	public void getIndex(){
		
	}
	
	
}
