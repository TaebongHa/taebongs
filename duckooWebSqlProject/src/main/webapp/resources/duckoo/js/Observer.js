var DObserable=(function(){
	function setEventObserver(eventName,observer){
		if(!this.arr[eventName])this.arr[eventName]=[];
		if("fire" in observer)
		   if("name" in observer)
			   this.arr[eventName].push({name:observer.name,observer:observer});
	}
	function fire(eventName,opt){
	 if(this.arr[eventName]){
		 this.arr[eventName].every(function(temp){
			 temp.observer.fire(opt);
		  });
	   }
	}
	
	function deleteObserver(name){ // 잘 안될 가능성 높음
	 var key=Object.keys(this.arr);
	     for(var i=0,len=key.length;i<len;i++){
	    	 var inArr=this.arr[key[i]];
	    	 for(var i=0, len=inArr.length;i<len;i++){
	    		 if( inArr[i].name ===name)
	    			 delete inArr[i];
	    	 }
	     }
	}
	var obj={
	    setEventObserver:setEventObserver,
	    fire:fire,
	    deleteObserver:deleteObserver	
	};
	
	function createObserable(){
	       var newObj=Object.create(obj);
	        Object.defineProperty(newObj,"arr",{
			   value:[],
			   writable:true,
			   enumerable:true,
			   configurable:false  
		   })
	    return newObj;
	}
	
	return{
	     createObserable:createObserable
	};
})();


var Obsever=(function(){
	var Obs={
	   fx:undefined,
	   name:undefined,
	   init:function(name,fx){
			this.name=name;
			this.fx=fx;
		},
	   fire:function(opt){
		   if(this.fx)this.fx(opt);
	   }
	}
	return Obs;
})();

