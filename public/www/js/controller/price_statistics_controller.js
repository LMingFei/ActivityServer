/**
 * Created with JetBrains RubyMine.
 * User: fei
 * Date: 13-10-26
 * Time: 上午9:49
 * To change this template use File | Settings | File Templates.
 */
function PriceStatisticsController($scope,$navigate,$routeParams){
    $scope.goto_price_list= function(){
        $navigate.go('/price_list/'+$routeParams.current_activity_name,'slide');
    }
    $scope.goto_bidding_result=function(){
        $navigate.go('/bidding_result/'+$routeParams.current_activity_name+'/'+$routeParams.current_price_name,'slide');
    }
    $scope.bidding_classified_array=JSON.parse(localStorage.getItem($routeParams.current_activity_name+'_'+$routeParams.current_price_name+'_'+"bidding_detail_info"));
    $scope.current_bidder_array=JSON.parse(localStorage.getItem($routeParams.current_activity_name+"_"+$routeParams.current_price_name+"_bidder_array")||"[]");
    $scope.bidder_num='('+$scope.current_bidder_array.length+')';
    $scope.bidder_name=$routeParams.current_activity_name;
    var winner_info = JSON.parse(localStorage.getItem($routeParams.current_activity_name+'_'+$routeParams.current_price_name+'_'+"winner_info")||"[]");

    $scope.winner_info ="竞价结果：    "+winner_info["name"]+"  "+winner_info["price"]+"元"+"    "+winner_info["phone"];
}