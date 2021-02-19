//图片上传预览功能
var userAgent = navigator.userAgent;//用于判断浏览器类型
// 存储更新所选文件
var curFiles = [];
$("body .file").change(function () {
    var picDiv=$(this).parents(".picDiv");
    var docObj =$(this)[0];//获取选择图片的对象
    var fileList = docObj.files;//得到所有的图片文件
    Array.prototype.push.apply(curFiles, fileList);  // 原始FileList对象不可更改，所以将其赋予curFiles提供接下来的修改
    var suffix=getFileType(this.name);
    if(suffix==".mp4"||suffix==".ogg"||suffix==".ogv"){  //根据后缀，判断是否符合图片格式
        for (var i = 0; i < fileList.length; i++) {
            var picHtml="<div class='imageDiv' style='width: 400px;height: 200px;'>" +
                "<video id='video" + fileList[i].name + "' controls=\"controls\" height=\"200\" width=\"400\">\n" +
                " your browser does not support the video tag\n" +
                " </video><div class='cover'><i class='delbtn' data-name='"+fileList[i].name+"' onclick='deleteImg(this,\"#video\")'>删除</i></div></div>"
            picDiv.prepend(picHtml);
            $(this).parents(".addImages").css({display:'none'})
            //获取视频的对象
            var imgObjPreview = document.getElementById("video"+fileList[i].name);
            if (fileList && fileList[i]) {
                imgObjPreview.style.display = 'block';
                imgObjPreview.style.width = '400px';
                imgObjPreview.style.height = '200px';
                //1图片预览start
                if(userAgent.indexOf('MSIE') == -1){//IE以外浏览器 //window.URL.createObjectURL得到的是一个http文件格式
                    //火狐7以上版本不能用上面的getAsDataURL()方式获取，需要以下方式
                    console.log(window.URL.createObjectURL(docObj.files[i]))
                    imgObjPreview.src = window.URL.createObjectURL(docObj.files[i]); //获取上传图片文件的物理路径
                }else{//IE浏览器
                    if(docObj.value.indexOf(",")!=-1){
                        var srcArr=docObj.value.split(",");
                        imgObjPreview.src = srcArr[i];
                    }else{
                        imgObjPreview.src = docObj.value;
                    }
                }

            }
        }
    }else if(suffix==".bmp"||suffix==".png"||suffix==".gif"||suffix==".jpg"||suffix==".jpeg"){
        for (var i = 0; i < fileList.length; i++) {
            var picHtml="<div class='imageDiv' > <img id='img" + fileList[i].name + "' /> <div class='cover'>" +
                "<i class='delbtn' data-name='"+fileList[i].name+"' onclick='deleteImg(this,\"#image\")'>删除</i></div></div>"
            picDiv.prepend(picHtml);
            $(this).parents(".addImages").css({display:'none'})
            //获取图片imgi的对象
            var imgObjPreview = document.getElementById("img"+fileList[i].name);
            if (fileList && fileList[i]) {
                imgObjPreview.style.display = 'block';
                imgObjPreview.style.width = '100px';
                imgObjPreview.style.height = '100px';
                //1图片预览start
                if(userAgent.indexOf('MSIE') == -1){//IE以外浏览器 //window.URL.createObjectURL得到的是一个http文件格式
                    //火狐7以上版本不能用上面的getAsDataURL()方式获取，需要以下方式
                    console.log(window.URL.createObjectURL(docObj.files[i]))
                    imgObjPreview.src = window.URL.createObjectURL(docObj.files[i]); //获取上传图片文件的物理路径
                }else{//IE浏览器
                    if(docObj.value.indexOf(",")!=-1){
                        var srcArr=docObj.value.split(",");
                        imgObjPreview.src = srcArr[i];
                    }else{
                        imgObjPreview.src = docObj.value;
                    }
                }
            }
        }
    }else if(suffix==".wav"||suffix==".mp3"||suffix==".ogg"||suffix==".acc"||suffix==".webm") {
        for (var i = 0; i < fileList.length; i++) {
            var picHtml = "<div class='imageDiv' > <audio id='music" + fileList[i].name + "' controls=\"controls\">" +
                " your browser does not support the audio tag" +
                " </audio><div class='cover' style='width: 0;height: 0;line-height: 0'><i class='delbtn' data-name='" + fileList[i].name + "' onclick='deleteImg(this,\"#music\")'>X</i></div></div>"
            picDiv.prepend(picHtml);
            $(picDiv).css({width:'auto','min-height':'auto'})
            $(this).parents(".addImages").css({display: 'none'})
            //获取音频的对象
            var imgObjPreview = document.getElementById("music"+fileList[i].name);
            if (fileList && fileList[i]) {
                if(userAgent.indexOf('MSIE') == -1){//IE以外浏览器 //window.URL.createObjectURL得到的是一个http文件格式
                    //火狐7以上版本不能用上面的getAsDataURL()方式获取，需要以下方式
                    console.log(window.URL.createObjectURL(docObj.files[i]))
                    imgObjPreview.src = window.URL.createObjectURL(docObj.files[i]); //获取上传图片文件的物理路径
                    var duration;
                    imgObjPreview.addEventListener("loadedmetadata", function (_event) {
                        formatSeconds(imgObjPreview.duration)
                        $("input[name='timeLength']").val(formatSeconds(imgObjPreview.duration))
                    });
                }else{//IE浏览器
                    if(docObj.value.indexOf(",")!=-1){
                        var srcArr=docObj.value.split(",");
                        imgObjPreview.src = srcArr[i];
                    }else{
                        imgObjPreview.src = docObj.value;
                    }
                }

            }

        }
    }

});

