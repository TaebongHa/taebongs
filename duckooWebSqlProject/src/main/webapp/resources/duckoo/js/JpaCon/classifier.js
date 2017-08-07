var classifier = (function(){
	
	var superClasses=[];
	
	function classifier() {
		this.entities=[];
	}
	classifier.prototype.classify = function(node){
		
		var tempNode = scanner.superClassScan(node);
			
		if(superClasses.length==0){
			superClasses.push(tempNode);
		}
		
		
		for(var i in superClasses){
			if(tempNode.id===superClasses[i].id){
				return;
			}
			else{
				superClasses.push(tempNode);
			}
		};
	}
	
	classifier.prototype.punish =function(){
		superClasses.forEach(function(spc){	
			classInfoMaker.makeClassInfo(spc);
		});
		//child?
		
		superClasses.forEach(function(spc){
			for(var i in spc.child){
				classInfoMaker.makeClassInfo(spc.child[i]);
			}
		});
		
		
		
		
	}
	
	
	classifier.prototype.classClassify = function(node){
        
        var tarEn = EntityManager.getEntityByName(node.entity);
        
        if(this.entities.length==0){
            this.entities.push(tarEn);
        }
        else if(codeUtils.effectiveEntity(this.entities,tarEn)){
            this.entities.push(tarEn);
        }
        return;
    }



    classifier.prototype.active = function(){
        this.entities.forEach(function(En){    
            classInfoMaker.mkClassInfo(En);
        });
        //child?

        //child 1단계. 2단계까지 갈라면?
        this.initClasses();
    }
	classifier.prototype.initClasses = function(){
		this.entities=[];
		this.superClasses=[];
	}
	
	return classifier;
})();
