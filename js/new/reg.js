
//配置模板
app.controller('ctrl', ['$scope', '$http', 'hostApis', function ($scope, $http, hostApis) {
    $scope.change=false;

    //发送验证码倒计时
    //num 按钮点击次数，cutdown 倒计时秒数
    var num=1,countdown = 60;
    $(".getYzm").on("click", function () {
        if ($(".mobile").val() == "")
        {
            //alert("请输入手机号");
            return false;
        }
        //手机正则通过才发送验证码
        var mobileRegx = "^1(3[0-9]|4[57]|5[0-35-9]|7[01678]|8[0-9])\\d{8}$";
        if ($(".mobile").val() == "" || $(".mobile").val().length != 11 || !$(".mobile").val().match(mobileRegx)) {
            return false;
        } else {
            countdown = countdown * num;
            num++;
            var obj = $(".getYzm");
            setTime(obj);

            //生成验证码
            $http({
                method: "post",
                url: hostApis + "/api/users/sendcode",
                //url: "http://localhost:13036/api/Users/SendCode",
                headers: {
                    "content-type": "application/x-www-form-urlencoded; charset=utf-8"
                },
                data: $.param({
                    mobile: $scope.phone
                }),
                cache: false
            }).then(function (data) {
               // alert(data.data.Message);
                console.log(data);
            });

        }
    });

    function setTime(obj) {
        if (countdown > 0) {
            obj.addClass("disabled").attr('disabled', true).html(+countdown + "s重发");
            countdown--;

        } else if (countdown == 0) {

            obj.removeClass("disabled").attr('disabled', false).html("获取验证码");
            countdown = 60;
            return;
        }
        setTimeout(function () {
            setTime(obj)
        }, 1000)
    }



    //ajax
    $("input[name=reg]").on("click", function () {
        $http({
            method: "post",
            url: hostApis + "/api/Users/RegisterCompany",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8"
                /* "authinfo": 11*/
            },
            data: $.param({
                Mobile: $(".mobile").val(),
                Code: $("input[name='yzm']").val(),
                Password: $(".password").val(),
                CompanyName: $(".CompanyName").val()
            }),
            cache: false
        }).then(function (data) {
            //$scope.data = data;
            var result=data.data;
            if (result.Stata == 200) {
                //alert("注册成功");
                location.href = 'regSuccess.html';
            }
            else{
               // alert(result.Message);
            }
        });
        event.preventDefault();//按钮为submit时，阻止form表单默认提交
    });
}]);