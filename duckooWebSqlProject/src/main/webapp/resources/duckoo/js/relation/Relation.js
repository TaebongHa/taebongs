var Relation=(function(){
	
	function Relation(opt){
         var opt = opt || {};
         this.name = opt.name || undefined;
         this.id = opt.id  ||  undefined;
         this.source =opt.source|| undefined ;
         this.target =opt.target || undefined;
        
         this.count=opt.count || 0;
         this.relationLine= opt.relationLine || undefined;
         this.restrictType = opt.restrictType || {};
         this.relationType = opt.relationType || undefined;
         
         //this.nodes= opt.nodes || [ [] , [] ];
	}
	Relation.prototype.getCount=function(){
		return  this.count;
	}
	Relation.prototype.setCount=function(ct){
		 this.count=ct;
		 return this.count;
	}
	Relation.prototype.decreaseCount=function(){
		this.count-=1;
		return this.count;
	}
	Relation.prototype.increaseCount=function(){
		this.count+=1;
		return this.count;
	}
	
	Relation.prototype.getId=function(){
		return this.id;
	}

	return Relation;
})();
