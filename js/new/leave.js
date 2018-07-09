
app.controller('search',['$scope','$http','$stateParams','$location',function ($scope,$http,$stateParams,$location) {
    //离职评价查询
    //默认没数据,显示空状态
    $scope.searchNum=true;

   //获取URL参数
   // $scope.reportFlag=$stateParams.reportFlag;
    $scope.reportFlag=$location.search().reportFlag;
    console.log( $scope.reportFlag)
}])
.controller('leaveReport',['$scope','$http',function ($scope,$http) {
    //离职报告
    //两种测评切换
    $(function () {
        $('#mytab li:first').tab('show');//初始化显示哪个tab
        $('#mytab li').click(function (e) {
            e.preventDefault();//阻止a链接的跳转行为
            $(this).tab('show');//显示当前选中的链接及关联的content
        })
    });

    //测评echarts
    //1、 基于准备好的容器(这里的容器是id为chart1的div)，初始化echarts实例
    let chart1 = echarts.init(document.getElementById("chart1"));
    let chart2 = echarts.init(document.getElementById("chart2"));

    //2、 指定图表的配置项和数据
    let option = {
        // title: {
        //     text: '基础雷达图'
        // },
        tooltip: {},
       legend: {
            data: ['实际得分', '平均得分']
        },
        radar: {
            // shape: 'circle',
            name: {
                textStyle: {
                    color: '#fff',
                    backgroundColor: '#999',
                    borderRadius: 3,
                    padding: [3, 5]
                }
            },
            indicator: [
                { name: '销售（sales）', max: 6500},
                { name: '管理（Administration）', max: 16000},
                { name: '信息技术（Information Techology）', max: 30000},
                { name: '客服（Customer Support）', max: 38000},
                { name: '研发（Development）', max: 52000},
                { name: '市场（Marketing）', max: 25000}
            ]
        },
        series: [{
            name: '预算 vs 开销（Budget vs spending）',
            type: 'radar',
            // areaStyle: {normal: {}},
            data : [
                {
                    value : [4300, 10000, 28000, 35000, 50000, 19000],
                    name : '预算分配（Allocated Budget）'
                },
                {
                    value : [5000, 14000, 28000, 31000, 42000, 21000],
                    name : '实际开销（Actual Spending）'
                }
            ]
        }]
    };



    // 3、使用刚指定的配置项和数据显示图表
    chart1.setOption(option);
    chart2.setOption(option);
}])


.controller('uploadLeave',['$scope','$http',function ($scope,$http) {
    //上传离职评价
    $scope.list = [1,2,3,4,5,6,7,8,9,10];
    //切换性别
    $("#sex span").on("click",function () {
        $(this).addClass("checked").siblings().removeClass("checked");
    })
}])
.controller('competency',['$scope','$http',function ($scope,$http) {
    //胜任力模型评测(未选状态)==》能力评价（查看状态，只读）
    //选中，添加不同的样式
    $(".subject-answer input").change(function () {
        if($(this).is(":checked")) {
            $(this).parent().parent().addClass("checked").siblings().removeClass("checked");
            $(this).parent().siblings(".line").addClass("checked");
            $(this).parent().parent().siblings().find(".line").removeClass("checked");

        }
    })
}])

.controller('myUpload',['$scope','$http',function ($scope,$http) {
    //我的上传
}])
.controller('updateReport',['$scope','$http',function ($scope,$http) {
    //修改离职报告
}])

.controller('searchRecord',['$scope','$http',function ($scope,$http) {
    //查询记录
}]);

