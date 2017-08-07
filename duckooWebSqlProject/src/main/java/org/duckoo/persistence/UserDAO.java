package org.duckoo.persistence;

import org.duckoo.domain.UserVO;

public interface UserDAO {
	
	public void create(UserVO vo);
	public void delete(int bno);
	public UserVO read(String userid);
}
