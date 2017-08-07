package org.duckoo.domain;

import java.sql.Timestamp;

public class UserVO {
	private String userid;
	private String username;
	private Timestamp regdate;
	public String getUserid() {
		return userid;
	}
	public void setUserid(String userid) {
		this.userid = userid;
	}
	public String getUsername() {
		return username;
	}
	public void setUsername(String username) {
		this.username = username;
	}
	public Timestamp getRegdate() {
		return regdate;
	}
	public void setRegdate(Timestamp regdate) {
		this.regdate = regdate;
	}
	@Override
	public String toString() {
		return "UserVO [userid=" + userid + ", username=" + username + ", regdate=" + regdate + "]";
	}
	
	
	
}
