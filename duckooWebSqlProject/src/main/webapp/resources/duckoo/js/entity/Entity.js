var Entity=(function(){
var entity ={
		        init:init,
			    getAttr:getAttr,
				search:search,
				sortAttribute:sortAttribute,
				deleteAttr:deleteAttr,
				setAttr:setAttr,
				setAttrArray:function(arr){this.attr=arr;},
				getMaxAttrID:getMaxAttrID,
			    clone:clone
			 };

  Object.defineProperty(entity,"className",{
	        value:"entity",
	       writable:false,
	       enumerable:false,
	       configurable:true
    });
///////////////////////////////////////////////////
function init(_opt) {
	var opt= _opt ||{};
	this.name = opt.name ||undefined;
	this.extend=false;
	this.top=opt.top || 0;
	this.left=opt.left || 0;
}

function getAttr(id){
		if(arguments.length===0){return this.attr;}
		for(var i=0,len=this.attr.length; i<len;i++){
			if(this.attr[i]["id"]===id){
				return this.attr[i];
			}
		}
		return undefined;
	 }
	
 function search(att){
		var ret=[];
		for( var attrVal of this.attr){
			
			var obj=attrVal.compare(att);
		   if(Object.keys(obj).length!==0){
			   ret.push(attrVal);
			}
		}
		return ret;
	}	

 function getMaxAttrID(){
	 var maxId=-1;
	 
	 this.attr.forEach(function(val){
		 var id= Number(val.id);
		 if(maxId<id)maxId=id;
	 });
	 return maxId;
 }
 
 function sortAttribute(){
		var deskPk=[];
        var deskFK=[];
        var desk=[];
		for(var i=0,len=this.attr.length;i<len;i++){
			var att= this.attr[i];
		  if(att.isPk)
			deskPk.push(att);
		  else if(att.isFk)
			deskFK.push(att);
		  else 
			desk.push(att)
		}
        this.attr=deskPk.concat(deskFK,desk);			
}
 function deleteAttr(id){
		var ret =undefined;
		for(var i=0,len=this.attr.length; i<len;i++){
			if(this.attr[i]["id"]===id){
				var ret =this.attr[i];
			    this.attr.splice(i,1);
			    break;
			}
		}
		return ret;
}
 
 function setAttr(opt){
		var thatAttr= this.getAttr(opt.id);//id???
		if(thatAttr){
			thatAttr.setAttribute(opt);
		   return thatAttr;
		}
		var newAttr=Attribute.creteInstance(opt);
		this.attr.push(newAttr);
		return newAttr;
 }

// 이거 다시 확인해보자...
 function clone(){
     var newEntity=createInstance();
     for( var pt in this){
  	      newEntity[pt]=this[pt];
	 }
     var ret=[]; 
  	for(var i=0,len=this.attr.length; i<len;i++){
  		ret.push(this.attr[i].clone());
  	}
  	newEntity.setAttrArray(ret);
  	return newEntity;
  }
 
///////////////////////////////////////////////////////////////////////   
   function createInstance(opt){
	   var opt = opt || {};
	   var newEntity=Object.create(entity);
	    Object.defineProperty(newEntity,"name",{
	    	  value:undefined,
		      writable:true,
		       enumerable:true,
		       configurable:false
	    });
	    
	    Object.defineProperty(newEntity,"extend",{
	  	  value:false,
		      writable:true,
		       enumerable:true,
		       configurable:false
	     });
	    Object.defineProperty(newEntity,"attr",{
	    	  value:[],
		      writable:true,
		       enumerable:true,
		       configurable:false
	    });
	    
	    Object.defineProperty(newEntity,"top",{
	    	  value:0,
		      writable:true,
		       enumerable:true,
		       configurable:false
	    });
	    
	    Object.defineProperty(newEntity,"left",{
	    	  value:0,
		      writable:true,
		       enumerable:true,
		       configurable:false
	    });
	    
	    if(opt.attr){
	     for(var i=0,len=opt.attr.length;i<len;i++){
	    	newEntity.attr[i]=Attribute.creteInstance(opt.attr[i])
	      }
	   }
	   newEntity.init(opt);
	   return newEntity;
   }
   
   return {createInstance:createInstance};
})();