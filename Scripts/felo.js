const path1 = "translator.felo.me/api/user/plan";
const url = $request.url;
const body = $response.body;

if (url.indexOf(path1) != -1) {
  let items = JSON.parse(body);
  let itemArray = items.data.user_product_total;
  for(j = 0,len=itemArray.length; j < len; j++) {
    let item = itemArray[j];
    if(item.balance>0){
      items.data.user_product_total[j].balance= 1700;
    }
  }
  $done({ body: JSON.stringify(items) });
}
$done({});
