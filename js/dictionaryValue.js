$("#form-body input[type='text']").attr("maxlength","50");

 Array.prototype.indexOf = function(val) {
        for (var i = 0; i < this.length; i++) {
            if (this[i] == val) return i;
        }
        return -1;
    };
Array.prototype.remove = function(val) {
	var index = this.indexOf(val);
	if (index > -1) {
		this.splice(index, 1);
	}
};
//获取传递参数，
var pageObj={};
var url = decodeURI(location.search); //获取url中"?"符后的字串 ('?modFlag=business&role=1')
if ( url.indexOf( "?" ) != -1 ) {
    var str = url.substr( 1 ); //substr()方法返回从参数值开始到结束的字符串；
    var strs = str.split( "&" );
    for ( var i = 0; i < strs.length; i++ ) {
        pageObj[ strs[ i ].split( "=" )[ 0 ] ] = ( strs[ i ].split( "=" )[ 1 ] );
    }
}

var DictionaryValueGet={
    //IP地址
    IPAddress: 'http://39.97.173.220:81/fingercn',
    manageListBtn:[],
    //请求成功方法
    responseHandler:function(result) {
        return{
            total: result.totalRow, //总页数,前面的key必须为"total"
            data: result.resourceList
        }
    },
    //添加提交
    ajaxForm:function (TipText,HtmlUrl,HttpMethod) {
        var textNone = $(".textNone");
        var flag = true;
        for(var i=0; i<textNone.length; i++){
            if($(textNone[i]).val() === ""){
                flag = false;
                alert("*必填项不能为空")
                break ;
            }
        }
        if(flag == true ){
            var FormBody= $("#form-body")[0];
            var FormDataQuery = new FormData(FormBody);
            console.log(FormDataQuery)
            $.ajax({
                url:DictionaryValueGet.IPAddress+'/'+HttpMethod+'/save',
                type : "POST",
                processData: false,
                contentType: false,
                data:FormDataQuery,
                xhr: function(aa){
                    console.log(aa)
                    var xhr = $.ajaxSettings.xhr();
                    if(onprogress && xhr.upload) {
                        xhr.upload.addEventListener("progress" , onprogress, false);
                        return xhr;
                    }
                },
                success : function(data) {
                    if(data.status===1){
                        $.toast({
                            text: TipText+'成功',
                            icon: 'success',
                            bgColor: '#00a65a',
                            textColor: 'white',
                            position:'mid-center',
                            afterHidden: function () {
                                window.location.href =HtmlUrl+'.html?pageNumber='+pageObj.pageNumber;
                            }
                        })
                    }else{
                        alert(data.errMsg)
                    }
                }
            })
        }


    },
    //添加轮播图
    addBanner:function  (resourceId) {
        $("input[name='resourceId']").val(resourceId)
    },
    addBannerAjaxForm:function (bannerType) {
        var textNone = $(".textNone");
        var flag = true;
        for (var i = 0; i < textNone.length; i++) {
            if ($(textNone[i]).val() === "") {
                flag = false;
                alert("*必填项不能为空")
                break;
            }
        }
        if (flag == true) {
            var FormBody = $("#form-body")[0];
            var FormDataQuery = new FormData(FormBody);
            $.ajax({
                url: DictionaryValueGet.IPAddress + '/' + bannerType + '/bannerAdd',
                type: "POST",
                processData: false,
                contentType: false,
                data: FormDataQuery,
                xhr: function () {
                    var xhr = $.ajaxSettings.xhr();
                    if (onprogress && xhr.upload) {
                        xhr.upload.addEventListener("progress", onprogress, false);
                        return xhr;
                    }
                },
                success: function (data) {
                    if (data.status === 1) {
                        $.toast({
                            text: '添加成功',
                            icon: 'success',
                            bgColor: '#00a65a',
                            textColor: 'white',
                            position: 'mid-center',
                            afterHidden: function () {
                                $('#myModal').modal('hide')
                            }
                        })
                    } else {
                        alert(data.errMsg)
                    }
                }
            })
        }
    }

};

