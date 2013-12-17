/**
 * Created with JetBrains RubyMine.
 * User: fei
 * Date: 13-12-15
 * Time: 上午11:24
 * To change this template use File | Settings | File Templates.
 */
function Activity(name,user_name){
    this.user_name = user_name;
    this.name = name;
    this.status = "un_start"
}

Activity.get_activity_array=function(){
   return JSON.parse(localStorage.activity_array);
}


Activity.get_current_activity_array=function(){
    var activity_array=Activity.get_activity_array();
    return _.where(activity_array,{user_name:User.get_current_user_name()})||[];
}

Activity.set_activity_array=function(activity_array){
    localStorage.activity_array=JSON.stringify(activity_array)
}

Activity.set_current_activity=function(activity){
    localStorage.current_activity=JSON.stringify(activity)
}

Activity.get_current_activity=function(){
    return JSON.parse(localStorage.current_activity);
}