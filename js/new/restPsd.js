
//配置模板
app.controller('ctrl', ['$scope', '$http', 'hostApis','$location', function ($scope, $http, hostApis,$location) {

    //let Request = new UrlSearch(); //实例化
    //获取URL里面参数值
     let Request=$location.search();
    //ajax
    $("input[name='confirm']").on('click', function () {
        let newPwd = $scope.Password, confirmPwd = $scope.CkPassword;
        if (newPwd != confirmPwd &&newPwd!="" && confirmPwd!=""){
           // alert("两次密码输入不一致");
        }
        else {
            $http({
                method: "post",
                url: hostApis + "/api/Users/UpdatePwd",
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8"
                },
                data: $.param({
                    loginName: Request.param,
                    Password: $("input[name='newPsd']").val(),
                    UserName: Request.param
                }),
                cache: false
            }).then(function (data) {
                let result = data.data;
                if (result.Stata == 200) {

                   // alert("密码修改成功");
                    location.href = 'login.html';
                }
                else {
                   // alert(result.Message);
                }
            });
            event.preventDefault();//按钮为submit时，阻止form表单默认提交
        }
    });
}]);