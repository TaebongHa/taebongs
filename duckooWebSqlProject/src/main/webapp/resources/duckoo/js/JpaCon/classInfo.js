var classInfo =(function(){
	
	var className;
	var annotations;
	var properties;
	var Emclass;
	var tableName;
	
	function classInfo(){
		this.annotations=[];
		this.properties=[];
		this.Emclass=undefined;
	}
	
	classInfo.prototype.setEmbed = function(boolean){
		this.isEmclass=boolean;
	}
	classInfo.prototype.setProp = function(propArr){
		this.properties = propArr;
	}
	classInfo.prototype.addAnnotations = function(annotation){
		this.annotations.push(annotation);
	}
	classInfo.prototype.setEmclass = function(EmObj){
		this.Emclass = EmObj;
	}
	classInfo.prototype.addProps = function(prop){
		this.properties.push(prop);
	}
	classInfo.prototype.getClassName = function(){
		return this.className;
	}
	
	return classInfo;
})();