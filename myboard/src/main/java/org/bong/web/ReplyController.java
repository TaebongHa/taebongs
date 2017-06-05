package org.bong.web;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.inject.Inject;

import org.apache.log4j.Logger;
import org.bong.domain.Criteria;
import org.bong.domain.Criteria2;
import org.bong.domain.PageMaker2;
import org.bong.domain.ReplyVO;
import org.bong.service.ServiceDAO;
import org.junit.runner.RunWith;
import org.springframework.stereotype.Controller;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
@RequestMapping("/reply")
@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration(locations = { "file:src/main/webapp/WEB-INF/spring/**/*-context.xml" })
public class ReplyController {
	private Logger logger = Logger.getLogger(ReplyController.class);
	@Inject
	ServiceDAO service;
	
	@GetMapping("/replyList")
	@ResponseBody
	public Map<String, Object> replyListGet(Criteria2 cri2){
		
		List<ReplyVO> replyList = service.getReplyList(cri2);
		Map<String, Object> maps = new HashMap<>();
		maps.put("replyList", replyList);
		PageMaker2 pageMaker2 = new PageMaker2();
		pageMaker2.setCri2(cri2);
		logger.info("replyList: "+replyList);
	    pageMaker2.setTotalCount(service.total(cri2.getBno()));
	    maps.put("page", pageMaker2);
	    maps.put("cri2", cri2);
		return maps;
	
	
	}
	@PostMapping("registerNew")
	@ResponseBody
	public void registerNew(ReplyVO rvo){
		logger.info("rvo뭐니????:"+rvo);
		service.registerNew(rvo);
	}
}