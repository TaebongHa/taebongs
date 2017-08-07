var CommonSql=(function(){
	function arrToComaString(arr){ 
		var str="(" +arr[0];
		for(var i=1,len = arr.length;i<len ;i++){
			str+=","+arr[i];
		}
		str+=")";
	 return str; 
	}
	
	function dropTable(entity){
		var pkId= entity.search({isPk:true})[0].id;
	    var entityNames=[];
       var sql="";    
	    entityNames.push(entity.name);
		attrNodeManager.relationTour(pkId,function(rId){
			var rel= relationManager.get(rId);
			entityNames.push(rel.target);
		})
		for(var i=entityNames.length-1;i>=0 ;i--){
			sql+="<font color='blue'> DROP TABLE </font>"+entityNames[i]+"; \n";
		}
		return sql;
	}
	
	/////////////////////////////////////////////////////////
	function isNotNull(ispk,notnull) {
		  var ret=" ";
		  if(ispk)ret="NOT NULL";
		  if(notnull)ret="NOT NULL";
	    return ret;
	}
	Handlebars.registerHelper("isNotNull",isNotNull);

	/////////////////////////////////////////////////////////
	function getPk(that) {
		 var pkArr= that.search({isPk:true});
			var pkName=[];
			pkArr.forEach(function(pk){
				pkName.push(pk.pName);
			})
			return arrToComaString(pkName);
		}
	Handlebars.registerHelper("getPk",getPk);
	//////////////////////////////////////////////////////////
	function genFK(that) {
	    var attr=that.search({isFk:true});
	    var sql="";
	    var pEntityName={};
	    var relationChild={};
	    var relationParent={};
	    attr.forEach(function(att){
	    	var cNode= attrNodeManager.get(att.id);
	    	var pNode= cNode.parent;
	    	var pEntity= EntityManager.getEntityByName(pNode.entity);
	    	var pPname= pEntity.getAttr(Number(pNode.id)).pName;
	        var reId=MyArrayUtil.intersection(cNode.reId, pNode.reId)[0];
	        pEntityName[reId]=pEntity.name;
	        if(!relationChild[reId])relationChild[reId]=[];
	        if(!relationParent[reId])relationParent[reId]=[];
	        relationChild[reId].push(att.pName);
	        relationParent[reId].push(pPname);
	    });
	    var key=Object.keys(pEntityName);
	    for(var i=0,len=key.length;i<len;i++){
	    	var cs=arrToComaString(relationChild[key[i]]);
	    	var ps=arrToComaString(relationParent[key[i]]);
	    	var pE=pEntityName[key[i]];
	    	var cName=""+pE+"_to_"+that.name;
	    sql+="ALTER TABLE "+that.name+"  ADD  CONSTRAINT "+cName+" \n FOREIGN KEY "+cs+" REFERENCES "+pE+ps+"\n\n";
	   }
	    return sql;
	}
	Handlebars.registerHelper("genFK",genFK );
	////////////////////////////////////////////////////////////
	
	function CommonSql(){
		
	}
	
	// 이런식으로 코딩하자.
	CommonSql.prototype.genFK=function(fn){
		if(!fn)return genFK;
		Handlebars.registerHelper("genFK",fn );
	}
	CommonSql.prototype.dropTable=dropTable;
	
	return new CommonSql();
})();