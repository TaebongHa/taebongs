var classInfoMaker = (function(){
	
	var targetNode;
	//이미 뒤진 코드입니다.

	//이걸 사용할 예정 오류나면 이전거로 돌려야됨.
	var mkClassInfo = function(targetEntity){
        var tempClassInfo = new classInfo();
        
        console.log("prototype?:",tempClassInfo);
        
        
        tempClassInfo.className = codeUtils.upperFirstLetter(targetEntity.name);
        tempClassInfo.tableName = targetEntity.name;
        var annotations = [];
        annotations.push("Entity");
        annotations.push("Getter");
        annotations.push("Setter");
        
        //상속용으로 만들어봄. 나중에 쓸데 있으면씀.
        /*if(targetNode.reId.length>0){
            annotations.push("Dtype");
        }*/
        
        //property make(superClass);
        tempClassInfo.setProp(propMaker.makeProp(targetEntity,tempClassInfo));
        
        tempClassInfo.annotations = annotations;
        
        
        classManager.addClassInfo(tempClassInfo);
        
        return tempClassInfo;
        
        
    }
	
	return{makeClassInfo:makeClassInfo,
		mkClassInfo:mkClassInfo}
	
})();
