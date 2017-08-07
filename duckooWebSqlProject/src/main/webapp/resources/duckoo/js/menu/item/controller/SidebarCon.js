var SidebarCon=(function(){
	
	
	function SidebarCon(sidebar){
		this.sidebar=sidebar;
		this.sidebarView= new SidebarView(sidebar);
		this.id=this.sidebar.id;
		this.focusItem=undefined;
		  
	}
	
	SidebarCon.prototype.setFocus=function(name){
		if(!name)return;	
		this.foucusItem=name;
	}
	
	function showEntityList(){
		
	}
	
	SidebarCon.prototype.toggleEntityList=function(name){
		if(this.foucusItem === name){
		  this.sidebarView.toggleEntityList(name,true);
		}
		this.foucusItem =name;
	}
	
	
	SidebarCon.prototype.render=function(){
	
	}
	
	SidebarCon.prototype.renderItem=function(items){
		this.sidebarView.renderItem(items);
	}
	
	
	SidebarCon.prototype.open= function(){
		document.getElementById(""+this.id).style.display="block";
		setTimeout(function(){
			document.getElementById(""+this.id).style.width = "14%";
		}.bind(this),100);
	}
	
	SidebarCon.prototype.close=function(){
		document.getElementById(""+this.id).style.width = "0px";
		setTimeout(function(){
			document.getElementById(""+this.id).style.display="none";
		}.bind(this),200);	
	}
	
	SidebarCon.prototype.getModel=function(){
		return this.sidebar;
	}
	
	
	SidebarCon.prototype.getId=function(){
		return this.sidebar.id;
	}
	
	SidebarCon.prototype.transToMenuItem=function(){
		 return {
			 	  name:this.sidebar.name,
			      id:this.sidebar.id
		        };
	}
	
	
	
	return SidebarCon;
})();