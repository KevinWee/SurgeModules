const path1 = "leyou.fangte.com/project/api/ParkItem/";
const url = $request.url;
const body = $response.body;

if (url.indexOf(path1) != -1) {
  let items = JSON.parse(body);
  let itemArray = items.data;
  let itemStr="";
  for(j = 0,len=itemArray.length; j < len; j++) {
    let item = itemArray[j];
    if(item.waitTime>0){
      itemStr = itemStr + item.itemName+" "+item.distanceStr+" 需等候"+item.waitTime+"分钟 "+item.heightStr+"\r\n";
    }
  }
  if(itemStr!=""){
    $notification.post("方特排队时间", "方特排队", itemStr);
  }
  console.log(itemStr);
}
$done({ body: body });
