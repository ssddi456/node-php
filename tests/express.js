var express = require('express');
var php = require("../"); 
var path = require("path"); 
var cluster = require("cluster"); 
var request = require("request"); 
var iconvLite = require('iconv-lite');

if(cluster.isMaster){
	cluster.fork().on("message", function(){
		process.exit();
	}); 
	
	var app = express();
	
	app.use("/", php.cgi(__dirname)); 

	app.listen(9090);
} else {
	var res = request.post("http://localhost:9090/test.php",{
		form : {
			'name' : '试试中文'
		}
	},function( err, res ){

		console.log( iconvLite
									.decode(Buffer.concat(datas),'gb2312')
									.toString() );

		process.send('exit');

	}); 
	var datas = [];
	res.on('data',function( chuck ) {
	  datas.push(chuck);
	});
}

