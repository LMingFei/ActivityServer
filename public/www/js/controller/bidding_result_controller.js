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
function Analyse_Bidder_Result(current_bidder_array){
    var min_price=Bidding_Price_Result(current_bidder_array);
    if(min_price!=99999999999999999){
       return _.find(current_bidder_array,function(bidder){
            return bidder.price==min_price;
        })
    }
    else{
        return {"name":"没有获胜者","phone":"没有获胜者","price":"没有获胜者"};
    }
}
function Bidding_Info_Classify(current_bidder_array) {
    var bidding_price_array= [];
    _.each(current_bidder_array,function(bidding){
        if(Get_Repeat_Price(bidding_price_array,bidding.price)){
            Get_Repeat_Price(bidding_price_array,bidding.price).number++;
        }
        else{
            var bidding_price_new = {};
            bidding_price_new["price"] = bidding["price"];
            bidding_price_new["number"] = 1;
            bidding_price_array.push(bidding_price_new);
        }

    })
    return bidding_price_array;
}
function Get_Repeat_Price(bid_price_array, price) {
    return _.find(bid_price_array,function(bidding){
        return bidding.price==price;
    })
}
function Bidding_Price_Result(current_bidder_array){
    var bidding_price_classified_array=Bidding_Info_Classify(current_bidder_array);
    var min_price = 99999999999999999;
    _.each(bidding_price_classified_array,function(classified_bidding){
        if(classified_bidding["number"] == 1&&classified_bidding["price"]<min_price){
            min_price=classified_bidding["price"];
        }
    })
    return min_price;
}