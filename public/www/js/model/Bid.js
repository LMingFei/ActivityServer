/**
 * Created with JetBrains RubyMine.
 * User: fei
 * Date: 13-12-15
 * Time: 下午4:10
 * To change this template use File | Settings | File Templates.
 */
function Bid(name){
    this.name=name;
    this.status='started';
    this.activity_name=Activity.get_current_activity().name;
    this.user_name=User.get_current_user_name();
}

Bid.get_Bids=function(){
    return JSON.parse(localStorage.bids)
}

Bid.set_Bids=function(bids){
    localStorage.bids=JSON.stringify(bids);
}

Bid.get_current_Bids=function(){
    var bids=Bid.get_Bids();
    return _.where(bids,{activity_name:Activity.get_current_activity().name,user_name:User.get_current_user_name()})||[];
}


Bid.get_Bids_of_current_user=function(){
    var bids=Bid.get_Bids();
    return _.where(bids,{user_name:User.get_current_user_name()})||[];
}


Bid.get_current_Bid=function(){
    return JSON.parse(localStorage.current_bid)
}

Bid.set_current_Bid=function(bid){
    localStorage.current_bid=JSON.stringify(bid);
}