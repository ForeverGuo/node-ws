var memjs = require('memjs');

var mc = memjs.Client.create('127.0.0.1:11211', {
   // username:'',
   // password: ''
});
console.log(mc);  
mc.set('foo', 'bar');
mc.get('foo', function (err, value, key) {
    if (value != null) {
        console.log(value.toString());
    }
});





