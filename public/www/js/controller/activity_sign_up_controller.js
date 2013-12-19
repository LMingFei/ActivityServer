/**
 * Created with JetBrains RubyMine.
 * User: fei
 * Date: 13-10-19
 * Time: 下午4:53
 * To change this template use File | Settings | File Templates.
 */
function ActivitySignUpController($scope,$navigate,$http){
    $scope.goto_price_list=function(){
        var current_activity=Activity.get_current_activity();
        navigate_to_price_list($navigate)
    }

    $scope.refreshInformation = function () {
        $scope.signs=Signup.get_current_Sign_ups();
    }

    $scope.refreshInformation();

    $scope.go_activity_list=function(){
        if(confirm("确认要返回活动列表吗?")){
            navigate_to_activity_list($navigate)
        }
    }

    $scope.bids_disable=function(){
        if(Activity.get_current_activity().status=="un_start"){
            return true
        }
        else{
            return false
        }
    }
    $scope.btn_show=function(){
        var current_activity = Activity.get_current_activity();
        var judge_status={
            started:function(){return false},
            un_start:function(){return true},
            end:function(){return false}
        }
        return judge_status[current_activity['status']]();
    }

    $scope.activity_start=function(){
        var current_activity=Activity.get_current_activity();
        var activity_array=Activity.get_activity_array();
        if(validate_is_bid()||validate_is_sign()){
            alert("Sorry,尚有正在进行到活动.");
            return false;
        }
        if(confirm("确认开始活动吗?")){
            current_activity["status"]="started";
            _.find(activity_array,function(activity){return activity.name==current_activity.name}).status="started";
            Activity.set_activity_array(activity_array);
            Activity.set_current_activity(current_activity);
            data_synchronous($http)
        }
    }

    $scope.activity_end=function(){
        if(confirm("确认结束活动吗?")){
            var current_activity=Activity.get_current_activity();
            var activity_array=Activity.get_activity_array();
            current_activity["status"]="end";
            _.find(activity_array,function(activity){return activity.name==current_activity.name}).status="end";
            Activity.set_activity_array(activity_array);
            Activity.set_current_activity(current_activity);
            navigate_to_price_list($navigate)
            data_synchronous($http)
        }
    }

    var current_activity=JSON.parse(localStorage.getItem("current_activity")||"{}");
    $scope.btn_flag=(current_activity["status"]!="end");

    $scope.judge_sign=function(mss_name,mss_phone){
        handle_message(mss_name,mss_phone)
    }

    native_accessor.inject_judge_sign($scope.judge_sign);

    function handle_message(mss_name,mss_phone){
        var current_activity=Activity.get_current_activity();
        if(current_activity.status=="started"){
            var current_sign_ups=Signup.get_current_Sign_ups();
            if(_.find(current_sign_ups,function(sign_up){return sign_up.phone==mss_phone})==undefined){
                var new_sign_up=new Signup(mss_name,mss_phone)
                var sign_ups=Signup.get_sign_ups();
                sign_ups.push(new_sign_up);
                Signup.set_sign_ups(sign_ups);
    //                    native_accessor.send_sms(mss_phone,"恭喜!报名成功");
                $scope.signs=Signup.get_current_Sign_ups();
                $scope.$apply($scope.signs);
                data_synchronous($http)
                return true;
            }
    //            native_accessor.send_sms(mss_phone,"您已报名");
            return false;
        }
    //        native_accessor.send_sms(mss_phone,"Sorry,未有活动处于报名状态.");
    }
}