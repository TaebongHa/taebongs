var ConsoleCon=(function(){
		
	function ConsoleCon(consol){
	  this.console=consol;
	  this.consoleView= new ConsoleView(consol);	
	  this.id=this.console.id;
	
	}
	ConsoleCon.prototype.open=function(e){
		document.getElementById(""+this.id).style.display="block";
		setTimeout(function(){
			document.getElementById(""+this.id).style.width = "70%";
		}.bind(this),100);
	}
	
	ConsoleCon.prototype.close=function(e){
		document.getElementById(""+this.id).style.width = "0px";
		setTimeout(function(){
			document.getElementById(""+this.id).style.display="none";
		}.bind(this),200);
	}
	
	ConsoleCon.prototype.render=function(opt){
		 this.consoleView.render(opt);
	}
	ConsoleCon.prototype.getId=function(){
		return this.console.id;
	}
	
	ConsoleCon.prototype.getModel=function(){
		return this.console;
	}

	ConsoleCon.prototype.transToMenuItem=function(){
		 return {
			 	  name:this.console.name,
			      id:this.console.id
		        };
	}
	
	
	return ConsoleCon;
})();


