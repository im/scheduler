const login = require('./login')
const request = require('request')
const fs = require('fs-extra')
const distDir = 'dist/1.json'


const getWords = async (page, cookie) => {
    return new Promise((reslove, reject) => {
        request(
            {
                url: `https://langeasy.com.cn/getUserNewWord.action?page=${page}&time=${new Date().getTime()}`,
                method: 'get',
                jar: cookie
            },
            async (error, response, body) => {
                if (!error && response.statusCode == 200) {
                    reslove(JSON.parse(body))
                } else {
                    reject(error)
                }
            }
        )
    })
}

function getCurrentTime() {
    var date = new Date();//当前时间
    var year = date.getFullYear() //年
    var month = repair(date.getMonth() + 1);//月
    var day = repair(date.getDate());//日
    var hour = repair(date.getHours());//时
    var minute = repair(date.getMinutes());//分
    var second = repair(date.getSeconds());//秒

    //当前时间 
    var curTime = year + "-" + month + "-" + day
        + " " + hour + ":" + minute + ":" + second;
    return curTime;
}
//若是小于10就加个0
function repair(i) {
    if (i >= 0 && i <= 9) {
        return "0" + i;
    } else {
        return i;
    }
}


const run = async () => {

    const cookie = await login.cookie()

    const data = await getWords(1, cookie)
    data.curTime = getCurrentTime()

    fs.outputFileSync(distDir, JSON.stringify(data))




}



run()





// const OUTPUT_PATH = 'dist/test.txt'

// const fs = require('fs-extra')

// fs.removeSync(OUTPUT_PATH)


// console.log('process.env.USERNAME', process.env.USERNAME)
// console.log('process.env.PASSWORD', process.env.PASSWORD)


// fs.outputFileSync(OUTPUT_PATH, getCurrentTime())

