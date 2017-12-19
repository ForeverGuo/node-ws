var Memcached = require('memcached');
    memcached = new Memcached('127.0.0.1:11211',{debug:false});    
var WebSocketServer = require('ws').Server,  
    wss = new WebSocketServer({  
        port: 8181, //监听接口  
       // verifyClient: socketVerify //可选，验证连接函数 
    });  
    
 function socketVerify(info) {  
     console.log(info.origin);  
     console.log(info.req.t);  
     console.log(info.secure);  
     console.log(info.origin);  
     var origin = info.origin.match(/^(:?.+\:\/\/)([^\/]+)/);  
    if (origin.length >= 3 && origin[2] == "localhost:809") {  
        return true;   
    }  
     console.log("连接",origin[2]);  
     return false; //否则拒绝  

}  
//广播  
wss.broadcast = function broadcast(ws) {  
    //console.log(ws);   
    wss.clients.forEach(function each(client) {  
         client.send(ws);  
    });  
};  
// 初始化  
wss.on('connection', function(ws) {
    var kk = sendVal();
    console.log("连接时显示的结果:"+kk); 
    ws.send("connected<br/>");
    for(var j=1;j<=i;j++){
	memcached.get(j,function(err,data){
		if(err){console.log(err)};
		ws.send(data);
	})	
    }    
    //ws.send(kk);
 
    ws.on('message',function(message){
    	console.log(message);
	getResult(message); 
    	//wss.broadcast(message);
    }) 

});

function getResult(result){
	var html='';
	var myDate = new Date();
	var year = myDate.getFullYear();
	var month = myDate.getMonth()+1;
	var day = myDate.getDate();
	var hour = myDate.getHours();
	var minute = myDate.getMinutes();
	var seconds = myDate.getSeconds();
	var time = year+'-'+month+'-'+day+':'+hour+':'+minute+':'+seconds;
	html +=time;
	html +=' :';
	html +=result;
	html +='<br/>';
	
	mem(html)
	
	wss.broadcast(html);	


}

global.i = 0;

function mem(val){
	global.i += 1;
	memcached.set(i,val,60,function(err){
		if(err){console.log(err)}	
	})	


}
global.res='';	
function sendVal(){
      for(var j=1;j<=i;j++){

          memcached.get(j,function(err,data){
		res = data; 
	  });
	}
     return res;
}


setInterval(function(){
	console.log(i);
	for(var j = 1;j<=i;j++){

	  memcached.get(j,function(err,data){
		if(err){console.log(err)};
		console.log("获取到的数据:"+data);				
	  })
	
	}

},1000)











 
