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
            var activity_array=Activity.get_activity_array();
            var current_activity_array=Activity.get_current_activity_array();
            var new_activity = new Activity($scope.input_name,User.get_current_user_name())
            if(check_name_repeat(current_activity_array,new_activity)){
                activity_array.unshift(new_activity);
                Activity.set_activity_array(activity_array);
                Activity.set_current_activity(new_activity);
                navigate_to_activity_sign_up($navigate)
            }
            }
        }

    $scope.goto_activity_list=function(){
        if($scope.input_name==undefined||$scope.input_name==""){

            navigate_to_activity_list($navigate);
        }
        else if(confirm("确认要放弃当前标题,返回列表吗？")){
            navigate_to_activity_list($navigate);
        }
    }
}

function check_name_repeat(current_activity_array,new_activity){
    var flag=true;
    _.each(current_activity_array,function(activity){
        if(activity.name==new_activity.name){
            alert("已存在同名活动");
            flag=false;
        }
    })
    return flag;
}