var GenMysqlSql=(function(){
var createTableDDLTemplate=Handlebars.compile($("#mysqlCreateDDL").html());
var attributeTemplate= Handlebars.compile($("#attributeMySQL").html());
var types={};
types["DATE"]=function(){return "DATE"};
types["date"]=types["DATE"];

Handlebars.registerHelper("genMySQLType",
function(domainName, datetype ,datelength){
      if(DomainManager.get(domainName))return domainName;
      if(types[datetype]){
    	return types[datetype](datelength);
      }
	return datetype+"("+datelength+")";
});
	
Handlebars.registerHelper("genMysqlEXP", function(exp) {
	if(exp){
		return " DEFAULT "+ exp;
	}
	return " ";
});

Handlebars.registerHelper("genMySqlAttribute", function(that) {
  var attr= that.getAttr();
  var len =attr.length;
  var strs="";
  
  attr.forEach(function(att,i){
	 var str=attributeTemplate(att);
	 str= str.replace(/\s+$/,'');
	 if(i!=len-1)str+=",\n";
	 strs+=str;
  }); 
  return strs;
 });


  function genCreateTableDDL(entity){
		var pkId= entity.search({isPk:true})[0].id;
		var childEntitys=[];
    	childEntitys.push(entity);
    	
    	var str=CommonSql.dropTable(entity)+"\n";
    	attrNodeManager.relationTour(pkId,function(rId){
			var rel= relationManager.get(rId);
			childEntitys.push(EntityManager.getEntityByName(rel.target));
		})
		
		for(var i=0,len=childEntitys.length;i<len;i++){
			str+=createTableDDLTemplate(childEntitys[i])+"\n  ";
		}
		 return str;
	}

	return({
        name:"mysql",		
        genCreateTableDDL:genCreateTableDDL
	});
})();