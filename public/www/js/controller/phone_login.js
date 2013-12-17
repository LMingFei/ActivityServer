/**
 * Created with JetBrains RubyMine.
 * User: fei
 * Date: 13-12-11
 * Time: 下午3:56
 * To change this template use File | Settings | File Templates.
 */

function PhoneLoginController($scope,$navigate,$http)
{
    init_activity_database();
    $scope.VerificationOfEmpty=function (){
        $scope.btn_flag=!($scope.password==undefined||$scope.password==""||$scope.name==undefined||$scope.name=="");
}

    $scope.goto_activity_list=function(){
        var name=$scope.name
        var password=$scope.password
        $http.post('/user/phone_login',{name:name,password:password})
            .success(function(response)
            {
                if(JSON.parse(response)==true){
                    User.set_current_user_name(name)
                    navigate_to_activity_list($navigate);
                }
                else
                {
                    alert("无效的用户名或密码");
                }
            }).error(function(){
                alert("服务器出现错误")
            })
    }
}
