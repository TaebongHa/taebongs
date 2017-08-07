var ConsoleView=(function(){
	var bodyTemplate=Handlebars.compile($("#__ConsoleTemp__").html());
	
	function ConsoleView(consol){
		this.console=consol;
		this.id = this.console.id;
		
		$("body").append(bodyTemplate(this.console));
		this.resizable();
		this.draggable();
		
	}
	
	ConsoleView.prototype.render=function(opt){
	 /*   var opt=opt || {};
	    var target = opt.target || $("body");
	    
	    var $consol = $("#consol");
	    var html= bodyTemplate(this.consol);
	    console.log("con: ",$consol);
	    
	 console.log("con html: ",html)
	    if($consol.length){
	    	this.refresh(html);
	    	return ;
	    }
	    target.append(html);*/
	}
	
	ConsoleView.prototype.resizable=function(opt){
		  var $console = $("#"+this.id);     
		  if(!$console.length)return;
		  
		var opt = opt || {
			start: function() {
				memo = $(this).css('transition');
				$(this).css('transition', 'none');
			},
			stop: function() {
				$(this).css('transition', memo);
			}
		};
		$console.resizable(opt);
	};//

	ConsoleView.prototype.draggable=function(opt){
		  var $console = $("#"+this.id);     
		  if(!$console.length)return;

		  var opt = opt ||{
				start: function() {
					memo = $(this).css('transition');
					$(this).css('transition', 'none');
				},
					stop: function() {
					$(this).css('transition', memo);
				},
				handle:".consoleHeader"
			};
		 $console.draggable(opt);
	};//
	
	return ConsoleView;
})();