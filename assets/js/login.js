$(function () {
    // 点击去注册链接跳转表单
    $('#login-a').on('click', function () {
        $('.login-box').hide()
        $('.reg-box').show()
    })
    // 点击去登录链接跳转表单
    $('#reg-a').on('click', function () {
        $('.reg-box').hide()
        $('.login-box').show()
    })

    // 密码验证
    layui.form.verify({
        pwd: [/^[\S]{6,12}$/, '密码必须为6-12位，不得有空格'],
        samePwd: function (value, ) {
            var val = $('.password-a').val()
            if (val !== value) {
                return '两次密码不一致，请重新设置'
            }
        }
    })

    // 注册表单
    $('#form-reg').on('submit', function (e) {
        e.preventDefault()

        $.ajax({
            type: "POST",
            url: "/api/reguser",
            data: $(this).serialize(),
            success: function (res) {
                if (res.status !== 0) {
                    return layui.layer.msg(res.message)
                }

                layui.layer.msg('注册成功，请登录')
                $('#reg-a').click()



            }
        })
    })

    // 登录表单
    $('#form-login').on('submit', function (e) {
        e.preventDefault()
        $.ajax({
            type: 'POST',
            url: "/api/login",
            data: $(this).serialize(),
            success: function (res) {
                if (res.status !== 0) {
                    return layui.layer.msg('用户名或密码错误，请重新输入')
                }
                layui.layer.msg('登录成功')
                localStorage.setItem('token', res.token)
                location.href = '/index.html'
            }
        })
    })

})

