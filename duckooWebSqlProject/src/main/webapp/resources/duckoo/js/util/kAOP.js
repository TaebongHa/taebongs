var kAOP=(function(){
	
 function kAOP(){
	 
 }
 
 kAOP.prototype.before=function __before__(ctx,jp,fn,opt){
    var opt=opt || {};
    var that=opt.that;
    if(opt.that ===undefined)that=ctx; 
	var oFn= ctx[jp];
	ctx[jp]=function(){
		fn.apply(that,arguments);
		var ret=oFn.apply(ctx,arguments);
		return ret;
	}
 }
 kAOP.prototype.after=function __after__(ctx,jp,fn,opt){
	    var opt=opt || {};
	    var that=opt.that;
	    if(opt.that ===undefined)that=ctx; 

	    var oFn= ctx[jp];
		ctx[jp]=function(){
			var ret=oFn.apply(ctx,arguments);
			fn.apply(that,arguments);
			return ret;
		}
	 }
 
  return kAOP; 
})();



