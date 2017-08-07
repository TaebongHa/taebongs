var SqlFactory=(function(){
	var arr={};
	function add(fac){
		if(!fac.name)return;
		if("genCreateTableDDL" in fac)
	      arr[fac.name]=fac;
	};
	function get(name){
		var fac=arr[name];
		if(fac)return fac;
		return undefined;
	}
	return({
		add:add,
		get:get
	});
})();


