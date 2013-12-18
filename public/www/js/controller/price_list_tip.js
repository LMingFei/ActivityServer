/**
 * Created with JetBrains RubyMine.
 * User: fei
 * Date: 13-10-23
 * Time: 下午4:58
 * To change this template use File | Settings | File Templates.
 */
function PriceListTipController($scope,$navigate,$http){
    $scope.current_bidder_array=Bidding.get_current_biddings();


    $scope.goto_price_list = function(){
        $navigate.go('/price_list','slide');
    }

    $scope.bidding_end = function(){
        if(confirm("确定要结束本次竞价吗?")){
            var current_bid=Bid.get_current_Bid();
            var bids=Bid.get_Bids();
            current_bid["status"]="end";
            _.each(bids,function(bid){
                if(bid.name==current_bid.name){
                    bid["status"]="end";
                    Bid.set_current_Bid(current_bid);
                    Bid.set_Bids(bids)
                    $navigate.go('/bidding_result','slide');
                }
            })
        }
    }

    var current_bids=Bid.get_current_Bids();

    $scope.btn_flag=!_.find(current_bids,function(bid){return (bid.name==Bid.get_current_Bid().name&&bid.status=="end")});

    $scope.judge_bidder=function(mss_price,mss_phone){
        var current_sign_up=Signup.get_current_Sign_ups();
        var current_biddings=Bidding.get_current_biddings();
        var current_bid=Bid.get_current_Bid();
        var biddings=Bidding.get_Biddings();
        if(current_bid["status"]=="started"||_.find(current_sign_up,function(users){return users.phone==mss_phone})){
            if(!_.find(current_biddings,function(bidder){return bidder.phone==mss_phone})){
                var new_bidding=new Bidding(whether_sign_up(mss_phone).name,mss_phone,mss_price);
                biddings.push(new_bidding);
//                native_accessor.send_sms(mss_phone,"竞价成功！");
                Bidding.set_Biddings(biddings)
                $scope.current_bidder_array=Bidding.get_current_biddings();
                $scope.$apply($scope.current_bidder_array);
                data_synchronous($http)
                return true;
            }
            else{
//                native_accessor.send_sms(mss_phone,"您已竞价");
                return false;
            }
        }
        else{
//            native_accessor.send_sms(mss_phone,"未有活动处于报名状态,或您未报名");
        }
    }

    $scope.goto_price_statistics=function(){
        $navigate.go('/bidding_result','slide');
    }

    native_accessor.inject_judge_bidder($scope.judge_bidder)

    $scope.goto_activity_sign_up=function(){
        $navigate.go('/activity_sign_up','slide');
    }
}
function whether_sign_up(mss_phone){

    var current_sign_ups=Signup.get_current_Sign_ups();
    return _.find(current_sign_ups,function(bidder){
        return bidder.phone==mss_phone
    })
}