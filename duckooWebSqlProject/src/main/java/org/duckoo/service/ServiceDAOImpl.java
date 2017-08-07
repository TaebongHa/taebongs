package org.duckoo.service;

import java.util.List;

import org.duckoo.domain.FileVO;
import org.duckoo.domain.UserVO;
import org.duckoo.persistence.FileDAO;
import org.duckoo.persistence.UserDAO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.test.context.ContextConfiguration;



@Service
@ContextConfiguration(locations = { "file:src/main/webapp/WEB-INF/spring/**/root-context.xml" })
public class ServiceDAOImpl implements ServiceDAO {
	
	@Autowired
	UserDAO userdao;
	
	@Autowired
	FileDAO filedao;
	
//start user
	@Override
	public void registerUser(UserVO uvo) {
		userdao.create(uvo);

	}


	@Override
	public UserVO read(String userid) {
		return userdao.read(userid);
	}
//end user
	
//start file 
	@Override
	public void registerFile(FileVO fvo) {
		filedao.create(fvo);
		
	}

	@Override
	public List<FileVO> fileList(String userid) {
		return filedao.fileList(userid);
	}
	
	@Override
	public FileVO readFile(int fno) {
		return filedao.read(fno);
	}
	@Override
	public void update(FileVO fvo) {
		filedao.update(fvo);
		
	}
//end file





}
