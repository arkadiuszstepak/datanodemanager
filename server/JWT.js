const jwt = require("jsonwebtoken");
const { createHash } = require('crypto');
var crypto = require('crypto');

let passwordHash = "8d969eef6ecad3c29a3a629280e686cf0c3f5d5a86aff3ca12020c923adc6c92" //default password 123456

let accessTokenSecret; 


var credentials = require('./credentials.json');
accessTokenSecret = credentials.accessTokenSecret || crypto.randomBytes(32).toString('hex');
passwordHash = credentials.passwordHash

function generateAccessToken(password) {
  return jwt.sign(password, process.env.TOKEN_SECRET, { expiresIn: '1800s' });
}


const authenticateJWT = (req, res, next) => {
    const authHeader = req.body.accessToken;
    console.log(authHeader)
	res.setHeader('Content-Type', 'application/json');
	
    if (authHeader) {
        jwt.verify(authHeader, accessTokenSecret, (err, user) => {
            if (err) {
                return res.sendStatus(403);
            }

            req.user = user;
            next();
        });
    } else {
        return res.sendStatus(403);
        //res.write({status :'Wrong Password'});
    }
};


const login =  (req, res, next) => {
    const password  = req.body.password;
    const passwordOK = password === passwordHash;

	res.setHeader('Content-Type', 'application/json');
    if (passwordOK) {
        // Generate an access token
        const accessToken = jwt.sign({user:'user1'}, accessTokenSecret, { expiresIn: '20m' });

        res.json({
        	status:'OK',
            accessToken
        });
    } else {
        res.send({status :'Wrong Password'});
    }
}

const changePassword =  (req, res, next) => {
 
    const password  = req.body.password;
    const authHeader = req.body.accessToken;
    //update password
    passwordHash = password
    
	res.setHeader('Content-Type', 'application/json');


        // Generate an access token

        const accessToken = jwt.sign({user:'user1'}, accessTokenSecret, { expiresIn: '20m' });

        res.json({
        	status:'OK',
            accessToken
        });
  
}

module.exports = {
    authenticateJWT,
    login,
    changePassword
    
  
};
