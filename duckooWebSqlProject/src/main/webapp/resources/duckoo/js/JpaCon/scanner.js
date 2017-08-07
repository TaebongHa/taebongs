//스캐너쟝 이제 필요없을거같은데
var scanner = (function(){
	
	var superClassScan = function(node){
		//attrNodeManager.get(node);
		var superClass = node;
		
		while(superClass.parent!=undefined){
			superClass = superClass.parent;
		}
		
		console.log("in node",superClass);
		return superClass;
	}
	
	
	return{superClassScan:superClassScan}
	
})();