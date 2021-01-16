//firstChild can incude blank!
document.getElementById("n1").firstChild.innerHTML= "introduction";
document.getElementById("n2").firstChild.innerHTML= "examples";
//document.getElementById("n3").firstChild.innerHTML= "state table";

//var myColor = "#E8E7E3";
//var myColor = "white";
var navNum = 7;
for(var i = 1; i < (navNum+1); i++){
	var a = document.getElementById("n"+i).firstChild;
	var li = document.getElementById("n"+i);
	
	a.onmouseover = function(){
		this.className = "navStyle2";
	}
	a.onmouseout = function(){
		this.className = "navStyle1";
	}
	
	li.onmouseover = function(){
		this.className = "navStyle4"
	}
	li.onmouseout = function(){
		this.className = "navStyle3"
	}
}

