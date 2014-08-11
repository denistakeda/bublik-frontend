/**
 * You must add following rule to /etc/hosts (or C:/windows/system32/drivers/etc/hosts)
 * 127.0.0.1 <tenant>-local.autodeskplm.com
 * , where <tenant> is your tenant
 *
 * To run proxy server you should exec:
 * # TENANT=<tenant> node server.js
 * Note: the <tenant> should be in lower case.
 *
 * Also you can specify following options:
 *      PORT=8000   - to define custom port
 *      APITENANT=<tenant>   - tenant for QS API, default is the same as TENANT
 *      FIXTURE=rw  - pass 'r' if you need to read from fixture
 *                         'w' if you need to write to fixture
 *                         'rw' if you need to use both jobs.
 *
 * Also you can use custom fixture.
 * Use fixture here like "app.get(url, function(req,res,next){})" or app.post() or app.put() etc.
 * Or create new file with fixtures and put into them "app":
 * fixtures/fixture.js:
 * @codestart
 * export.module = function(app){
 *     app.get('/fixture', function(req,res){ res.send({}); });
 * }
 * @codeend
 * and in this file: require('./fixtures/fixture')(app);
 */
var express = require('express'),
    app = express()
    , cluster = require('cluster')
    , numCPUs = require('os').cpus().length,
    fs = require('fs'),
    crypto = require('crypto');

if (cluster.isMaster) { // master

    if (!process.env.TENANT) {
        console.error("Error.\r\nUse 'TENANT' environment to define tenant name.\n" +
            "Also you can specify\n\tPORT - port, default is 8000 and\n\tAPITENANT - API tenant, default is the same as 'TENANT'.\n" +
            "Example usage: # PORT=8080 TENANT=lexin APITENANT=pony node proxy.js &" );
        return;
    }
    if (process.env.FIXTURE) {
        console.log("Using the fixture with options " + process.env.FIXTURE);
    }

    // Fork workers.
    for (var i = 0; i < numCPUs; i++) {
        (function newFork(){
            var worker = cluster.fork();
            worker.on('exit', function(code, signal) {
                console.log("[%s] [%s] They kill Kenny! Try to renew him...", process.pid, new Date().toISOString())
                newFork();
            });
        })()
    }
} else {    // child process

    if (process.env.FIXTURE) {
        app.use(function(req, res, next){
            var body = "";
            req.on("data", function(data){
                body += data;
            });
            req.on("end", function(){
                req.body = body;
                next();
            });
        });

        app.use(function(req, res, next){
            req.removeAllListeners('data');
            req.removeAllListeners('end');
            req.nextTick = function(){
                process.nextTick(function(){
                    if (req.body) {
                        req.emit('data', req.body)
                    }
                    req.emit('end')
                });
            }
            next();
        });

        var writeFixture = function(req, res, next){
            var createPath = function(path, cb){
                var newPath = path.slice(1);
                fs.mkdir(path[0], function(){
                    if (newPath.length>1) {
                        newPath[0] = path[0]+"/"+path[1];
                        createPath(newPath,cb);
                    } else {
                        cb();
                    }
                })
            }
            var oldWrite = res.write,
                oldEnd = res.end;
            var chunks = [];
            res.write = function(chunk){
                chunks.push(chunk);
                oldWrite.apply(res, arguments);
            };
            res.end = function(chunk){
                if (chunk)
                    chunks.push(chunk);
                var body = Buffer.concat(chunks).toString('utf8');
                var pathWithoutUUID = req.url.replace(/[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}/, ":UUID");
                var fileName = ["./fixtures",
                    "generated",
                    req.method,
                    encodeURIComponent(pathWithoutUUID),
                    crypto.createHash('md5').update( JSON.stringify(req.body) ).digest('hex') ];
                // find the exist file
                console.log("[%s] [%s] WRITE fixture %s", process.pid, new Date().toISOString(), fileName.join("/"))
                fs.exists(fileName.join("/"), function(exists){
                    if (true||!exists) {
                        createPath(fileName, function(){
                            fs.writeFile(fileName.join("/"), JSON.stringify({
                                statusCode: res.statusCode,
                                headers: res._headers,
                                body: body
                            }), {encoding: 'UTF-8'}, function(err){
                                if (err) throw err;
                            });
                        });
                    } else {
                        // need to check answer!
                    }
                });
                oldEnd.apply(res, arguments);
            };

            next();
        };
        var readFixture = function(req, res, next){
            var pathWithoutUUID = req.url.replace(/[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}/, ":UUID");
            var fileName = ["./fixtures",
                "generated",
                req.method,
                encodeURIComponent("/api"+pathWithoutUUID),
                crypto.createHash('md5').update(JSON.stringify(req.body)).digest('hex') ];
            fs.exists(fileName.join("/"), function(exists){
                if (exists) {
                    console.log("[%s] [%s] return from fixture %s", process.pid, new Date().toISOString(), req.url)
                    fs.readFile(fileName.join("/"), {encoding: 'UTF-8'}, function(err, body){
                        if (err) throw err;
                        var response = JSON.parse(body);
                        res.set(response.headers);
                        return res.send(response.statusCode, response.body);
                    });
                } else {
                    next();
                }
            });
        };

        /**
         * READ FROM FIXTURES
         */
        if (~process.env.FIXTURE.indexOf("r"))
            app.use("/api", readFixture);
        /**
         * write to file everything
         */
        if (~process.env.FIXTURE.indexOf("w"))
            app.use("/api", writeFixture);

    }

    var httpProxy = require('http-proxy');
    var proxy = httpProxy.createProxyServer();

    /**
     * ROUTES
     */

    /**
     * Fake error, debug
     */
    app.get("/inforbix/error/:code", function(req, res){
        return res.send(req.params.code, "Fake error...");
    });
    /**
     * use express route to watch every request
     */
    app.use(function(req, res, next){
        req.nextTick&&req.nextTick();

        res.oldWriteHead = res.writeHead;
        res.writeHead = function(statusCode, headers){
            /* add logic to change headers here */
            res.setHeader("Access-Control-Allow-Origin", "*");
            res.setHeader("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE,OPTIONS");
            res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization, Content-Length, X-Requested-With, Access-Token, X-Use-Backends");

            res.oldWriteHead(statusCode, headers);
        }


        /**
         * Bublik API
         */
        if (/\/api\//.test(req.url) || /\/uploads\//.test(req.url)) {
            return proxy.web(req, res, {
                target: {
                    host: 'backend.galaxias.co',
                    port: 80
                }
            });
        } else {
            /**
             * Static files, server definition located in 'app.js'
             */
            return proxy.web(req, res, {
                target: {
                    host: process.env.TENANT + '-local.galaxias.co',
                    port: 8282
                }
            });
        }

        next();
    });

    var port = process.env.PORT || 8001;
    require('http').createServer(app).listen(port, function(){
        console.log( "[%s] [%s] Listening %s-local.autodeskplm.com:%s and use api as tenant %s", process.pid, new Date().toISOString(), process.env.TENANT, port, process.env.APITENANT || process.env.TENANT );
    });
}