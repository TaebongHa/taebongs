var DomainManager=(function(){
 var arr={};
	
  function add(o){
    if(o.domainName && o.datetype && o.datelength)
		  arr[o.domainName]=o;
  }	
  function get(name){
	  return arr[name];
  }
  return({
	  add:add,
	  get:get
  });
})();