/**
 * Created with JetBrains RubyMine.
 * User: fei
 * Date: 13-10-23
 * Time: 下午4:25
 * To change this template use File | Settings | File Templates.
 */
function PriceListController($scope,$navigate,$routeParams){
    $scope.bids=Bid.get_current_Bids();
    $scope.goto_activity_sign_up=function(){
        navigate_to_activity_sign_up($navigate)
    }

    $scope.create_new_tip=function(){
        var current_bids=Bid.get_current_Bids();
        var new_bid=new Bid("竞价"+(parseInt(current_bids.length)+1));
        var bids=Bid.get_Bids();
        bids.unshift(new_bid);
        Bid.set_Bids(bids);
        Bid.set_current_Bid(new_bid);
        $navigate.go('/price_list_tip','slide');
    }

    $scope.btn_flag=!_.find($scope.bids,function(activity){return activity["status"]=="started"})

    $scope.goto_detail_tip=function(bid){
        Bid.set_current_Bid(bid);
        $navigate.go('/price_list_tip','slide');
    }
}