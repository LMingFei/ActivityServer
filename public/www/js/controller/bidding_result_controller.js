/**
 * Created with JetBrains RubyMine.
 * User: fei
 * Date: 13-10-25
 * Time: 下午10:18
 * To change this template use File | Settings | File Templates.
 */
function BiddingResultController($scope,$navigate,$timeout){
    $scope.close_pop=function(){
        $scope.pop_out_result = "hide modal fade";
        $scope.back_hide = "hide modal-backdrop fade";
    }

    $timeout(function() {
        $scope.pop_out_result = "hide modal fade";
        $scope.back_hide = "hide modal-backdrop fade";
    },3000)

    $scope.goto_price_list = function () {
        $navigate.go('/price_list','slide')
    }

    $scope.goto_price_statistics = function () {
        $navigate.go('/price_statistics','slide')
    }

    $scope.current_bidder_array=Bidding.get_current_biddings();
    $scope.bidder_num='('+$scope.current_bidder_array.length+')';
    $scope.bidding_name=Bid.get_current_Bid().name;
    var winner_info=Analyse_Bidder_Result($scope.current_bidder_array);
    $scope.winner_info = "竞价结果：" + winner_info["name"] + "  " + (winner_info["price"]).toString() + "元" + "    " + winner_info["phone"];
}
