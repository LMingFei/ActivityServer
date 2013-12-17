/**
 * Created with JetBrains RubyMine.
 * User: fei
 * Date: 13-10-19
 * Time: 下午4:58
 * To change this template use File | Settings | File Templates.
 */
function ActivityListController($scope,$navigate,$http){
    $scope.goto_create_activity=function(){
        navigate_to_create_activity($navigate);
    }

    $scope.current_activity_array=Activity.get_current_activity_array();

    $scope.goto_detail_activity=function(activity){
        Activity.set_current_activity(activity);
//        localStorage.setItem("current_activity",JSON.stringify(activity));
        navigate_to_activity_sign_up($navigate)
    }

    $scope.btn_disable_flag=!_.find($scope.activity_array,function(activity){return activity.status == "started"});


    $scope.data_synchronous = function(){
        $http.post("/user/data_synchronous",{name:User.get_current_user_name(),activities:Activity.get_current_activity_array(),sign_ups:Signup.get_current_Sign_ups(),bids:Bid.get_current_Bids(),biddings:Bidding.get_current_biddings()})
            .success(function(response){
                if(JSON.parse(response)==true){
                    alert("同步数据成功")
                }
                else
                {
                    alert("同步数据有误");
                }
            }).error(function(){
                alert("同步数据失败,请联系管理员!")
            });
    }
}