const express = require('express');
const cors = require('cors');
const app = express();
const http = require('http');
const checker = require('http').Server(app);
const io = require('socket.io')(checker);
var port = process.argv.slice(2); //if need to specify port as argument
if(port == ''){
  port = 4999; //default port
}
var server1port = 8000;//Server 1 port Num
var server2port = 8001;//Server 2 port Num
var destport;//detination Port
var serAvail;//use to check server 1 avail or not

app.use(cors());
// function that used to check server 1 healthy
//if server 1 is avail use server 1 port as destPort
//else use server 2
function checkServerStatus(){
  var alter = {
    host: 'localhost',
    port: server1port,
  };
  //check can access serv 1 or not
  let check = http.get(alter, function(res){
    // console.log('Hello : ' + res.statusCode);
    serAvail = true;
  });

  check.on('error', function(res){
    console.log(res.name);
    serAvail = false;
  });
  //need to wait 1 sec for connection
  setTimeout(() => {
    if(serAvail){
      // console.log("success ping to port "+server1port);
      destPort = server1port;
    } else{
      // console.log("failed ping to port "+server2port);
      destPort = server2port;
    }
    console.log("checker will return port: "+destPort+" to client");
  },1000);
}

//check server status every 1 sec
var id = setInterval(checkServerStatus, 1000);

//api for client
app.get('/selServ', function(req,res){
  checkServerStatus();
  console.log('destination port is ' + destport);
   res.send({'destination' : 'http://localhost:'+destPort});
});

//socket for connection to the checker
io.on('connectio', function(socket){
  console.log(socket.id + ' has joined the checker');
});

checker.listen(Number(port), function(){
    console.log('server is running on port ' + port + ': Server Check')
});
