const path1 = "leyou.fangte.com/project/api/ParkItem/";
const url = $request.url;
const body = $response.body;

if (url.indexOf(path1) != -1) {
  let items = JSON.parse(body);
  let itemArray = items.data;
  for(j = 0,len=itemArray.length; j < len; j++) {
    let item = itemArray[j];
    if(item.waitTime>0){
      items.data[j].heightStr= "需等候"+item.waitTime+"分钟 "+item.heightStr;
    }
  }
  //$notification.post("太原方特东方神画", "点击具体项目", "可查看排队时间");
  $done({ body: JSON.stringify(items) });
}
$done({});
