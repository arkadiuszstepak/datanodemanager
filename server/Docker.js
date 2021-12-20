var Docker = require('dockerode');
var docker = new Docker({ socketPath: '/var/run/docker.sock' });
const fs = require('fs');
var cron = require('node-cron');
var stream = require("stream")

var ethers = require('ethers')

var template = require('./template.json')



const getPublicKey = (privateKey) => {
	try {
		return new ethers.Wallet(privateKey).address
	}
	catch (e) {
		return 'Invalid private key.'
	}
}


var NodesList = [];
var a = new stream.PassThrough()

const loadNodesListFromFile = filename => {

	fs.readFile(filename, 'utf8', (err, data) => {
		if (err) {
			console.log(`Error reading nodes list file: ${err}`);
			return;
		}
		NodesList = JSON.parse(data);
	});

}

const init = async (filename) => {
	loadNodesListFromFile(filename)

	//update stats every 5 seconds
	cron.schedule('* * * * * *', () => {
		NodesList.map((node, id) => {
			getContainerStatus(node.dockerId, id, function (status, id) {
				NodesList[id].status = status
			})
		})
	})
}




const nodes = async () => {
	return NodesList;
}

const getContainers = async () => {
	const containers = await docker.listContainers()
	const container = await docker.getContainer(containers[0]["Id"]);

	return containers

}

const getContainerStatus = async (containerId, id, cb) => {


	const container = await docker.getContainer(containerId);

	container.inspect((err, data) => {

		if (err) {
			console.log(err, id)
			cb("Not Exist", id)
			return
		}
		cb(data.State.Status, id)

	});


}

//const getNodeStatus(id) = {


//}


const logs = async (req, res) => {

	const containerId = req.query.id;
	const container = await docker.getContainer(containerId);


	res.set({
		'Cache-Control': 'no-cache',
		'Content-Type': 'text/event-stream',
		'Connection': 'keep-alive'
	});




	container.attach({ stream: true, stdout: true, stderr: true }, function (err, stream) {
		if (err) {
			res.write(err.toString())
			return;
		}

		stream.on('data', (chunk) => {
			console.log(chunk)
			res.write(`data: ${chunk}\n\n`)
		});


	})


}
//docker run -it -p 7170:7170 -p 7171:7171 -p 1883:1883 -v $(cd ~/.streamrDocker; pwd):/root/.streamr streamr/broker-node:testnet
const createContainer = async(directory) => {

	  return docker.createContainer({
		Image: 'streamr/broker-node:testnet',
		AttachStdin: true,
		AttachStdout: true,
		AttachStderr: true,
		ExposedPorts: {
			"7170/tcp": {}, "7171/tcp": {}, "1883/tcp": {}
		},
		Tty: false,
		Binds: [`${process.cwd()+"/"+directory}:/root/.streamr`],
		HostConfig: {
			Binds: [
                `${process.cwd()+"/"+directory}:/root/.streamr`
            ],
			PortBindings: {
				'7170/tcp': [{ 'HostPort': '7170' }] ,
				'7171/tcp': [{ 'HostPort': '7171' }] ,
				'1883/tcp': [{ 'HostPort': '1883' }] 

			}
		},

		  Cmd: ['/bin/sh', '-c', './bin/broker.js','/root/.streamr/config.json'],
						OpenStdin: true,
						StdinOnce: false
		})
		

		

}


const start = async (req, res) => {
	const containerId = req.body.id;
	const container = await docker.getContainer(containerId);

	container.start(function (err, data) {
		if (err) {
			res.send(err)
		} else {

			//res.sendStatus(200);
			res.send({ status: 'ok' })
		}
	});

}


const stop = async (req, res) => {
	const containerId = req.body.id;
	const container = await docker.getContainer(containerId);

	container.stop(function (err, data) {
		if (err) {
			res.send(err)
		} else {

			//res.sendStatus(200);
			res.send({ status: 'ok' })
		}
	});

}

const stats = async (req, res) => {
	const containerId = req.body.id;
	const container = await docker.getContainer(containerId);

	container.stats({ decode: true, stream: false }, function (err, data) {
		if (err) {
			res.send(err)
		} else {

			let node = NodesList.find(el => el.dockerId === containerId);

			res.send({ status: node.status, data })
			//res.sendStatus(200);
			//data.pipe(res)
		}
	});

}



const newNode = async (req, res) => {
	const privateKey = req.body.privateKey;
	const name = req.body.name;
	const publicKey = getPublicKey(privateKey)
	let dockerId;
	// create new directory for node data 
	let directory = "/server/NodesData/" + publicKey;

	fs.mkdir("./"+directory, (err) => {
		if (err) {
			console.log(err);
			res.send(err)
		}
		console.error("Directory is created.");
		//update private key in template and save
		let tmp = template;
		template.ethereumPrivateKey = privateKey;
		try {
			fs.writeFileSync("./"+directory + "/broker-config.json", JSON.stringify(tmp))
			createContainer(directory).then((container)=>{
				container.inspect((err,data)=>
				{
					console.log(data["Id"]);
					NodesList.push({
						name : name,
						privateKey : privateKey,
						publicKey : publicKey,
						status : "running",
						provider : "/var/socket/docker",
						dockerId: data["Id"]
				
					})
					console.log('sdfdsfsfsdf')
					//save nodes list to file 
					fs.writeFileSync(process.cwd()+"/server/NodesList.json", JSON.stringify(NodesList))

					//send respond ok and docker container id
					
				})
			
			})
			res.send({ status: 'ok'})

		} catch (err) {
			console.error(err)
			res.send(err)
		}
		

	

		
	});

}






module.exports = {
	start,
	stop,
	stats,
	logs,
	newNode,
	init,
	nodes,
	getContainers,
	getContainerStatus

};
