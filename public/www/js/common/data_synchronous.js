/**
 * Created with JetBrains RubyMine.
 * User: fei
 * Date: 13-12-18
 * Time: 上午11:13
 * To change this template use File | Settings | File Templates.
 */
function data_synchronous($http){
    var name=User.get_current_user_name();
    var activities=Activity.get_current_activity_array();
    var sign_ups=Signup.get_sign_ups_of_current_user();
    var bids=Bid.get_Bids_of_current_user();
    var biddings=Bidding.get_Biddings_of_current_user();
    $http.post("/user/data_synchronous",{name:name,activities:activities,sign_ups:sign_ups,bids:bids,biddings:biddings})
        .success(function(response){
            if(JSON.parse(response)==true){

            }
            else
            {
                alert("同步数据有误");
            }
        }).error(function(error){
            alert("同步数据失败,请联系管理员!")
        });
}