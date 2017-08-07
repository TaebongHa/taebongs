var propMaker = (function(){
	
	
	//for single pk entity//for nonidentify relation //밑에쪽이랑 비슷함. 합쳐야됨
	var makePropsSingle = function(targetEntity,tempClassInfo,injectedPk){
		var props = [];
		var pkProps = targetEntity.search({isPk:true});
		var ownProps = targetEntity.search({isFk:false});
		var noProps = MyArrayUtil.intersection(targetEntity.search({isPk:false}),targetEntity.search({isFk:false}));
		var fkProps = targetEntity.search({isFk:true});
		
        var ownPk = injectedPk;
        console.log("onwPK:",ownPk);
        //이새긴 무조건 싱글키.
        if(ownPk.length==0){
            var newPk = new property();
            newPk.pName = (targetEntity.name).toLowerCase() + "_generation_id";
            newPk.addAnnotations("Id");
            newPk.addAnnotations("GenerationValue(strategy=GenerationType.AUTO)");
            newPk.addAnnotations("Column");
            newPk.colName = newPk.pName.toUpperCase();
            newPk.dataType = "Integer";
            newPk.setJoinedColumn = undefined;
            props.push(newPk);
        }
		
		
		//own column
		ownProps.forEach(function(prop){
			var tempProp= new property();
			tempProp.addAnnotations("Column");
			if(prop.isPk){
				tempProp.addAnnotations("Id");
				
				if(attrNodeManager.get(prop.id).reId!=undefined){
					tempProp.isReferenced = true;
					for(var i =0;i<attrNodeManager.get(prop.id).reId.length;i++){
						tempProp.addRelations(relationManager.get(attrNodeManager.get(prop.id).reId[i]));
						var search = attrNodeManager.get(prop.id).child[i];
						tempProp.addJoinColumn(EntityManager.getEntityByName(search.entity).search({id:Number(search.id)})[0]);
						tempProp.addJoinTable({"table":relationManager.get(attrNodeManager.get(prop.id).reId[i]).target,"relationType":relationManager.get(attrNodeManager.get(prop.id).reId[i]).relationType});
					}
				}
			}
			
			tempProp.dataType = maps.getType(prop.datetype.toLowerCase());
			tempProp.pName = prop.pName;
			tempProp.colName = (prop.pName).toUpperCase();
			
			
			props.push(tempProp);
		});
		
		
		if(fkProps.length!=0){
			
		fkProps.forEach(function(fkProp){
			for(var i =0;i<attrNodeManager.get(fkProp.id).reId.length;i++){
				var fProp = new property();
				relation = (relationManager.get(attrNodeManager.get(fkProp.id).reId[i]));
				fProp.pName = relation.source;
				fProp.addAnnotations(codeUtils.reverseRelationType(relation.relationType));
				fProp.addAnnotations("JoinColumn");
				fProp.mark=true;
				fProp.dataType = codeUtils.upperFirstLetter(relation.source);
				fProp.isReferenced = false;
				fProp.addJoinTable(relation.source);
				//이조건 말고 다른조건 찾아봐야 순서상관없이 돌아감.(entity에서 pk개수 구하는 방법)
				if(classManager.getClassInfoByClassName(codeUtils.upperFirstLetter(relation.source)).Emclass!=undefined){
					fProp.setJoinedColumn(EntityManager.getEntityByName(relation.source).search({isPk:true}));
				}else{
					//일단 보류. 하나있을때 밖에 구분못하는데 너무 복잡하게 찾아들어감
					var ano = EntityManager.getEntityByName(relation.source).search({isPk:true});
					var refCol;
					ano.forEach(function(ref){
						refCol = ref;
					})
					
					fProp.addJoinColumn(refCol);
				}
				if(codeUtils.effectiveProperty(props,fProp)){props.push(fProp);}
			}
			
			
			
		});
		
	}
		//이전이랑 달라지는 부분.
		if(codeUtils.hasChild(targetEntity,ownPk)){
			
			pkProps.forEach(function(pk){
				
				var node = attrNodeManager.get(pk.id);
				if(node.reId!=undefined){
					console.log("피케이가 뭐냐 :",node);
					for(var j in node.reId){
						var refProp = new property();
						var relation = relationManager.get(node.reId[j]);
						refProp.addAnnotations(relation.relationType);
						refProp.dataType = codeUtils.upperFirstLetter(relation.target);
						refProp.pName = relation.target;
						refProp.addJoinTable(relation.target);
						refProp.columnName = relation.target.toUpperCase();
						var joincolumns = ((relation.name).split("_")[1]).split("/");
						console.log("조인컬럼 시발아 :",joincolumns);
						console.log("릴레이션은 살아잇냐",relation);
						for(var k in joincolumns){
							refProp.addJoinColumn(EntityManager.getEntityByName(relation.target).search({id:Number(joincolumns[k])})[0]);
							console.log("조인컬럼의 k번째 노오오오드",attrNodeManager.get(joincolumns[k]));
						}
						if(codeUtils.effectiveProperty(props,refProp)){props.push(refProp);}
						
					}
				}
			});
			
		}
		return props;
	}
	//for dualkey pk entity 이거랑 위쪽 메서드랑 합쳐야됨.
	var makePropsDualKey = function(targetEntity,tempClassInfo,injectedPk){
		var props=[];
		var noProps = MyArrayUtil.intersection(targetEntity.search({isPk:false}),targetEntity.search({isFk:false}));
		var fkProps = targetEntity.search({isFk:true});
		var pkrefName =tempClassInfo.Emclass.className;
		var pkProps = targetEntity.search({isPk:true});
		
        var ownPk = injectedPk;
		console.log("onwPK:",ownPk);
        //em클래스가 undefined가 아님. 복합키 식별자임.
		
		//공통코드1 + //Emclass가 없다는 조건하에
		if(ownPk.length==0){
            var newPk = new property();
            newPk.pName = (targetEntity.name).toLowerCase() + "_id";
            newPk.addAnnotations("Id");
            newPk.addAnnotations("GenerationValue(strategy=GenerationType.AUTO)");
            newPk.addAnnotations("Column");
            newPk.colName = newPk.pName.toUpperCase();
            newPk.dataType = "Integer";
            props.push(newPk);
            newPk.setJoinedColumn = undefined;
        }else{
        	var newPk = new property();
        	newPk.dataType = codeUtils.upperFirstLetter(targetEntity.name+"Id");
        	newPk.pName = targetEntity.name+"Id";
        	newPk.addAnnotations("EmbeddedId");
        	newPk.colName = newPk.pName.toUpperCase();
        	props.push(newPk);
        	
        }
		
	/*	//식별관계 더이상 사용안함 이것도 필요없을거같음.
		ownPk.forEach(function(prop){
			var pProp = new property();
			pProp.addAnnotations("EmbeddedId");
			pProp.dataType = maps.getType(prop.datetype);
			pProp.pName = prop.pName;
			if(attrNodeManager.get(prop.id).reId!=undefined){
				pProp.isReferenced = true;
			}
			pProp.colName = (prop.pName).toUpperCase();
		});*/
		//normal프로퍼티 이것도 공통코드
		noProps.forEach(function(prop){
			var tempProp= new property();
			tempProp.addAnnotations("Column");
			tempProp.dataType = maps.getType(prop.datetype.toLowerCase());
			tempProp.pName = prop.pName;
			tempProp.colName = (prop.pName).toUpperCase();
			
			
			props.push(tempProp);
			
			
		});
		//공통코드2
		if(fkProps.length!=0){
			
			fkProps.forEach(function(fkProp){
				
				for(var i =0;i<attrNodeManager.get(fkProp.id).reId.length;i++){
					var fProp = new property();
					relation = (relationManager.get(attrNodeManager.get(fkProp.id).reId[i]));
					fProp.pName = relation.source;
					fProp.addAnnotations(codeUtils.reverseRelationType(relation.relationType));
					fProp.mark=true;
					fProp.addAnnotations("JoinColumn");
					fProp.dataType = codeUtils.upperFirstLetter(relation.source);
					fProp.isReferenced = false;
					fProp.addJoinTable(relation.source);
					if(classManager.getClassInfoByClassName(codeUtils.upperFirstLetter(relation.source)).Emclass!=undefined){
						fProp.setJoinedColumn(EntityManager.getEntityByName(relation.source).search({isPk:true}));
					}else{
						//일단 보류. 하나있을때 밖에 구분못하는데 너무 복잡하게 찾아들어감
						var ano = EntityManager.getEntityByName(relation.source).search({isPk:true});
						console.log("allofClassInfo",classManager.getClassInfoArr());
						console.log("targetClassName : ",relation.source);
						console.log("ananananananananana",classManager.getClassInfoByClassName(codeUtils.upperFirstLetter(relation.source)));
						var refCol;
						ano.forEach(function(ref){
							refCol = ref;
						})
						
						fProp.addJoinColumn(refCol);
					}
					if(codeUtils.effectiveProperty(props,fProp)){props.push(fProp);}
					
				}
				
				
				
			});
			
		}

		if(codeUtils.hasChild(targetEntity,ownPk)){
			
			pkProps.forEach(function(pk){
				
				var node = attrNodeManager.get(pk.id);
				if(node.reId!=undefined){
					console.log("피케이가 뭐냐 :",node);
					for(var j in node.reId){
						var refProp = new property();
						var relation = relationManager.get(node.reId[j]);
						refProp.addAnnotations(relation.relationType);
						refProp.dataType = codeUtils.upperFirstLetter(relation.target);
						refProp.pName = relation.target;
						refProp.addJoinTable(relation.target);
						refProp.columnName = relation.target.toUpperCase();
						var joincolumns = ((relation.name).split("_")[1]).split("/");
						console.log("조인컬럼 시발아 :",joincolumns);
						console.log("릴레이션은 살아잇냐",relation);
						for(var k in joincolumns){
							
							refProp.addJoinColumn(EntityManager.getEntityByName(relation.target).search({id:Number(joincolumns[k])})[0]);
							
							console.log("조인컬럼의 k번째 노오오오드",attrNodeManager.get(joincolumns[k]));
						}
						
						if(codeUtils.effectiveProperty(props,refProp)){props.push(refProp);}
					}
					
					
				}
			});
			
		}
		return props;
	}

	
	
	//dual key check,
	var makeProp = function(targetEntity,tempClassInfo){
		var pkProp = MyArrayUtil.intersection(targetEntity.search({isPk:true}),targetEntity.search({isFk:false}));
		console.log("엔티티에 노오오오오드 추가됨?",targetEntity);
		console.log("pkProp",pkProp);
		if(pkProp.length<=1){
			return makePropsSingle(targetEntity,tempClassInfo,pkProp);
		}
		else{
			//em클래스 만들고 자기한테 꽂아야할것 같음.
			tempClassInfo.setEmclass(emClass.makeEmClass(targetEntity));
			//tempClassInfo 자기 rel의 소스친구의 emclass 타입.
			return makePropsDualKey(targetEntity,tempClassInfo,pkProp);
		}
	}
	
	return{makeProp:makeProp}
	
})();