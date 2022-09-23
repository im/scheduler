const request = require('request')

const login = () => {
    console.log('process.env.API_URL: ', process.env.USERNAME)
    return new Promise((reslove, reject) => {
        request(
            {
                url: `https://langeasy.com.cn/login.action`,
                method: 'post',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                    Origin: 'https://www.langeasy.com.cn'
                },
                formData: {
                    name: process.env.USERNAME || '81195314@qq.com',
                    passwd: process.env.PASSWORD || 'Txiaomi258417'
                }
            },
            function (error, response, body) {
                if (!error && response.statusCode == 200) {
                    reslove(response.headers['set-cookie'])
                } else {
                    reject(error)
                }
            }
        )
    })

}

exports.cookie = async () => {

    const cookies = await login()
    const HOST = 'https://langeasy.com.cn'

    const j = request.jar()
    const obj = {}
    cookies.forEach((cookie) => {
        const c = cookie.split('=')
        obj[c[0]] = c[1]
    })
    const cookie1 = request.cookie(`acw_tc=${obj.acw_tc}`)
    const cookie2 = request.cookie(`user_web_token=${obj.user_web_token}`)
    j.setCookie(cookie1, HOST)
    j.setCookie(cookie2, HOST)
    return j
}
