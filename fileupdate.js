var PORT = 8082;
var io = require("socket.io").listen(PORT);
var fs = require("fs");
Tail = require('tail').Tail; // https://github.com/lucagrulla/node-tail


console.log("dir", __dirname);

const logfile = 'jsondata.json';
var temp = '';

io.sockets.on('connection', function(socket) {
    console.log("Connected!");
    socket.emit('connected', { accept: true});

    console.log("Trying to send the content to a client...");
    console.log("dir", __dirname);
    
    tail = new Tail(logfile);
    tail.on("line", function(data) {
        if (data != temp) {         // Watch for repeated entries
            console.log("Content:", data);
            socket.emit("fileChanged", data );
        }
        temp = data;
    })
    tail.on("error", function(error) {
        console.log('ERROR: ', error);
    })
});

    // let fsWait = false;
    // fs.watch(logfile, (event, filename) => {
        // if (filename) {
        //   if (fsWait) return;
        //   fsWait = setTimeout(() => {
        //     fsWait = false;
        //   }, 100);
        //   console.log(`${filename} file Changed`);
        // }
        

    // fs.watch(logfile, function(event, filename) {
        // console.log("Event:", event);

        // if (event == "change") {
    // watchFile();
            
            // fs.readFile(__dirname + "/jsondata.json", "UTF-8", function(err, data) {
            //     if (err) throw err;
            //     socket.emit("fileChanged", data );
            //     console.log("Content:", data);
        // }
        // });





console.log("Application has started! Port: " + PORT);