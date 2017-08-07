package org.duckoo.web;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.io.InputStream;
import java.io.UnsupportedEncodingException;
import java.util.LinkedList;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;
import javax.inject.Inject;
import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.commons.io.IOUtils;
import org.duckoo.domain.FileVO;
import org.duckoo.service.ServiceDAO;
import org.duckoo.util.UploadFileUtill;
import org.json.JSONObject;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
@RestController
@RequestMapping("/rest")
public class RestCon {
	
	
	@Inject
	ServiceDAO service;
	
	@Resource(name="uploadPath")
    private	String uploadPath;
	
	@RequestMapping("setErdPageJSON")
    boolean setErdPageJSON(@RequestBody Map<String,Object> jsons,HttpServletRequest request) throws UnsupportedEncodingException{
		request.setCharacterEncoding("utf-8");
		Cookie[] cookies = request.getCookies();
		String userid = null;
		for(int i=0; i<cookies.length; i++){
			if(cookies[i].getName().equals("userid")){
				userid=cookies[i].getValue();
			};
		}
		System.out.println(jsons);
		for (Map.Entry<String, Object> entry : jsons.entrySet()) {
			String key   = entry.getKey();//schemaName
			Object value =  entry.getValue();//schemaJSON
			JSONObject js = new JSONObject(); //JacsonData
			js.put(key,value);
			System.out.println("json:: "+js);
			//byte[] jByte=js.toString().getBytes();
			UploadFileUtill ufu=new UploadFileUtill();
			try {
				List<String>  filePathAndName =ufu.uploadFile(uploadPath, key+".txt", js.toString());
				FileVO fvo =new FileVO();
				fvo.setFschema(key);
				fvo.setFsrc(filePathAndName.get(0));
				fvo.setUserid(userid);
				List<FileVO> fvoList = service.fileList(userid);
				System.out.println("fvoList"+fvoList);
				for(int i=0; i<fvoList.size(); i++){
					if(fvoList.get(i).getFschema().equals(key)){
						fvoList.get(i).setFsrc(filePathAndName.get(0));
						service.update(fvoList.get(i));
					}else {						
						service.registerFile(fvo);
					}
				}
				
				
				// s.get(0) === s.get(1) 
			} catch (Exception e) {
				System.out.println("FILE ERROR");
				e.printStackTrace();
			}
	    }
		return true;
	}
	
	//@RequestMapping(value="getErdPageJSON",produces="application/text; charset=utf8")
	@RequestMapping(value="getErdPageJSON",produces="application/json; charset=utf8")
	List<String> getErdPageJSON(HttpServletResponse response,HttpServletRequest request) throws IOException{
		request.setCharacterEncoding("utf-8");
		Cookie[] cookies = request.getCookies();
		String userid = null;
		for(int i=0; i<cookies.length; i++){
			if(cookies[i].getName().equals("userid")){
				userid=cookies[i].getValue();
			};
		}
		List<String> src=new LinkedList<>();
		List<String> ret= new LinkedList<>();
		//bring the path from DB
		List<FileVO> fvo = service.fileList(userid);
		System.out.println("fvo:"+fvo);
		for(int i=0; i<fvo.size(); i++){
			src.add(fvo.get(i).getFsrc());
		}
		
	   for(int i=0,len = src.size();i<len;i++){
		    File file=new File(src.get(i));
			InputStream  in=null;
			try {	
				in= new FileInputStream(file);
				String str = IOUtils.toString(in,"utf-8");
//				if(str.startsWith("\uFEFF")){
//					str=str.substring(1);
//				}
				ret.add(str);
			} catch (FileNotFoundException e) {
				e.printStackTrace();
			}finally{
				  in.close();
			}
	   }
	    
		return ret;
	 }
	
}
