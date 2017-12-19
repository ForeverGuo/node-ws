var Memcached = require('memcached');   
   memcached = new Memcached('127.0.0.1:11211',{debug:false});

   memcached.set('d','aaa',10,function(err){
	if(err){

	console.log(err);
 } });
 setTimeout(function(){
	console.log(memcached.get('d',function(err,data){
		if(err){console.log('get:'+err);}
		console.log("get data : "+data)
	}));
 },1000)
	
