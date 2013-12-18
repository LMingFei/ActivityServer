/**
 * Created with JetBrains RubyMine.
 * User: fei
 * Date: 13-12-15
 * Time: 下午4:12
 * To change this template use File | Settings | File Templates.
 */
function Bidding(name,phone,price){
    this.name=name;
    this.phone=phone;
    this.price=price;
    this.bid_name=Bid.get_current_Bid().name;
    this.activity_name=Activity.get_current_activity().name;
    this.user_name=User.get_current_user_name();
}

Bidding.get_Biddings=function(){
    return JSON.parse(localStorage.biddings);
}

Bidding.set_Biddings=function(biddings){
    localStorage.biddings=JSON.stringify(biddings);
}



Bidding.get_current_biddings=function(){
    var biddings=Bidding.get_Biddings();
    return _.where(biddings,{activity_name:Activity.get_current_activity().name,user_name:User.get_current_user_name(),bid_name:Bid.get_current_Bid().name})||[]
}



Bidding.get_Biddings_of_current_user=function(){
    var biddings=Bidding.get_Biddings();
    return _.where(biddings,{user_name:User.get_current_user_name()})||[]
}