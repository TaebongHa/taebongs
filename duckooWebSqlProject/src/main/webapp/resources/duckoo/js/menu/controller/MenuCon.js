var MenuCon=(function(){

	function MenuCon(menu){
		this.menu=menu;
		this.menuView=new MenuView(menu);
	}
	MenuCon.prototype.render=function __reCon_(opt){
		this.menuView.render(opt);
	}
	MenuCon.prototype.regItem=function(item){
		this.menu.itemAdd(item);
	}

	return MenuCon;
})();