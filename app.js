var express = require('express'),
	app = express();

var lessMiddleware = require('less-middleware');

//
// Create a node-static server instance to serve the './public' folder
//
if ( ~process.argv.slice(2).indexOf('--production') )	{
	// production
	console.log('production')
	app.use('/inforbix/web/',express.static( __dirname + "/target/build", { maxAge: 3600 }) );
} else {
	// development
	console.log('development');
	app.use(lessMiddleware({
		src: __dirname + '/src',
		dest: __dirname + "/src",
		prefix: '/inforbix/web',
		compress: true
	}));
    app.use('/inforbix/web/',express.static(__dirname + "/src", { maxAge: false }));
}

app.get(/\/steal.*/, function(req, res){
	res.send("(function(){})();");
})
//require('./fixtures/wat')(app);	// WAT fixture
//require('./fixtures/smartsearch')(app);	// smartsearch fixture

require('http').createServer(app).listen(8082);