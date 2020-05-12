/**
 * @fileoverview Template to compose HTTP reqeuest.
 * 
 */

const url = 'https://h5.qzone.qq.com/proxy/domain/vip.qzone.qq.com/fcg-bin/v2/fcg_mobile_vip_site_checkin?t=0.6967210716180412&g_tk=1580120859';
const method = 'POST';
const headers = {
'X-Requested-With' : 'XMLHttpRequest',
'Connection' : 'keep-alive',
'Accept-Encoding' : 'gzip, deflate, br',
'Content-Type' : 'application/x-www-form-urlencoded',
'Origin' : 'https://h5.qzone.qq.com',
'User-Agent' : 'Mozilla/5.0 (iPhone; CPU iPhone OS 13_5 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/17F5065a QQ/8.3.5.6 V1_IPH_SQ_8.3.5_5_TF_T Pixel/1242 SimpleUISwitch/0 QQTheme/1000 Core/WKWebView Device/Apple(iPhone XS Max) NetType/WIFI QBWebViewType/1 WKType/1',
'Cookie' : 'skey=M7WQFVtVFf; uin=o2550499507; p_skey=SnnOjjCs7PRt1RL1vFZgAEkgUVcAEXdMPnknMLCO-Ns_; p_uin=o2550499507; qq_locale_id=2052; pgv_info=ssid=s3031680178; pgv_pvid=3920882635',
'Host' : 'h5.qzone.qq.com',
'Referer' : 'https://h5.qzone.qq.com/vip/score?_proxy=1',
'Accept-Language' : 'zh-cn',
'Accept' : 'application/json'
};
const body = 'uin=2550499507&format=json&inCharset=utf-8&outCharset=utf-8';

const myRequest = {
    url: url,
    method: method,
    headers: headers,
    body: body
};

$task.fetch(myRequest).then(response => {
var obj = JSON.parse(response.body);
if (obj.code == "0") {
    console.log(response.statusCode + "\n\n" + response.body);
      $notify("QQ黄钻", "签到结果:成功",obj.message);
    } else if (obj.code == "-10000") {
      console.log("failure response: \n" + response.body);
      $notify("QQ黄钻","签到结果:成功（重复签到）",obj.message);
}
});

/*
[JS Console]: 200

{
	"code":-10000,
	"subcode":-10135,
	"message":"每天只需要签到一次哦！",
	"notice":0,
	"time":1589249662,
	"tips":"99AF-268"
}

*/

/*
$task.fetch(bonus).then(response => {
  var obj = JSON.parse(response.body);
  if (obj.code == "-10000") {
    console.log(response.statusCode + "\n\n" + response.body);
      $notify("黄钻签到", "");
    } else {
      console.log("failure response: \n" + response.body);
      $notify("黄钻签到" + obj.message + "⚠️");
}
});

*/
