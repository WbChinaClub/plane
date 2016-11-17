/**
工具类
  对于这个游戏里的一些常用功能进行封装，跟某个对象没多大关系

  (静态的)
 */
/*
碰撞检测
 */
function isCrash(obj1, obj2){
	if(obj1 && obj2){
		var leftSide = obj2.offsetLeft-obj1.offsetWidth/2;
		var rightSide = obj2.offsetLeft+obj2.offsetWidth+obj1.offsetWidth/2;
		var upSide = obj2.offsetTop - obj1.offsetHeight/2;
		var downSide = obj2.offsetTop + obj2.offsetHeight + obj1.offsetHeight/2;
		var x = obj1.offsetLeft+obj1.offsetWidth/2;
		var y = obj1.offsetTop + obj1.offsetHeight/2;
		if(x > leftSide && x < rightSide && y > upSide && y < downSide){
			return true;
		} 
	}
	return false;
}
/*
获取实际 属性的值
 */
function getStyle(obj,attr) {
    if(obj.currentStyle){
        return obj.currentStyle[attr];
    }else{
        return getComputedStyle(obj,false)[attr];
    }
}

function bubbleSort(arr) {
            for(var i=1;i<=arr.length-1;i++){
                for(var j=0;j<arr.length-1;j++){
                    if(arr[j]<arr[j+1]){
                        var temp = arr[j];
                        arr[j] = arr[j+1];
                        arr[j+1] = temp;
                    }
                }
            }
            return arr;
        }
function setCookie(name,value,date,path,domain,secure) {
    //var document.cookie =
    var str = "";
    if(name==""||value==""){

    }else{
        str +=encodeURIComponent(name)+"="+encodeURIComponent(value);
        if(date instanceof Date){
            str += ";expires="+date;
        }
        if(path){//与！path==""的区别
            str += ";path="+path;
        }
        if(domain){
            str += ";domain="+domain;
        }
        if(secure){
            str += ";secure";
        }
    }
    document.cookie = str;
}

/*
获取cookie
参数列表
 */
function getCookie(name) {//"username"
    var str = document.cookie;//username=admin; password=123456
    var reg = /\s/ig;
    str = str.replace(reg,"");//username=admin;password=123456
    var arr = str.split(";");//["username=admin","password=123456"]
    for(var i=0;i<arr.length;i++){
        var arr2 = arr[i].split("=");//["username","admin"];
        if(arr2[0] == encodeURIComponent(name)){//encodeURIComponent编码
            return decodeURIComponent(arr2[1]);//decodeURIComponent解码
        }
    }
    return "";//什么都没有，返回空，结束获取
}
/*
移除cookie
 */
function removeCookie(name) {
    document.cookie = name+"= "+";expires="+new Date();
}

















