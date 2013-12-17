/**
 * Created with JetBrains RubyMine.
 * User: fei
 * Date: 13-12-15
 * Time: 下午4:07
 * To change this template use File | Settings | File Templates.
 */
function Signup(name,phone){
    this.name=name;
    this.phone=phone;
    this.activity_name=Activity.get_current_activity().name;
    this.user_name=User.get_current_user_name();
}

Signup.get_sign_ups=function(){
    return JSON.parse(localStorage.sign_ups)
}

Signup.set_sign_ups=function(sign_ups){
    localStorage.sign_ups=JSON.stringify(sign_ups);
}

Signup.get_current_Sign_ups=function(){
    var sign_ups=Signup.get_sign_ups();
    return _.where(sign_ups,{activity_name:Activity.get_current_activity().name,user_name:User.get_current_user_name()})||[]
}
