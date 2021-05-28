const path1 = "newsmth.net";
const url = $request.url;
const body = $response.body;

if (url.indexOf(path1) != -1) {
    let obj = JSON.parse(body);
    let articles = obj.data.articles;
    for(j = 0,len=articles.length; j < len; j++) {
      articles[j].body.replace(/<div class=\\"article-quote\\">/, '<br\/><div class=\\"article-quote\\">');
    }
    console.log(JSON.stringify(obj));
    $done({ body: JSON.stringify(obj) });
}else{
    $done({});
}