/*删除功能*/
function deleteImg(that,id) {
    var picName = $(that).attr("data-name");
    $(that).parents('.picDiv').find("input[type='file']").val("")
    /*$(id).val("")*/
    curFiles = curFiles.filter(function(curFiles) {
        return curFiles.name !== picName;
    });
    $(that).parents(".imageDiv").remove();
    $(".addImages").css({display:'block'})
}

//判断类型
function getFileType(id){
    var dom=document.getElementById(id).value;//根据id得到值
    var index=dom.lastIndexOf(".")//得到最后一个"."在第几位
    return dom.substring(index).toLowerCase(); //截断"."之前的，得到后缀[忽略大写]
}
/**
 * 侦查附件上传情况 ,这个方法大概0.05-0.1秒执行一次
 */
function onprogress(evt){
    var loaded = evt.loaded;     //已经上传大小情况
    var tot = evt.total;      //附件总大小
    var per = Math.floor(100*loaded/tot);  //已经上传的百分比
    $("#progress").html( per +"%" );
    $("#progress").css("width" , per +"%");
}
//时分秒计算
function formatSeconds(value) {
    var secondTime = parseInt(value);// 秒
    var minuteTime = 0;// 分
    var hourTime = 0;// 小时
    if (secondTime > 60) {//如果秒数大于60，将秒数转换成整数
        //获取分钟，除以60取整数，得到整数分钟
        minuteTime = parseInt(secondTime / 60);
        //获取秒数，秒数取佘，得到整数秒数
        secondTime = parseInt(secondTime % 60);
        //如果分钟大于60，将分钟转换成小时
        if (minuteTime > 60) {
            //获取小时，获取分钟除以60，得到整数小时
            hourTime = parseInt(minuteTime / 60);
            //获取小时后取佘的分，获取分钟除以60取佘的分
            minuteTime = parseInt(minuteTime % 60);
        }
    }
    var result = "" + parseInt(secondTime) + "秒";

    if (minuteTime > 0) {
        result = "" + parseInt(minuteTime) + "分" + result;
    }
    if (hourTime > 0) {
        result = "" + parseInt(hourTime) + "小时" + result;
    }
    return result;
}