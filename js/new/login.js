//配置模板
app.controller('ctrl', ['$scope', '$http', 'hostApis', '$cookies', function ($scope, $http, hostApis, $cookies) {
    $scope.change=false;
    //首先判断用户是否选择了记住登录状态
    //$scope.user = cookie.get("users");//JSON.parse(data)
    $scope.user = $cookies.getObject("users");
    // console.log($scope.user);
    if ($scope.user != null) {
        let result = JSON.parse($scope.user);
        $("#phone").val(JSON.parse($scope.user).Username);
        $("input[type='checkbox']").attr("checked", true);
        location.href = 'dismission/aside.html';
    }
    else {
        if ($(".phone-error-info").show()) {
            $(".has-no-account").addClass("active");
        } else {
            $(".has-no-account").removeClass("active");
        }

        //切换登录方式
        $(".two-kind-login").on("click", "span", function () {
            $(this).addClass("active").siblings("span").removeClass("active");
            if ($(this).html() == "密码登录") {
                $(".psd-login").show().next().hide();
            } else {
                $(".auth-code-login").show().prev().hide();
            }
        });

        //验证码登录
        //num 按钮点击次数，cutdown 倒计时秒数
        let num = 1, countdown = 60;
        $(".getYzm").on("click", function () {
            if ($(".phone").val() == "") {
               // alert("请输入手机号");
                return false;
            }
            //手机正则通过才发送验证码
            let mobileRegx = "^1(3[0-9]|4[57]|5[0-35-9]|7[01678]|8[0-9])\\d{8}$";
            if ($(".phone").val() == "" || $(".phone").val().length != 11) {
                $(".phone-error-info").show();
                //alert("手机号码输入有误");
                return false;
            } else {
                $(".phone-error-info").hide();
                let obj = $(".getYzm");
                setTime(obj);
                //生成验证码
                $http({
                    method: "post",
                    url: hostApis + "/api/Users/SendCode",
                    headers: {
                        "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8"
                    },
                    data: $.param({
                        Mobile: $scope.phone1
                    }),
                    cache: false
                }).then(function (data) {
                    let d = data.data;
                    alert(d.Message);
                    console.log(data);
                });
            }
        });
        //发送验证码倒计时
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
        //密码登录
        $("input[name='loginPwd']").on("click", function (data) {
            if ($("input[name='phone']").val() != "" && $("input[name='password']").val() != "") {
                var password = md5($("#password").val());
                $("#password").val(password);
                if ($("input[type='checkbox']").is(':checked')){
                    let rem = 1;

                }else{
                    let rem = 0;
                }
                $http({
                    method: "post",
                    //url: hostApis + "/api/Users/ToLogin",//http://localhost:13036
                    //url: "http://localhost:13036/api/Users/ToLogin",//http://localhost:13036
                    url: "ToLogin.ashx",
                    headers: {
                        "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8"
                    },
                    data: $.param({
                        Mobile: $("input[name='phone']").val(),//$scope.phone,
                        Pwd: $("#password").val(),
                        remember: rem
                    }),
                    cache: false
                }).then(function (data) {
                    console.log(data);
                    let result = data.data;
                    if (result.Stata == 200) {
                        if (rem == 1) {
                            //设置cookie
                            let data = JSON.stringify(result.Data);
                            let cookieDate = JSON.parse(data);

                        }
                        //alert("登录成功");
                        //console.log(result)
                        location.href = 'dismission/aside.aspx';
                    }
                    else {
                        alert(result.Message);
                    }
                });
                event.preventDefault();//按钮为submit时，阻止form表单默认提交
            } else {
                //alert("请输入手机号或密码");
            }
        });

        //验证码登录
        $("input[name='loginCode']").on("click", function (data) {
            if ($("input[name='phone1']").val() != "" && $("input[name='yzm']").val() != "") {
                $http({
                    method: "post",
                    url: hostApis + "/api/Users/ToLoginByCode",
                    headers: {
                        "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8"
                    },
                    data: $.param({
                        Mobile: $scope.phone1,
                        Code: $scope.yzm,
                        isLogin: 1
                    }),
                    cache: false
                }).then(function (data) {
                    let result = data.data;
                    if (result.Stata == 200) {
                        //alert("登录成功");
                        location.href = 'dismission/aside.aspx';
                    } else {
                        alert(result.Message);
                    }
                });
            }
            event.preventDefault();//按钮为submit时，阻止form表单默认提交
        });
    }
}]);


let cookie = {
    set: function (key, val, time) {//设置cookie方法
        let date = new Date(); //获取当前时间
        let expiresDays = time;  //将date设置为n天以后的时间
        date.setTime(date.getTime() + expiresDays * 24 * 3600 * 1000); //格式化为cookie识别的时间
        document.cookie = key + "=" + val + ";expires=" + date.toGMTString();  //设置cookie
    },
    get: function (key) {//获取cookie方法
        /*获取cookie参数*/
        let getCookie = document.cookie.replace(/[ ]/g, "");  //获取cookie，并且将获得的cookie格式化，去掉空格字符
        let arrCookie = getCookie.split(";"); //将获得的cookie以"分号"为标识 将cookie保存到arrCookie的数组中
        let tips;  //声明变量tips
        for (let i = 0; i < arrCookie.length; i++) {   //使用for循环查找cookie中的tips变量
            let arr = arrCookie[i].split("=");   //将单条cookie用"等号"为标识，将单条cookie保存为arr数组
            if (key == arr[0]) {  //匹配变量名称，其中arr[0]是指的cookie名称，如果该条变量为tips则执行判断语句中的赋值操作
                tips = arr[1];   //将cookie的值赋给变量tips
                break;   //终止for循环遍历
            }
        }
        return tips;
    }
};