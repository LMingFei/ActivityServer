/**
 * Created with JetBrains RubyMine.
 * User: fei
 * Date: 13-10-19
 * Time: 下午2:47
 * To change this template use File | Settings | File Templates.

 */
function CreateActivityController($scope,$navigate){
    $scope.VerificationOfEmpty=function (){
        $scope.btn_flag=!($scope.input_name==undefined||$scope.input_name=="");
    }
    $scope.goto_activity_sign_up=function(){
        if(confirm("确定要创建新活动吗？")){
            var activity_array=JSON.parse(localStorage.getItem("activity_array"))||[];
            var new_activity = {};
            new_activity["name"]=$scope.input_name;
            _.each(activity_array,function(activity){
                if(activity.name==new_activity.name){
                    alert("已存在同名活动");
                    return false;
                }
            })
            }
            new_activity["createtime"]=new Date();
            new_activity["status"]="un_start";
            activity_array.unshift(new_activity);
            localStorage.setItem("activity_array",JSON.stringify(activity_array));
            localStorage.setItem("current_activity",JSON.stringify(new_activity));
            $navigate.go('/activity_sign_up','slide');

        }
    $scope.goto_activity_list=function(){
        if($scope.input_name==undefined||$scope.input_name==""){
            $navigate.go('/activity_list','slide');
        }
        else if(confirm("确认要放弃当前标题,返回列表吗？")){
            $navigate.go('/activity_list','slide');
        }
    }
}