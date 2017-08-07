var property = (function(){
	var annotations;
	var isReferenced;
	var pName;
	var columnName;
	var dataType;
	var joinedColumn;
	var relations;
	var joinedTable;
	var NodeidsForPK;
	var mark;
	var tableName;
	
	
	
	function property(){
		this.annotations = [];
		this.isReferenced=false;
		this.joinedColumn = undefined;
		this.relations =[];
		this.joinedTable =[];
		this.mark=false;
	}
	
	property.prototype.setIsRef = function(bool){
		this.isReferenced = bool;
	}
	property.prototype.setJoinedColumn = function(columnArr){
		if(this.joinedColumn==undefined){this.joinedColumn=[];}
		this.joinedColumn = columnArr;
	}
	property.prototype.addJoinColumn = function(joinColumn){
		if(this.joinedColumn==undefined){this.joinedColumn=[];}
		this.joinedColumn.push(joinColumn);
	}
	property.prototype.addAnnotations = function(annotation){
		if(this.annotations.length==0){this.annotations.push(annotation);}
		
		else if(this.check(this.annotations,annotation)){this.annotations.push(annotation);}
	}
	
	property.prototype.check = function(checkArr,checkEle){
		checkArr.forEach(function(alEle){
			if(alEle==checkEle){return false;}
		});
		return true;
	}
	property.prototype.addRelations = function(relation){
		this.relations.push(relation);
		
	}
	property.prototype.addJoinTable = function(tableName){
		this.joinedTable.push(tableName);
	}
	
	
	return property;
})();
