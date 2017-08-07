var MyArrayUtil=(function(){
	
	function intersection(a1,a2){ // no test
		var ret = [];
		for(var i =0 ,len=a1.length; i<len;i++){
			for(var j=0,len2=a2.length;j<len2;j++){
				 if(a1[i]===a2[j]){
					 ret.push(a1[i]);
				 }
			}
		}
		return ret;
	}
	
	function minu(a1,a2){
	  var retA1=[];
	  for(var i =0 ,len=a1.length; i<len;i++){
			for(var j=0,len2=a2.length;j<len2;j++){
				if(a1[i]!==a2[j]){
					retA1.push(a1[i]);
				}
			}
	  } 
	  return retA1;
	}
	
	return{
		intersection:intersection,
		minu:minu
	}
})();
