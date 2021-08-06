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

function base64Encode(val){	
  var base64hash = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';
  var strArr = val.split('');

  var result = [];
  var asciiCode;
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

function base64Decode(str) {
  var c1, c2, c3, c4;
  var i, len, out;
  var base64DecodeChars = [
    -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
    -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
    -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 62, -1, -1, -1, 63,
    52, 53, 54, 55, 56, 57, 58, 59, 60, 61, -1, -1, -1, -1, -1, -1,
    -1, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14,
    15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, -1, -1, -1, -1, -1,
    -1, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40,
    41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, -1, -1, -1, -1, -1
  ];
  len = str.length;
  i = 0;
  out = "";
  while(i < len) {
    /* c1 */
    do {
      c1 = base64DecodeChars[str.charCodeAt(i++) & 0xff];
    } while(i < len && c1 == -1);
    if(c1 == -1)
      break;
    /* c2 */
    do {
      c2 = base64DecodeChars[str.charCodeAt(i++) & 0xff];
    } while(i < len && c2 == -1);
    if(c2 == -1)
      break;
    out += String.fromCharCode((c1 << 2) | ((c2 & 0x30) >> 4));
    /* c3 */
    do {
      c3 = str.charCodeAt(i++) & 0xff;
      if(c3 == 61)
        return out;
      c3 = base64DecodeChars[c3];
    } while(i < len && c3 == -1);
    if(c3 == -1)
      break;
    out += String.fromCharCode(((c2 & 0XF) << 4) | ((c3 & 0x3C) >> 2));
    /* c4 */
    do {
      c4 = str.charCodeAt(i++) & 0xff;
      if(c4 == 61)
        return out;
      c4 = base64DecodeChars[c4];
    } while(i < len && c4 == -1);
    if(c4 == -1)
      break;
    out += String.fromCharCode(((c3 & 0x03) << 6) | c4);
  }
  return out;
}

if (url.indexOf(path1) != -1) {
  let realStr = base64Decode(headers['ftly-appclientinfo']);
  console.log(realStr);
  let realObj = JSON.parse(realStr);
  if(realObj) {
    realObj.LngLat = "112.657366|38.051506";
    let fakeStr=JSON.stringify(realObj,null,2);
    console.log(fakeStr);
    headers['ftly-appclientinfo'] = base64Encode(fakeStr);
    console.log(headers['ftly-appclientinfo']);
  }else{
    console.log("not modified");
  }
  $done({ headers });
}else{
    $done({ headers });
}
