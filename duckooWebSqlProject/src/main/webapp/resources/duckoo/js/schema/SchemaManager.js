var SchemaManager=(function(){
 function SchemaManager(){
   this.arr= {};
   this.focus=undefined;
 }
 
 SchemaManager.prototype.set=function(parsedObj){
	 console.log("parse: ",parsedObj);
	 var key=Object.keys(parsedObj);
	 this.arr[key[0]]=parsedObj[key[0]];
	 return parsedObj[key[0]];
 }
 SchemaManager.prototype.get=function(name){
	 if(arguments.length===0)return this.arr;
	 return this.arr[name];
 }
 
 SchemaManager.prototype.getKeys=function(){
	 var key= Object.keys(this.arr);
	 return key;
 }
 SchemaManager.prototype.focusOn=function(name){
	 this.focus=name;
	 SaveAndLoad.load(this.arr[name]);
 }
 
 SchemaManager.prototype.getEntitysNames=function(name){
	 var es= this.arr[name].entitys;
	 return Object.keys(es);
 }
 
 SchemaManager.prototype.SetNewSchema=function(name){
	 var enArr=EntityManager.getEntityByName();
	 var noArr=attrNodeManager.prepareJSON();
	 var reArr=relationManager.get();
	 var obj={};
	
	 obj["entitys"]=enArr;
	 obj["nodes"]=noArr;
	 obj["relations"]=reArr;
	  this.arr[name]=obj;
	  
 }
 
 SchemaManager.prototype.focusErdSave=function(){
	 
 }
 
 
 return new SchemaManager();
})();