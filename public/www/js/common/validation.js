/**
 * Created with JetBrains RubyMine.
 * User: fei
 * Date: 13-12-19
 * Time: 下午2:24
 * To change this template use File | Settings | File Templates.
 */
function validate_is_sign(){
    var activities=Activity.get_current_activity_array();
    var flag=_.find(activities,function(activity){return activity.status=="started"})
    return flag;
}


function validate_is_bid(){
    var flag=false;
   var activities=Activity.get_activity_array()
    _.each(activities,function(activity){
        if(_validate_bid(activity)){
            flag=true;
        }
    })
    return flag;
}


function _validate_bid(activity){
    var bids= _.where(Bid.get_Bids(),{activity_name:activity.name,user_name:User.get_current_user_name()});
    return _.find(bids,function(bid){return bid.status=="started"})
}