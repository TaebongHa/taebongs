var AttrNode=(function(){
	function AttrNode(opt){
		var opt = opt || {};
		this.id= opt.id || undefined;
  		this.reId = opt.reId|| [];
  		this.parent= opt.parent || undefined;
  		this.child = opt.child || [];
  		//..............
        this.entity=opt.entity || undefined;
	}
	
	AttrNode.prototype.addChild=function(node){
		this.child.push(node);
	}
	
	AttrNode.prototype.setParent=function(node){
		this.parent=node;
	}
	
	AttrNode.prototype.getChild=function(id){
		if(!id)return this.child;
		var ret=undefined;
		this.child.some(function(node){
			if(node.id===idx){ret=node;
				return true;
			}
		})
		return ret;
	}
	
	AttrNode.prototype.relIdPush=function(id){
	       this.reId.push(id);	
	}
	AttrNode.prototype.relIdPop=function(id){
		for(var i=0, len = this.reId.length;i<len ; i++){
			if(this.reId[i]===id){
				this.reId.splice(i,1);
				return;
			}
		}
	}
	
	
/*	AttrNode.prototype.getChildInfo=function(idx){
		if(!idx)return;
		return {
			  child:this.child[idx],
			  relationLine:this.relationLine[idx],
			  restrictType:this.restrictType[idx]
		}
		
	}
	*/
	
	
	return AttrNode;
})();