

var stream = require("stream")
var express = require('express')
var crypto = require('crypto');
var bodyParser = require("body-parser");
var cors = require('cors')
const path = require('path');

var fs = require('fs')
var http = require('http')
var https = require('https')

const jwt = require('./JWT.js');


const DockerApi = require('./Docker.js')

var app = express()

app.use(cors())
app.options('*', cors());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

var a = new stream.PassThrough()



app.post('/login',jwt.login, (req, res) => {
console.log("login")

});


app.post('/randomkey',jwt.authenticateJWT, function (req, res) {
	res.setHeader('Content-Type', 'application/json');
    const privKey = crypto.randomBytes(32).toString('hex');
    res.send({privKey:"0x"+privKey});
 });
 
 
 app.post('/nodeslist',jwt.authenticateJWT,async function (req,res){
 	res.setHeader('Content-Type', 'application/json');
 	let nodes = await DockerApi.nodes();
 	res.send(nodes)
 		
 });

app.get('/logs',DockerApi.logs);
app.post('/start',jwt.authenticateJWT,DockerApi.start)
app.post('/stop',jwt.authenticateJWT,DockerApi.stop)
app.post('/remove',jwt.authenticateJWT,DockerApi.remove)
app.post('/stats',jwt.authenticateJWT,DockerApi.stats)
app.post('/changePassword',jwt.authenticateJWT,jwt.changePassword)
app.post('/newNode',jwt.authenticateJWT,DockerApi.newNode)

console.log(process.env.NODE_ENV)


app.use(express.static(path.join(__dirname, '../build')));
 


const main = async() =>{

	await DockerApi.init(process.cwd()+'/server/NodesList.json');

	
	
	
	app.listen(8888);
	

 
}




main()
