/**
 * Created with JetBrains RubyMine.
 * User: fei
 * Date: 13-12-15
 * Time: 下午3:43
 * To change this template use File | Settings | File Templates.
 */
function User(user_name){
    this.name=user_name;
}

User.get_current_user_name=function(){
    return localStorage.current_user_name;
}

User.set_current_user_name=function(user_name){
    localStorage.current_user_name=user_name;
}