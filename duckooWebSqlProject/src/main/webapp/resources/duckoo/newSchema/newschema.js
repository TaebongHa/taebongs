var Newschema = (function(){
	
	var delCurrentAllInfo = function(){
		jsPlumb.detachEveryConnection();
    	jsPlumb.deleteEveryEndpoint();
		var entitys= EntityManager.getEntityByName();
		for (key in entitys) {
			v(entitys[key]).del();		
		}
		EntityManager.deleteEntity();
		attrNodeManager.deleteAll();
		classManager.delclassInfo();
		//console.log("classInfo!!!!!!!!!!!:",classManager.getClassInfoArr());
		//console.log("entity!!!!!!:",EntityManager.getEntityByName());
		//console.log("attrNode!!!!!!:",attrNodeManager.getAllNode());
		
	}
	return{delCurrentAllInfo:delCurrentAllInfo}
})();


