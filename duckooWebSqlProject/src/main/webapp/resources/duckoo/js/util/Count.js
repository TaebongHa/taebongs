var Count=(function(){
	
	function Count(ct){
		var ct= ct || 0;
		this.count=ct;
	}
	Count.prototype.gen =function(){
		this.count+=1;
		return this.count;
	}
	Count.prototype.init=function(ct){
		this.count=ct;
	}
	
	
	return Count;
})();