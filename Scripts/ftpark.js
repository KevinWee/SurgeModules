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

function base64Encode(input){
  let rv = encodeURIComponent(input);
  rv = unescape(rv);
  rv = window.btoa(rv);
  return rv;
}

function base64Decode(input){
  let rv = window.atob(input);
  rv = escape(rv);
  rv = decodeURIComponent(rv);
  return rv;
}

if (url.indexOf(path1) != -1) {
  let realStr = base64Decode(headers['ftly-appclientinfo']);
  console.log(realStr);
  let realObj = JSON.parse(realStr);
  if(realObj) {
    realObj.LngLat = "112.657366|38.051506";
    let fakeStr=JSON.stringify(realObj);
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
