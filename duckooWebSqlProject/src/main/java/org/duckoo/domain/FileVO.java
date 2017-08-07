package org.duckoo.domain;

import java.sql.Timestamp;

public class FileVO {
	
	private int fno;
	private String fschema;
	private String fsrc;
	private String userid;
	private Timestamp updatedate;
	public int getFno() {
		return fno;
	}
	public void setFno(int fno) {
		this.fno = fno;
	}
	public String getFschema() {
		return fschema;
	}
	public void setFschema(String fschema) {
		this.fschema = fschema;
	}
	public String getFsrc() {
		return fsrc;
	}
	public void setFsrc(String fsrc) {
		this.fsrc = fsrc;
	}
	public String getUserid() {
		return userid;
	}
	public void setUserid(String userid) {
		this.userid = userid;
	}
	public Timestamp getUpdatedate() {
		return updatedate;
	}
	public void setUpdatedate(Timestamp updatedate) {
		this.updatedate = updatedate;
	}
	@Override
	public String toString() {
		return "FileVO [fno=" + fno + ", fschema=" + fschema + ", fsrc=" + fsrc + ", userid=" + userid + ", updatedate="
				+ updatedate + "]";
	}
	
	
}
