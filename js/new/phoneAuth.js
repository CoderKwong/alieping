//配置模板
app.controller('ctrl', ['$scope', '$http', 'hostApis', function ($scope, $http, hostApis) {
    //num 按钮点击次数，cutdown 倒计时秒数
    let num = 1, countdown = 60;
    $(".getYzm").on("click", function () {
        if ($("#mobile").val() == "") {
            //alert("请输入手机号");
            return false;
        }
        let obj = $(".getYzm");
        setTime(obj);
        //getYZM();//生成验证码
        $http({
            method: "post",
            url: hostApis + "/api/Users/SendCode",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8"
            },
            data: $.param({
                Mobile: $scope.Mobile
            }),
            cache: false
        }).then(function (data) {
            let d = data.data;
            //alert(d.Message);
            console.log(data);
        });
    });
    //发送验证码倒计时
    function setTime(obj) {
        if (countdown > 0) {
            obj.addClass("disabled").attr('disabled', true).val(+countdown + "s重发");
            countdown--;
        } else if (countdown == 0) {
            obj.removeClass("disabled").attr('disabled', false).val("获取验证码");
            countdown = 60;
            return;
        }
        setTimeout(function () {
            setTime(obj)
        } , 1000)
    }


    //ajax


    //验证输入的验证码是否正确
    $("input[name='Retrieve']").on("click", function () {
        $http({
            method: "post",
            url: hostApis+"/api/Users/ToLoginByCode",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8"
            },
            data: $.param({
                Mobile: $scope.Mobile,
                Code: $scope.YZM,
                isLogin:0
            }),
            cache:false
        }).then(function (data) {
            //console.log(data);
            let result=data.data;
            if (result.Stata == 200) {
                location.href = 'restPsd.html?param=' + $scope.Mobile;
            }
            else {
               // alert(result.Message);
            }
        });

        //$state.go('restPsd.aspx', { id: $scope.Mobile });
    });

}]);
