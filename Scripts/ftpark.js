const path1 = "leyou.fangte.com/project/api/ParkItem/";
const url = $request.url;
var headers = $request.headers;

var getDateFormat = function(options){
  options = options || {};
  options.sign = options.sign || 'yyyy-MM-dd HH:mm:ss';
  var _complete = function(n){
   return (n>9) ? n : '0' + n;
  }
  var d = new Date();
  var year = d.getFullYear();
  var month = _complete(d.getMonth()+1);
  var day = _complete(d.getDate());
  var hours = _complete(d.getHours());
  var minutes = _complete(d.getMinutes());
  var second = _complete(d.getSeconds());
  var result = options.sign;
  result = result.replace('yyyy', year);
  result = result.replace('MM', month);
  result = result.replace('dd', day);
  result = result.replace('HH', hours);
  result = result.replace('mm', minutes);
  result = result.replace('ss', second);
  return result;
}

/**
 * @description base64编码方法
 * @param val 需要编码的字符串
 * @return 返回编码好的base64字符串
 *	中文进行编码时，需要使用base64Encode(encodeURIComponent(a))
 */
function base64Encode(val){
	var base64hash = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';
	val=encodeURIComponent(val);
    //把字符串转换为字符数组
    var strArr = val.split('');
 
    //装入结果的数组
    var result = [];
    //每个字符的ascii码
    var asciiCode;
    //上一个字符的ascii码
    var prevAsciiCode;
 
    var mod;
    //未填充之前的数组与3的模
    var preMod = strArr.length % 3;
 
    //使字符数组组成三个一组
    if(preMod == 1){
        strArr.push(null);
        strArr.push(null);
    }
    if(preMod == 2) strArr.push(null);
    //遍历整个数组，寻找每个字符的ascii码
    for(var index in strArr){
        if(!strArr[index]){
            asciiCode = 0;
        }
        else{
            asciiCode = strArr[index].charCodeAt();
        }
        //位于一组当中的第几个字符
        mod = index % 3;
        switch(mod){
            case 0:
                //往右移2位
                result.push(base64hash[asciiCode >> 2]);
                break;
            case 1:
                //上一个ascii码往左移4位与现在的ascii码往右移四位做或操作
                result.push(base64hash[(prevAsciiCode & 3) << 4 | asciiCode >> 4]);
                break;
            case 2:
				//假设当前组的ascii为：01000111,00000011,00000000
				//2表示当前索引位于第三个，第二个ascii码和15相与，获得低四位的值，右移两位后再从第三个ascii获取高二位作为新6位数的低二位
                result.push(base64hash[(prevAsciiCode & 15) << 2 | asciiCode >> 6]);
				//与2的6次方减1相与，获得低6位的值
                result.push(base64hash[asciiCode & 63]);
                break
        }
 
        prevAsciiCode = asciiCode
    }
 
    //处理异常
    if(preMod == 1) {
        result.splice(result.length - 2,2);
        result.push('==');
    }
    else if(preMod == 2) {
        result.pop();
        result.push('=');
    }
 
    return result.join('');
}

/**
 * Base64译码
 * @param val base编码后的字符串
 * @returns {string} 原字符串
 */
function base64Decode(val){
	var base64hash = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';
 
    //把字符串转换为字符数组
    var strArr = val.split('');
 
    //装入结果的数组
    var result = [];
	var preCode;
	var code;
	//余数，1-3
	var n;
	for(var i in strArr){
		n=i%4;
		code=base64hash.indexOf(strArr[i]);
		switch(n){
			case 0:
				preCode=base64hash.indexOf(strArr[i]);
				break;
			case 1:
				result.push(String.fromCharCode(preCode<<2|(code&48)>>4));
				break;
			case 2:
				result.push(String.fromCharCode((preCode&15)<<4 |(code&60)>>2));
				break;
			case 3:
				result.push(String.fromCharCode(((preCode&3)<<6)|code));
				break;	
				
		}
		preCode=code;
		
	}
	
	return decodeURIComponent(result.join(''));
}


if (url.indexOf(path1) != -1) {
  let realStr = decodeURIComponent(base64Decode(headers['ftly-appclientinfo']));
  console.log(realStr);
  let realObj = JSON.parse(realStr);
  if(realObj) {
    realObj.LngLat = "112.657366|38.051506";
    let fakeStr=JSON.stringify(realObj);
    console.log(fakeStr);
    headers['ftly-appclientinfo'] = base64Encode(encodeURIComponent(fakeStr));
    console.log(headers['ftly-appclientinfo']);
  }else{
    console.log("not modified");
  }
  $done({ headers });
}else{
    $done({ headers });
}
