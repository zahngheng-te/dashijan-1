$(function () {
    var layer = layui.layer
    var form = layui.form
    form.verify({
        nickname: [
            /^[\S]{2,6}$/
            , '昵称必须为2-6位，且不能出现空格'
        ]
    })
    initUserInfo()

    function initUserInfo() {
        $.ajax({
            type: 'GET',
            url: '/my/userinfo',
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg('获取用户信息失败！')
                }
                form.val('f1', res.data)
            }

        })
    }


    $('#btnReset').on('click', function (e) {
        e.preventDefault()


        initUserInfo()
    })


    $('#from').on('submit', function (e) {
        e.preventDefault()

        $.ajax({
            type: 'POST',
            url: '/my/userinfo',
            data: $(this).serialize(),
            success: function (res) {
                console.log(res.status)
                if (res.status !== 0) {
                    return layer.msg('更新用户信息失败！')
                }

                layer.msg('更新用户信息成功！')
                window.parent.getUserInfo()


            }
        })
    })

})