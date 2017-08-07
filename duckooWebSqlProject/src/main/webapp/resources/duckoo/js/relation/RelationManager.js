var relationManager=(function(){
	function RelationManager(){
		this.arr={};
	}
	RelationManager.prototype.add=function(relation){
		if(!relation.id)return;
		 this.arr[relation.id]=relation;
	}
	RelationManager.prototype.get=function(id){
		if(!id)return this.arr;
		return this.arr[id];
	}
	RelationManager.prototype.del=function(id){
		if(this.arr[id]) delete this.arr[id];
	}
	
	RelationManager.prototype.setJObj=function(o){
		var key= Object.keys(o);
		this.arr={};//테스트용.
		for(var i=0,len=key.length;i<len;i++){
			var dR= o[key[i]];//data-relation;
			var r= new Relation(dR);
			this.arr[key[i]]=r;
		}
		
		
	}
	
	
	return new RelationManager();
})();