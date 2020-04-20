/*
Check in for Surge by Neurogram

 - 
 - 
 - 
 - 

https://www.notion.so/neurogram/Check-in-0797ec9f9f3f445aae241d7762cf9d8b


Telegram: Neurogram
GitHub: Neurogram-R
*/

const accounts = [
    ["ssrcloud", "https://www.clashcloud.net/auth/login", "2550499507@qq.com", "ml123456"],
    ["GGboom", "https://ggboom.site/auth/login", "账号", "密码"],
    
]

async function launch() {
    for (var i in accounts) {
        let title = accounts[i][0]
        let url = accounts[i][1]
        let email = accounts[i][2]
        let password = accounts[i][3]
        await login(url, email, password, title)
    }
    $done();
}

launch()

function login(url, email, password, title) {
    let loginPath = url.indexOf("auth/login") != -1 ? "auth/login" : "user/_login.php"
    let table = {
        url: url.replace(/(auth|user)\/login(.php)*/g, "") + loginPath,
        header: {

        },
        body: {
            "email": email,
            "passwd": password,
            "rumber-me": "week"
        }
    }
    $httpClient.post(table, async function (error, response, data) {
        if (error) {
            console.log(error);
            $notification.post(title + '', error, "");
        } else {
            await checkin(url, title)
        }
    }
    );
}

function checkin(url, title) {
    let checkinPath = url.indexOf("auth/login") != -1 ? "user/checkin" : "user/_checkin.php"
    $httpClient.post(url.replace(/(auth|user)\/login(.php)*/g, "") + checkinPath, async function (error, response, data) {
        if (error) {
            console.log(error);
            $notification.post(title + '', error, "");
        } else {
            await dataResults(url, JSON.parse(data).msg, title)
        }
    });
}

function dataResults(url, checkinMsg, title) {
    let userPath = url.indexOf("auth/login") != -1 ? "user" : "user/index.php"
    $httpClient.get(url.replace(/(auth|user)\/login(.php)*/g, "") + userPath, function (error, response, data) {
        var usedData = data.match(/(>*\s*(||\s\d.+?%|))[^B]+/)
        if (usedData) {
            usedData = usedData[0].match(/\d\S*(K|G|M|T)/)
            var restData = data.match(/(>*\s*(|)(||\s\d.+?%|))[^B]+/)
            restData = restData[0].match(/\d\S*(K|G|M|T)/)
            $notification.post(title, checkinMsg, "" + usedData[0] + "B" + "\n" + restData[0] + "B");
        } else {
            $notification.post(title + '', "", "");
        }
    });
}
