var dView=(function(){
	var views={};
	function add(fac){
		if(!fac.name)return;
		views[fac.name]=fac;
	};
	function get(name){
		var fac=views[name].val;
		if(fac)return fac;
		return undefined;
	}
	return({
		add:add,
		get:get
	});
})();

function v(obj){
	if(!obj.className)return;
	var fac =dView.get(obj.className);
	 fac.inject(obj);
	 return obj;
}  
