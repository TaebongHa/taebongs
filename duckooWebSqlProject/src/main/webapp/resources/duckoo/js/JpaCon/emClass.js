var emClass = (function(){
	
	
	var makeEmClass = function(targetEntity){
		var emClassInfo = new classInfo();
		//em클래스 정보
		emClassInfo.className = codeUtils.upperFirstLetter(targetEntity.name)+"Id";
		//em클래스 프로퍼티 정보
		emClassInfo.setProp(makeEmProps(targetEntity,emClassInfo)); 
		//em클래스 어노테이션 정보.
		emClassInfo.addAnnotations("Embeddable");
		emClassInfo.addAnnotations("EqualsAndHashCode");
		
		
		return emClassInfo;
	};
	
	//em클래스가 가지는 프로퍼티.
	var makeEmProps = function(targetEntity,emClassInfo){
		var pkArr = targetEntity.search({isPk:true});
		var props = [];
		pkArr.forEach(function(pkcol){
			pkProp = new property();
			pkProp.addAnnotations("Column");
			pkProp.addAnnotations("id");
			pkProp.pName = pkcol.pName;
			pkProp.colName = (pkcol.pName).toUpperCase();
			pkProp.dataType = pkcol.dateType;
			props.push(pkProp);
		});
		return props;
	}
	
	return {makeEmClass:makeEmClass}
})();
