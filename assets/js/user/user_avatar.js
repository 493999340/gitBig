$(function () {
    var layer = layui.layer;
    var $image = $('#image');
    const options = {
        aspectRatio: 1,
        preview: '.img-preview'
    }
    $image.cropper(options);
    $('#btnChooseImage').on('click', function () {
        $('#file').click()
    })
    $('#file').on('change', function (e) {
        var fileList = e.target.files;
        if (fileList.length === 0) {
            return layer.msg('请选择文件!')
        }
        var file = e.target.files[0];
        var imageURL = URL.createObjectURL(file);
        $image.cropper('destroy').attr('src', imageURL).cropper(options)
    })
    $('#btnUpload').on('click', function () {
        var dataURL = $image
            .cropper('getCroppedCanvas', {
                // 创建一个 Canvas 画布
                width: 100,
                height: 100
            })
            .toDataURL('image/png')
        $.ajax({
            method: 'POST',
            url: '/my/update/avatar',
            data: {
                avatar: dataURL
            },
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg('更新头像失败!')
                }
                layer.msg('更新头像成功!');
                window.parent.getUserInfo();
            }
        })
    })
})