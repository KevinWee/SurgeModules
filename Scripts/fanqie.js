const path1 = "xgys.me";
const url = $request.url;
const body = $response.body;

if (url.indexOf(path1) != -1) {
    let obj = JSON.parse(body);
    obj.data.playAd = 0;
    obj.data.splashAd = 0;
    obj.data.playSwitchAd = 0;
    //console.log(JSON.stringify(obj));
    $done({ body: JSON.stringify(obj) });
}else{
    $done({});
}
