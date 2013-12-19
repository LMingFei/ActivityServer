/**
 * Created with JetBrains RubyMine.
 * User: fei
 * Date: 13-10-26
 * Time: 上午9:49
 * To change this template use File | Settings | File Templates.
 */
function PriceStatisticsController($scope,$navigate,$routeParams){
    $scope.goto_price_list= function(){
        $navigate.go('/price_list','slide');
    }
    $scope.goto_bidding_result=function(){
        $navigate.go('/bidding_result','slide');
    }
    $scope.current_biddings=Bidding.get_current_biddings();
    $scope.bidding_classified_array=Bidding_Info_Classify($scope.current_biddings)
    $scope.biddings_num='('+$scope.current_biddings.length+')';
    $scope.bid_name=Bid.get_current_Bid().name;
    var winner_info =Analyse_Bidder_Result($scope.current_biddings)

    $scope.winner_info ="竞价结果：    "+winner_info["name"]+"  "+winner_info["price"]+"元"+"    "+winner_info["phone"];
}