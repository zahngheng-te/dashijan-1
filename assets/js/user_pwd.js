$(function () {
    var form = layui.form

    form.verify({
        pwd: [
            /^[\S]{6,12}$/
            , '新密码必须6-2位，且不能有空格！'
        ],
        newPwd: function (value) {
            var pwd = $('[name=oldPwd]').val()
            if (value === pwd) {
                return '不能和旧密码一样！'
            }

        },
        samePwd: function (value) {
            var val = $('[name=newPwd]').val()
            if (value !== val) {
                return '两次密码不一致！'
            }

        }


    })


    $('#form').on('submit', function (e) {
        e.preventDefault()
        $.ajax({
            type: 'POST',
            url: '/my/updatepwd',
            data: $(this).serialize(),
            success: function (res) {
                if (res.status !== 0) {
                    return layui.layer.msg('密码修改失败！')
                }

                layui.layer.msg('密码修改成功！')
                $('#form')[0].reset()

            }


        })
    })
})