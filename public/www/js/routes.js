myModule.config(function($routeProvider) {
    $routeProvider.when("/create_activity", {
        templateUrl: "pages/create_activity.html",
        controller: CreateActivityController
    }).when("/activity_sign_up", {
            templateUrl: "pages/activity_sign_up.html",
            controller: ActivitySignUpController
        }).when("/activity_list", {
            templateUrl: "pages/activity_list.html",
            controller: ActivityListController
        }).when("/price_list", {
            templateUrl: "pages/price_list.html",
            controller: PriceListController
        }).when("/price_list_tip", {
            templateUrl: "pages/price_list_tip.html",
            controller: PriceListTipController
        }).when("/bidding_result", {
            templateUrl: "pages/bidding_result.html",
            controller: BiddingResultController
        }).when("/price_statistics", {
            templateUrl: "pages/price_statistics.html",
            controller: PriceStatisticsController
        }).when("/phone_login", {
            templateUrl: "pages/phone_login.html",
            controller: PhoneLoginController
        }).otherwise({
            redirectTo: "/phone_login"
        });









    //routing generate
    //routing generated over
});

/** Here is example
myModule.config(function($routeProvider) {
    $routeProvider.when("/", {
        templateUrl: "pages/activity_list_page.html",
        controller: ActivityListController
    }).when("/activity/create", {
            templateUrl: "pages/activity_create_page.html",
            controller: ActivityCreateController
        }).when("/sign_ups/list/:activity_name", {
            templateUrl: "pages/apply_page.html",
            controller: SignUpListController
        }).otherwise({
            redirectTo: "/"
        });
});
**/