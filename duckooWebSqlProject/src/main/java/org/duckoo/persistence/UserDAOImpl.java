package org.duckoo.persistence;

import javax.inject.Inject;

import org.mybatis.spring.SqlSessionTemplate;
import org.duckoo.domain.UserVO;
import org.springframework.stereotype.Repository;
import org.springframework.test.context.ContextConfiguration;

@Repository
@ContextConfiguration(locations = { "file:src/main/webapp/WEB-INF/spring/**/root-context.xml" })
public class UserDAOImpl implements UserDAO {
	
	private static final String namespace = "org.duckoo.persistence.UserDAO";
	
	@Inject
	SqlSessionTemplate sst;
	
	@Override
	public void create(UserVO vo) {
		sst.insert(namespace+".create",vo);
		
	}

	@Override
	public void delete(int bno) {
		// TODO Auto-generated method stub
		
	}

	@Override
	public UserVO read(String userid) {
		return sst.selectOne(namespace+".read",userid);
		
	}

}
