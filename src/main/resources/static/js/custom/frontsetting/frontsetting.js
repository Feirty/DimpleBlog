$(function () {
    initSummernote();
    $("#publishSignature").click(function () {
        var data = {
            key: "signature",
            value: $("#summernote").summernote("code"),
        };
        $.ajax({
            url: "/api/setting",
            data: data,
            type: "PUT",
            dataType: "json",
            success: function (result) {
                if (result.code == web_status.SUCCESS) {
                    Swal({
                        type: 'success',
                        title: '签名档已成功发送到服务器',
                        showConfirmButton: true,
                    });
                    //清空表单数据
                    cleanForm();
                } else {
                    $.modal.msgError(result.msg);
                }
            }
        })
    });
    $("#giveUp").click(function () {
        Swal({
            title: '确定要放弃吗？',
            text: "注意，这个操作不可逆！",
            type: 'info',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: '是，删除它',
            cancelButtonText: "容我三思", animation: false,
            customClass: 'animated bounce'

        }).then(function (isConfirm) {
            if (!isConfirm.value) {
                return;
            }
            cleanForm();
            Swal(
                '已完成',
                '世界安静了',
                'success'
            );
        });
    });
});

//清空表单数据
function cleanForm() {
    var content = $("#summernote").summernote("code", "");
}

var previewFlag = true;
/**
 * 编辑或者预览
 */
var editOrPreview = function (target) {
    if (previewFlag) {
        var markup = $('.summernote').summernote('code');
        $('.summernote').summernote('destroy');
        $(target).html("<i class=\"fa fa-pencil\"></i>" + "编辑");
        previewFlag = false;
    } else {
        // $('.summernote').summernote({focus: true});
        initSummernote();
        $(target).html("<i class=\"fa fa-pencil\"></i>" + "预览");
        previewFlag = true;
    }
};

/**
 * 上传图片
 */
function uploadImage() {
    var title = "上传图片";
    var url = "/page/imageUploadPage";
    var width = $(window).width() / 1.5;
    var height = $(window).height() / 1.2;
    //如果是移动端，就使用自适应大小弹窗
    if (navigator.userAgent.match(/(iPhone|iPod|Android|ios)/i)) {
        width = 'auto';
        height = 'auto';
    }
    if ($.common.isEmpty(title)) {
        title = false;
    }
    if ($.common.isEmpty(url)) {
        url = "/404.html";
    }
    if ($.common.isEmpty(width)) {
        width = 800;
    }
    if ($.common.isEmpty(height)) {
        height = ($(window).height() - 50);
    }
    layer.open({
        type: 2,
        area: [width + 'px', height + 'px'],
        fix: false,
        //不固定
        maxmin: true,
        shade: 0.3,
        title: title,
        content: url,
        btn: ['<i class="fa fa-check"></i> 确认', '<i class="fa fa-close"></i> 关闭'],
        // 弹层外区域关闭
        shadeClose: true,
        yes: function (index, layero) {
            var iframeWin = layero.find('iframe')[0];
            var data = iframeWin.contentWindow.submitHandler();
            $("#header").attr("src", data);
            iframeWin.contentWindow.closeLocal();
        },
        cancel: function (index) {
            return true;
        }
    });
}

var $summernote;

//调用富文本编辑
function initSummernote() {
    var height = 400;
    $summernote = $('#summernote').summernote({
        height: height,
        minHeight: null,
        lang: 'zh-CN',
        maxHeight: null,
        focus: true,
        //调用图片上传
        callbacks:
            {
                onImageUpload: function (files) {
                    sendFile($summernote, files[0]);
                },
                onMediaDelete: function (target) {
                    var imgSrc = target.context.currentSrc;
                    $.ajax({

                        data: {
                            fileUrl: imgSrc
                        },
                        type: "DELETE",
                        url: "/api/summernote/image",
                        dataType: "json",
                        success: function (data) {

                        }
                    });
                }
            }
    });

}

//ajax上传图片
function sendFile($summernote, file) {
    var formData = new FormData();
    formData.append("file", file);
    $.ajax({
        url: "/api/summernote/image",
        data: formData,
        cache: false,
        contentType: false,
        processData: false,
        type: 'POST',
        success: function (result) {
            if (result.code == web_status.SUCCESS) {
                $summernote.summernote('insertImage', result.data, function ($image) {
                    $image.attr('src', result.data);
                });
            } else {
                $.modal.alertError(result.msg);
            }
        }
    });
}