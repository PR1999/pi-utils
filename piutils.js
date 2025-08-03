import { Buffer } from 'node:buffer';
const https = require('node:https');

class piUtils {
    constructor(serverName, domain) {
        this.serverName = serverName;
        this.domain = domain;
    }

    makeRequest(options, postData=null) {
        const req = https.request(options, (res) => {
            console.log(`Response: ${res.statusCode} ${res.statusMessage}`);
            console.log(`Headers: ${JSON.stringify(res.headers)}`);
            let data = '';
            res.on('data', (chunk) => {
                data += chunk;
            });

        });

        req.on('login', (info, callback) => {
            login().then((cred)=>{
            callback(cred.user, cred.password);
            })
        })

        req.on('error', (e) => {
            console.error(`Problem with request: ${e.message}`);
        });

        if (!(postData===null)) {
            req.write(postData);
        }

        req.end();
    }

    login() {
        console.error('Login method not implemented');
    }

    batchRequest() {

    }
}


  



  


  



  


  













  



  


  



  


  



  



  


  



  


  




  



  



  


  



  


  


