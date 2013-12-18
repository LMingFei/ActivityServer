/**
 * Created with JetBrains RubyMine.
 * User: fei
 * Date: 13-12-15
 * Time: 下午3:28
 * To change this template use File | Settings | File Templates.
 */
init_activity_database=function(){
    localStorage.activity_array =localStorage.activity_array|| "[]";
    localStorage.current_user_name=localStorage.current_user_name||"";
    localStorage.current_activity=localStorage.current_activity||"";
    localStorage.current_bid=localStorage.current_bid||"";
    localStorage.sign_ups=localStorage.sign_ups||"[]";
    localStorage.bids=localStorage.bids||"[]";
    localStorage.biddings=localStorage.biddings||"[]";
}