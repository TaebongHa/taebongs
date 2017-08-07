package org.duckoo.service;

import java.util.List;

import org.duckoo.domain.FileVO;
import org.duckoo.domain.UserVO;

public interface ServiceDAO {

	//start user
	public void registerUser(UserVO uvo);
	public UserVO read(String userid);
	//end user
	
	//start File
	public void registerFile(FileVO fvo);
	public List<FileVO> fileList(String userid);
	public FileVO readFile(int fno);
	public void update(FileVO fvo);
	//end  file

}
