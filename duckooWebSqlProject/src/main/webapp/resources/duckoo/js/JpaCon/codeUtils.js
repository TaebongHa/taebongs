var codeUtils = (function(){
//클래스이름 만들때 씀.
	var upperFirstLetter = function(entityName){
		var first = entityName[0].toUpperCase();
		var second = entityName.substring(1,entityName.length);
		
		return first+second;
	}
//relation정보 반전할 때 씀
	var reverseRelationType = function(relationType){
		var reverseArr = relationType.split("To");
		
		var result = reverseArr[1]+"To"+reverseArr[0];
		return result;
	}
	function checkValue(targetClassInfo){
		
		var flag = true;
		classManager.getClassInfoArr().forEach(function(inClassInfo){
			//console.log("inClassInfo",inClassInfo);
			if(targetClassInfo.getClassName()==inClassInfo.getClassName()){
				console.log("Denied");
				flag=false;
			}
		});
		return flag;
	}
//자식이 있는가 검사 이것도 안쓸거같음.
	function hasChild(targetEntity,pkProps){
		var flag = false;
		
		for(var i=0;i<pkProps.length;i++){
			var id = attrNodeManager.get(targetEntity.search({id:Number(pkProps[i].id)})[0].id);
		
			for(var j =0;j<id.reId.length;j++){
				var tarRel = relationManager.get(id.reId[j]);

				if(tarRel.source==targetEntity.name){
					flag = true;
					
				}
			}
		}
			
		return flag;
	}
//classifier에서 엔티티가 중복되는가를 검사.
	function effectiveEntity(entities, entity){
        var flag = true;
        
        entities.forEach(function(en){
            if(entity.name==en.name){flag = false;}
            
            
        })
        return flag;
    }
	function effectiveProperty(propsArr,prop){
		var flag = true;
		
		propsArr.forEach(function(pr){
			if(pr.dataType==prop.dataType){flag=false;}
		})
		
			
		return flag;
		
	}
	function effedctiveValue(arr, value, opt){
		var flag = false;
		if(opt!=undefined){
			var optVl = opt;
			Arr.forEach(function(vl){
				if(vl[optVl]==value[optVl]){flag = true;}
			})
		}
		return flag;
	}
	
	return{upperFirstLetter:upperFirstLetter,
		  reverseRelationType:reverseRelationType,
		  checkValue:checkValue,
		  hasChild:hasChild,
		  effectiveEntity:effectiveEntity,
		  effectiveProperty:effectiveProperty
	}
	
})();

