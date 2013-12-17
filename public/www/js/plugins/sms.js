
var native_accessor = {
    inject_judge_sign: function(func_name){this.judge_sign=func_name},
    inject_judge_bidder: function(func_name){this.judge_bidder=func_name},
    send_sms: function (phone, message) {
        native_access.send_sms({"receivers":[{"name":'name', "phone":phone}]}, {"message_content":message});
    },

    receive_message: function (json_message) {
        if (typeof this.process_received_message === 'function') {
            this.process_received_message(json_message);

        } },
    process_received_message:function (json_message){
        var mss={};
        mss=json_message;
        if(mss.messages[0]["message"].substring(0,2).toUpperCase()=="BM"){
            var mss_name=mss.messages[0]["message"].substring(2,mss.messages[0]["message"].length);
            mss_name=trim(mss_name);
            this.judge_sign(mss_name,mss.messages[0]["phone"]);
        }
        else if(mss.messages[0]["message"].substring(0,2).toUpperCase()=="JJ"){
            var mss_content=mss.messages[0]["message"].substring(2,mss.messages[0]["message"].length);
            mss_content=trim(mss_content);
            mss_content=trim_left_0(mss_content);
            this.judge_bidder(mss_content,mss.messages[0]["phone"]);
        }
    }
};
function trim(str){
    return str.replace(/(^\s*)|(\s*$)/g, "");
}
function trim_left_0(str){
    return str.replace(/\b(0+)/gi,"");
}
function notify_message_received(message_json) {
    //console.log(JSON.stringify(message_json));
    //JSON.stringify(message_json);
    //alert(JSON.stringify(message_json.messages));
    native_accessor.receive_message(message_json);
    //phone_number=message_json.messages[0].phone;
}


