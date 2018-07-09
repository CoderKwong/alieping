//企业认证
app.controller('certificate',['$scope','$http',function ($scope,$http) {


    //点击提交
    $(".submit").on("click",function () {
        let formData=new FormData($("form"));
       let fileSize=document.getElementById("file").files[0].size;
        if(fileSize>1024*1024*5){
            return false;
        }else{
            console.log(1)
        }

        $http({
            method:"post",
            url:"",
            data:$.param(formData),
            cache:false
        }).then(function (data) {
            console.log(data);
        })
    })
}])
//账号管理
.controller('account',['$scope',function ($scope) {

}])
//修改手机号
.controller('updateMobile',['$scope',function ($scope) {
    $scope.flag=true;
    $scope.next=function () {
        $scope.flag=false;
    };
    //前3后4，中间用*代替
        let mobile=$(".telephone").html();
        let num = mobile.substr(0,3)+"****"+mobile.substr(7);
        $(".telephone").html(num);


}])
//绑定邮箱
.controller('bindEmail',['$scope',function ($scope) {
    $scope.flag=true;
    $scope.next=function () {
        $scope.flag=false;
    };
    //前3后4，中间用*代替
    let mobile=$(".telephone").html();
    let num = mobile.substr(0,3)+"****"+mobile.substr(7);
    $(".telephone").html(num);
}])
//邮箱号码
.controller('email',['$scope',function ($scope) {

}])
//修改密码
.controller('updatePsd',['$scope',function ($scope) {
    $scope.flag=true;
    $scope.next=function () {
        $scope.flag=false;
    };
    //前3后4，中间用*代替
    let mobile=$(".telephone").html();
    let num = mobile.substr(0,3)+"****"+mobile.substr(7);
    $(".telephone").html(num);
}])
//企业资料
.controller('company',['$scope',function ($scope) {
    //定义一个变量来控制审核状态；0代表未认证（企业认证），1代表审核中，2代表已认证
    $scope.status=0;
}])
//所属行业
.controller('industry',['$scope',function ($scope) {
//加载form模块
    layui.use('form', function(){
        let form = layui.form;
        form.render();
    });

}])
//公司规模
.controller('scale',['$scope',function ($scope) {
//加载form模块
    layui.use('form', function(){
        let form = layui.form;
        form.render();
    });
}])
//修改地址
.controller('address',['$scope',function ($scope) {
    //加载form模块
    layui.use('form', function(){
        let form = layui.form;

    });
}]);
