var MenuView=(function(){
	var bodyTemplate=Handlebars.compile($("#mainNaviBar").html());
	var itemTemplate=Handlebars.compile($("#menuItem").html());
	
	function refresh(){
		var items=itemTemplate(this.menu);
		//console.log("items: ",items);
		$(".dropdown-content").html(items);
		
	}
	
	function MenuView(menu){
		this.menu=menu;
		var obb=Object.create(Obsever);
		obb.init("item_Add",refresh.bind(this));
		this.menu.setObserve("Item_add",obb);

		obb=Object.create(Obsever);
		obb.init("item_del",refresh.bind(this));
		this.menu.setObserve("Item_del",obb);

	    obb=Object.create(Obsever);
		obb.init("item_update",refresh.bind(this));
		this.menu.setObserve("Item_update",obb);
		
		$(".nav-tabs").append(bodyTemplate(this.menu));
	}
	
	MenuView.prototype.render=	function __vRender__(opt){
	 /*   var opt=opt || {};
	    var target = opt.target || $("body");	
	  var html= bodyTemplate(this.menu);
	  
	  target.append(html);*/
	    
	}
	return MenuView;
})();