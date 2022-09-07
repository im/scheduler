

const OUTPUT_PATH = 'dist/test.txt'

const fs = require('fs-extra')

fs.removeSync(OUTPUT_PATH)


fs.outputFileSync(OUTPUT_PATH, getCurrentTime())

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