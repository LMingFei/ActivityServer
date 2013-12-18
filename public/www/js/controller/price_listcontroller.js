/**
 * Created with JetBrains RubyMine.
 * User: fei
 * Date: 13-10-23
 * Time: 下午4:25
 * To change this template use File | Settings | File Templates.
 */
//function PriceListController($scope,$navigate,$routeParams){
//    $scope.current_bidding_array=JSON.parse(localStorage.getItem($routeParams.current_activity_name+"_bidding_array")||"[]");
//    $scope.goto_activity_sign_up=function(){
//        $navigate.go('/activity_sign_up','slide');
//    }
//    $scope.create_new_tip=function(){
//        var current_bidding_array=JSON.parse(localStorage.getItem($routeParams.current_activity_name+"_bidding_array")||"[]");
//        var new_bidding={};
//        new_bidding["name"]="竞价"+(parseInt(current_bidding_array.length)+1);
//        new_bidding["status"]="started";
//        current_bidding_array.unshift(new_bidding);
//        localStorage.setItem($routeParams.current_activity_name+"_bidding_array",JSON.stringify(current_bidding_array));
//        localStorage.setItem("current_bidding",JSON.stringify(new_bidding));
//        localStorage.setItem($routeParams.current_activity_name+"_"+new_bidding["name"]+"_bidder_array","[]");
//        $navigate.go('/price_list_tip/'+$routeParams.current_activity_name+'/'+new_bidding["name"],'slide');
//    }
//    $scope.btn_flag=!_.find($scope.current_bidding_array,function(activity){return activity["status"]=="started"})
//    $scope.bidding_checked=function(bidding){
//        if(bidding["status"]=="started"){
//            return "special_back";
//        }
//        return "normal_back"
//    }
//    $scope.goto_detail_tip=function(bidding){
//        $navigate.go('/price_list_tip/'+$routeParams.current_activity_name+'/'+bidding["name"],'slide');
//    }
//}