var attrNodeManager=(function(){
	
	function AttrNodeManager(){
		this.arr= {};
	}
	AttrNodeManager.prototype.prepareJSON=function(){
		console.log("s:",this.arr);
		
		var key= Object.keys(this.arr);
		var idArr={};
		var valArr={};
	
		for(var i=0,len=key.length; i<len ;i++){
			var temp = this.arr[key[i]];
			if(!idArr[key[i]]) idArr[key[i]]={};
			idArr[key[i]]["parent"]= (temp.parent===undefined) ? undefined:temp.parent.id;
			idArr[key[i]]["child"]=[];
			idArr[key[i]]["id"]=temp.id;
			 
			for(var j=0,len2=temp.child.length;j<len2;j++){
				  idArr[key[i]].child[j]= temp.child[j].id;
			 }
			if(!valArr[key[i]])valArr[key[i]]={};
			
			  valArr[key[i]]["id"]=temp.id;
			  valArr[key[i]]["reId"]=temp.reId;
			  valArr[key[i]]["entity"]=temp.entity;
	     }
		
		return {
			circularID:idArr,
			value:valArr
		}
		
	}
	
	
	AttrNodeManager.prototype.setJObj=function(o){
	   var valArr=o.value;
	   var cid=o.circularID;
	   var key= Object.keys(cid);
	   this.arr={};// 걍 초기화해버리자..
	   for(var i=0,len=key.length; i<len ;i++){
		   var temp= {};   
		  temp["id"]=valArr[key[i]].id;
		  temp["entity"]=valArr[key[i]].entity;
		  temp["reId"]=valArr[key[i]].reId;
		  var newNode= new AttrNode(temp);
		  this.arr[key[i]]=newNode;
	   }
	   for(var i=0,len=key.length; i<len ;i++){
		   var temp= this.arr[key[i]]; 
		   temp["parent"]= (cid[key[i]].parent ===undefined) ? undefined :this.arr[cid[key[i]].parent];
		   temp["child"]=[];
			for(var j=0,len2=cid[key[i]].child.length;j<len2;j++){
				 temp["child"][j]=this.arr[cid[key[i]].child[j]];
		   }
	   }
	   console.log("toObj",this.arr);
	   
	}
	
	AttrNodeManager.prototype.hasPK=function(id){
		var id = Number(id); 
	   return this.arr[id] !==undefined? true : false;
	}
	
	
	AttrNodeManager.prototype.add=function(node){
		if(!node.id)return;
		this.arr[node.id]=node;
	}
	
	AttrNodeManager.prototype.unLink=function(id){// 검증안됨..
		var pare= this.arr[id].parent;
		if(!pare)return;
		var pArr=pare.getChild();
		var idx =0;
		pArr.some(function(n){
	        if(n.id===id){
	        	pArr.splice(idx,1);
	        	return true;
	        }
			 idx++;
		})
		this.get(id).parent=undefined;	
	}
	AttrNodeManager.prototype.get=function(id){
		if(!this.arr[id]){
			 this.arr[id]= new AttrNode({id:id});
		}
		return this.arr[id];
	}
	AttrNodeManager.prototype.getAllNode = function(){
		return this.arr;
	}
	AttrNodeManager.prototype.del=function(id){
		var idArr=[];
		var manager = this;
		idArr.push(id);
		this.unLink(id);
		this.update(id,function(){
			idArr.push(this.id);
		});
		idArr.forEach(function(idx){
		    var en=EntityManager.getEntityByName(this.arr[Number(idx)].entity);
		    en.deleteAttr(Number(idx));
			 delete manager.arr[idx];
			 v(en).refresh();
			 v(en).entitySizing();
		}.bind(this));
	}
	
	AttrNodeManager.prototype.link=function(pid,cid){
		var pNode =this.get(pid);
		var cNode= this.get(cid);
		cNode.setParent(pNode);
		pNode.addChild(cNode);
	}
	
	
	AttrNodeManager.prototype.update=function(startId,fn){
		var manager =this;
		(function chain(id){
		  if(!id)return;
		  var node= manager.get(id);
		  node.getChild().forEach(function(that){
		    	fn.call(that);
				chain(that.id);
			})
		})(startId);
	}
	
	AttrNodeManager.prototype.addNodeTour=function(startId,attr){
		var manager= this;
		
		var relationIdArr =manager.get(startId).reId;
		(function addPk(relArr,attr){ 
			if(relArr.length===0)return;
			var nearRelation=[];
			//var manager= this;
			var originalId = attr.id;
			var targetAttrId  = [];
			var relationIdArr =relArr;
			for(var i=0;i<relationIdArr.length;i++){
				relationManager.get(relationIdArr[i]).increaseCount(); // 관계에 관여하는 속성 증가
				nearRelation.push(relationManager.get(relationIdArr[i]));
			}// 가까운 관계구한다.
			if(nearRelation.length===0)return;
				var sourEntity= nearRelation[0].source;
				console.log("오리지널아이디:::::",originalId);
				var sourceNode= attrNodeManager.get(originalId);
				sourceNode.entity=sourEntity;
				console.log("니얼릴레이션::::::::",nearRelation.length);
				for(var i=0;i<nearRelation.length;i++){
					//if((nearRelation[i].target)==relationManager.get(nearRelation[0].id).target){break;}
					var tempEntity = EntityManager.getEntityByName(nearRelation[i].target);
					
					attr.id=undefined;
					attr.isFk=true;
					attr.isPk=false;
					if(nearRelation[i].relationLine==="identify"){
						attr.isPk = true;
					}
					var tempArr = tempEntity.getAttr();
					var id =tempEntity.setAttr(attr).id;
					 targetAttrId.push(id);
					 console.log("targetAttrId:::::",targetAttrId);
					var newNode= attrNodeManager.get(id);
					newNode.entity=tempEntity.name;
					attrNodeManager.link(originalId,id);
					newNode.reId=relationIdArr;
				    var pk= tempEntity.search({isPk:true});
				    var childReId=attrNodeManager.get(pk[0].id).reId;
				    
				    
				    var newReId=[];
				   childReId = MyArrayUtil.minu(childReId,relationIdArr);
				 	   
				    childReId.forEach(function(val){
				    		if(relationManager.get(val).source===tempEntity.name)
				    			newReId.push(val);
				    })
					   
				   
				   console.log("재귀에들어가는 아이디:::",relationIdArr);
				   /////태현이꼽사리
				   tempEntity.sortAttribute();
				   v(tempEntity).refresh();
				   v(tempEntity).entitySizing();
				   //////겐세이끝
					if(pk.length && nearRelation[i].relationLine==="identify"){
						attr.id=id;
					   addPk(newReId,attr);
					}else{
						return;
					}
					
				}
		 })(relationIdArr,attr);
	}	
	
	AttrNodeManager.prototype.relationTour=function(startId,fn){
		function tour(){
			var p= this.parent.reId;
			var t= this.reId;
			var iRarr = MyArrayUtil.intersection(p,t);
			iRarr.forEach(function(id){ fn.call(this,id);}.bind(this));
		}
		this.update(startId,tour);
	}
	
	AttrNodeManager.prototype.unRelationParent=function(id){ //부모와 인연을 끊는다..
		   var pare= this.arr[id].parent;
			if(!pare){
				return;
			}
			this.unLink(id);
			var inArr= MyArrayUtil.intersection(this.arr[id].reId,pare.reId);
			pare.reId= MyArrayUtil.minu(pare.reId,inArr);
			this.arr[id].reId=MyArrayUtil.minu(this.arr[id].reId,inArr);
		}
	
	AttrNodeManager.prototype.deleteTour=function(id){
		var deleTarget=[];
	 	 var id= Number(id);
		 if(this.arr[id].parent){
			 deleTarget = MyArrayUtil.intersection(this.arr[id].reId,this.arr[id].parent.reId);
		 }
		attrNodeManager.relationTour(Number(id),function(imyourman){
			var count=relationManager.get(imyourman).decreaseCount();
			if(count===0){deleTarget.push(imyourman);}
		});
		attrNodeManager.unRelationParent(Number(id));//
		deleTarget.forEach(function(rId){
			console.log("jebal2...............",rId);
			  jsPlumb.detach(renderManager.getConnecter(rId));
			  
		});
		attrNodeManager.del(Number(id));//
	}
	
	AttrNodeManager.prototype.keyTypeTour=function(id,keyType){
		var deleTarget=[];
		var manager = this;
		 if(this.arr[id].parent){
			 deleTarget = MyArrayUtil.intersection(this.arr[id].reId,this.arr[id].parent.reId);
		 }
		 manager.relationTour(Number(id),function(imyourman){
			var count=relationManager.get(imyourman).decreaseCount();
			if(count===0){deleTarget.push(imyourman);}
		});
		deleTarget.forEach(function(rId){
			console.log("jebal...............",rId);
			  jsPlumb.detach(renderManager.getConnecter(rId));
		});
		var targetId=[];
		manager.unRelationParent(Number(id));
		this.update(id,function(){
			targetId.push(this.id);
		});
		targetId.forEach(function(_id){
			var en=EntityManager.getEntityByName(this.arr[Number(_id)].entity);
			   keyType.id=Number(_id);
			   en.setAttr(keyType);
			   manager.unRelationParent(Number(_id));
			   v(en).refresh();
			   v(en).entitySizing();
		}.bind(this));
	}
	
	
	AttrNodeManager.prototype.update=function(startId,fn){
		var manager =this;
		(function chain(id){
		  if(!id)return;
		  var node= manager.get(id);
		  node.getChild().forEach(function(that){
		    	fn.call(that);
				chain(that.id);
			})
		})(startId);
	}
	
	
	AttrNodeManager.prototype.updateTourChild=function(id,attr){
		var target=[];
		if(!id)return;
		attr.id=id;
		EntityManager.getEntityByName(this.arr[id].entity).setAttr(attr);
		this.update(id,function(){
			target.push(this.id);
		});
		target.forEach(function(cid){
			var node = this.arr[cid];
			attr.id=Number(cid);
			EntityManager.getEntityByName(node.entity).setAttr(attr);
			v(EntityManager.getEntityByName(node.entity)).refresh();
		}.bind(this));
	}
	
	AttrNodeManager.prototype.hasNode=function(id){
		   var id= Number(id);
		return this.arr[id];
	}
	
	
	AttrNodeManager.prototype.updateTourAll=function(id,attr){
		   var pArr=[];
		   var id= Number(id);
		   console.log("utA error: ",this.arr[id])
		   if(!this.arr[id].parent)return;
		    (function up(parent){
		    	if(!parent)return;
		    	pArr.push(parent.id);
		    	up(parent.parent);
		    }.bind(this))(this.arr[id].parent);
		    
		    var startId= pArr.pop();
		    this.updateTourChild(Number(startId),attr);
	}
	AttrNodeManager.prototype.deleteAll=function(){
		this.arr=undefined;
		this.arr={};
	}
	
	
	
	return new AttrNodeManager();
})();