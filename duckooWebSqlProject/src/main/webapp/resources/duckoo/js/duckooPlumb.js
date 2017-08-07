
var renderManager=(function(){
	var lines={};
////////////////////////////////////////////////////////////////
	function connectEntity(rel){ // 
		var $source=$("#"+rel.source);
		var $target=$("#"+rel.target);
		
		if(!($source) || !($target) ){
			alert("잘못된 이름 ");
			return;
		}
	
		var paintStyle = {  
				strokeStyle: "#F14343",
				lineWidth: 5,
				dashstyle:undefined
		};
	
		if(rel.relationLine=="nidentify"){
			paintStyle.dashstyle= "3 3";
		}
		
		var sLabel="1";
		var tLabel="N";
		var sou= jsPlumb.addEndpoint($source,{
			anchor:"Continuous",
			endpoint:[ "Dot", { radius:10 } ],
			paintStyle:{strokeStyle:"#000000",fillStyle:"transparent",radius:10,lineWidth:3},                
			//connectorStyle:{lineWidth:4,strokeStyle:"#567F9F",joinstyle:"round",outlineColor:"white",outlineWidth:1},
		    overlays:[
				[ "Label", { label:sLabel, id:"label_"+$source, location:[0.5, 0.5] } ]
			],
		});
		var tar= jsPlumb.addEndpoint($target,{
			anchor:"Continuous",
			endpoint:[ "Dot", { radius:10 } ],
			paintStyle:{strokeStyle:"#000000",fillStyle:"transparent",radius:10,lineWidth:3},                
		   overlays:[
				[ "Label", { label:tLabel, id:"label_"+$target,location:[0.5, 0.5] } ]
			]
		});
		var obj= jsPlumb.connect({
			 source:sou, 
			 target:tar,
			 detachable:false,
			  connector:["Flowchart", { gap:9}],
			 paintStyle:paintStyle
		});
	   Object.defineProperty(lines,rel.id,{
	         value:obj,
	         writable:true,
	         enumerable:true,
	         configurable:true
	    });
	  jsPlumb.repaintEverything(); 
	}
	
	
	
	
	
	
	function connectDiv(opt){
		
		var $source= opt.$source ||undefined;
		var $target= opt.$target ||undefined;
		//console.log("line option :",opt.lineType);
		var paintStyle = {  
				strokeStyle: "#F14343",
				lineWidth: 5,
				dashstyle:undefined
		        };
		
		if(opt.lineType=="nidentify"){
			paintStyle.dashstyle= "3 3";
		}
		if(!($source) || !($target) ){
			alert("잘못된 이름 ");
			return;
		}
		var sLabel="1";
		var tLabel="N";
		
		var sou= jsPlumb.addEndpoint($source,{
			anchor:"Continuous",
			endpoint:[ "Dot", { radius:10 } ],
			paintStyle:{strokeStyle:"#000000",fillStyle:"transparent",radius:10,lineWidth:3},                
			    
			//connectorStyle:{lineWidth:4,strokeStyle:"#567F9F",joinstyle:"round",outlineColor:"white",outlineWidth:1},
		    overlays:[
				[ "Label", { label:sLabel, id:"label_"+$source, location:[0.5, 0.5] } ]
			],
		});
		var tar= jsPlumb.addEndpoint($target,{
			anchor:"Continuous",
			endpoint:[ "Dot", { radius:10 } ],
			paintStyle:{strokeStyle:"#000000",fillStyle:"transparent",radius:10,lineWidth:3},                
		   overlays:[
				[ "Label", { label:tLabel, id:"label_"+$target,location:[0.5, 0.5] } ]
			]
		});
		var obj= jsPlumb.connect({
			 source:sou, 
			 target:tar,
			 detachable:false,
			  connector:["Flowchart", { gap:9}],
			 paintStyle:paintStyle
		});
		
	   Object.defineProperty(lines,opt.id,{
	         value:obj,
	         writable:true,
	         enumerable:true,
	         configurable:true
	    });
	   
	  jsPlumb.repaintEverything();   
	}

	
	function getConnecter(id){
		return lines[id];
	}
	
	function repaintEverything(){
		jsPlumb.repaintEverything();
	}
	return {
		connectDiv:connectDiv,
		connectEntity:connectEntity,
		repaintEverything:repaintEverything,
		getConnecter:getConnecter
	}
})();

