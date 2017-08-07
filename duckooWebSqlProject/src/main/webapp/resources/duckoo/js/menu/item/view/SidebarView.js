var SidebarView=(function(){
	var bodyTemplate=Handlebars.compile($("#__sidebarTemp__").html());
	var listTemplate= Handlebars.compile($("#sidebarItem").html());
	var entityListTemplate=Handlebars.compile($("#entityList").html());
	
	
	Handlebars.registerHelper("genEntityList",function(name){
		var names=SchemaManager.getEntitysNames(name);
		var obj={id:name,arr:names};
		return entityListTemplate(obj);
	});
			
	function SidebarView(sidebar){
		 this.sidebar=sidebar;
		 this.id= this.sidebar.id;
		$("body").append(bodyTemplate(sidebar));
		this.resizable();
		this.draggable();
		
	}
	
	SidebarView.prototype.toggleEntityList=function(sName,toggle){
	    if(toggle){
	    	 var ulE=$("#el_"+sName);
	    	 var dis=ulE.css("display");
	    	 dis= dis==="none" ? "block" : "none";
	    	 ulE.css("display",dis);
	    }
	}
	
	SidebarView.prototype.renderItem=function(items){
	    $target=$("#sidebody_"+this.id);
		var tag= listTemplate(items);
		$target.html(tag);
	}
	
	SidebarView.prototype.render=function(){
	}
	
	SidebarView.prototype.resizable=function(opt){
	  var $sidebar =$("#"+this.id);
		if(!$sidebar.length)return;
		var opt= opt || 	{
			start: function() {
				memo = $(this).css('transition');
				console.log(memo);
				$(this).css('transition', 'none');
			},
				stop: function() {
				$(this).css('transition', memo);
			}
		};
		
		$sidebar.resizable(opt);
	}
	SidebarView.prototype.draggable=function(opt){
		var $sidebar =$("#"+this.id);
	    if(!$sidebar.length)return;
		  
		var opt = opt || {
			start: function() {
				memo = $(this).css('transition');
				$(this).css('transition', 'none');
			},
				stop: function() {
				$(this).css('transition', memo);
			},
			handle:".sideBarHeader"
		}
		$sidebar.draggable(opt);
	}
	
	
	
	return SidebarView;
})();