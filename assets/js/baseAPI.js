$.ajaxPrefilter(function (option) {
    // 地址
    option.url = 'http://www.liulongbin.top:3007' + option.url

    // 给有权限接口设置
    if (option.url.indexOf('/my/') !== -1) {

        option.headers = {
            Authorization: localStorage.getItem('token')

        }
    }

    // 用户访问权限
    option.complete = function (rse) {
        if (rse.responseJSON.status === 1 && rse.responseJSON.message === '身份认证失败！') {
            localStorage.removeItem('token')
            location.href = '/login.html'
        }
    }
})