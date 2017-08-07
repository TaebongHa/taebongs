var Menu=(function(){
    function Menu(opt){
    	this.itemList=[];
    	this.observer=DObserable.createObserable();
	}
    
    Menu.prototype.item=function item(idx){
		if(!idx)return this.itemList;
		return this.itemList[idx];
	}
    
    Menu.prototype.itemAdd=function(it){
		if(it.name){
			this.itemList.push(it);
			this.observer.fire("Item_add",{param:arguments,that:this});
		}
	}

    Menu.prototype.itemDel=function(name){ /////고쳐야됨 씨발...
		var ret=undefined;
		if(itemList[name]){
			ret=itemList[name];
			delete itemList[name];
			observer.fire("Item_del",{param:arguments,that:this});
		}
		return ret;
	}
    
    Menu.prototype.itemUpdate=function(opt){//고쳐야됨....
    	var target= this.itemList[opt.name];
    	if(target){
    		target=opt;
    		observer.fire("Item_update",{param:arguments,that:this});
    	}
    }
   
  
    Menu.prototype.setObserve=function(eName,observe){
    	this.observer.setEventObserver(eName,observe);
    }

    
	return Menu;
})();