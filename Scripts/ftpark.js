const path1 = "loc.map.baidu.com";
const url = $request.url;
const body = $response.body;
var fakePoi = {"content":{"addr":{"adcode":"140122","city":"太原市","city_code":"176","country":"中国","country_code":"0","district":"阳曲县","province":"山西省","town":"侯村乡"},"bldg":"","floor":"","navi":",,,","point":{"x":"112.644566","y":"38.045453"},"radius":"5.000000","sema":{"aptag":"在太原方特办公楼附近","aptagd":{"pois":[{"addr":"方特主题乐园","pid":"10287195336231470228","pname":"太原方特办公楼","pr":0.99000000,"tags":"房地产;写字楼"},{"addr":"山西省太原市阳曲县阳兴大道","pid":"15273452397609876702","pname":"方特东方神画","pr":0.99000000,"tags":"旅游景点;游乐园"},{"addr":"山西省太原市阳曲县","pid":"15891938541242695081","pname":"方特停车场","pr":0.99000000,"tags":"交通设施;停车场"}]}}},"result":{"error":"161","time":"2021-08-05 11:20:30"}};
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

if (url.indexOf(path1) != -1) {
    let realPoi = JSON.parse(body);
    if(realPoi.result.error == 161) {
      fakePoi.result.time = getDateFormat();
      let fakePoiStr=JSON.stringify(fakePoi);
      console.log(fakePoiStr);
      $done({ body: fakePoiStr });
    }else{
      console.log(body);
      $done({ body: body });
    }
}else{
    $done({ body: body });
}
