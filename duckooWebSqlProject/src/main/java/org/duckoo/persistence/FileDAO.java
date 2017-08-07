package org.duckoo.persistence;

import java.util.List;

import org.duckoo.domain.FileVO;

public interface FileDAO {
	
	
	public void create(FileVO fvo);
	public List<FileVO> fileList(String userid);
	public FileVO read(int fno);
	public void update(FileVO fvo);
}
