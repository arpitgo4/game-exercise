

var liveServer = require("live-server");
 
var params = {
    port: process.env.PORT, // Set the server port. Defaults to 8080.
    host: "0.0.0.0", // Set the address to bind to. Defaults to 0.0.0.0 or process.env.IP.
    root: ".", // Set root directory that's being served. Defaults to cwd.
    open: false, // When false, it won't load your browser by default.
    ignore: 'node_modules', // comma-separated string for paths to ignore
    file: "index.html", // When set, serve this file (server root relative) for every 404 (useful for single-page applications)
    wait: 100, // Waits for all changes, before reloading. Defaults to 0 sec.
    logLevel: 2, // 0 = errors only, 1 = some, 2 = lots
};


liveServer.start(params);