import { Buffer } from 'node:buffer';
const https = require('node:https');

class piUtils {
    cookieStore = {};
    piWebAPIpath = '/piwebapi';

    constructor(serverName, domain) {
        this.serverName = serverName;
        this.domain = domain;
    }

    makeRequest(options, postData = null) {
        const req = https.request(options, (res) => {
            console.log(`Response: ${res.statusCode} ${res.statusMessage}`);
            console.log(`Headers: ${JSON.stringify(res.headers)}`);
            if (res.headers['set-cookie']) {
                parseCookies(res.headers['set-cookie']);
            }
            let data = '';
            res.on('data', (chunk) => {
                data += chunk;
            });

        });

        req.on('login', (info, callback) => {
            login().then((cred) => {
                callback(cred.user, cred.password);
            })
        })

        req.on('error', (e) => {
            console.error(`Problem with request: ${e.message}`);
        });

        if (!(postData === null)) {
            req.write(postData);
        }

        req.end();
    }

    parseCookies(setCookieHeaders) {
        setCookieHeaders.forEach((cookie) => {
            const [cookiePair] = cookie.split(';');
            const [key, value] = cookiePair.split('=');
            cookieStore[key] = value;
        });
    };

    getCookies() {
        return Object.entries(cookieStore)
            .map(([key, value]) => `${key}=${value}`)
            .join('; ');
    };

    optionsGet(path) {
        let opts = {
            hostname: this.serverName + this.domain,
            path: path,
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Cookie': this.getCookies()
            }
        }
    }

    optionsPost(path, postData) {
        let opts = {
            hostname: this.serverName + this.domain,
            path: path,
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Cookie': this.getCookies(),
                'X-Requested-With': 'XMLHttpRequest',
                'Content-Length': Buffer.byteLength(postData)
            }
        }
    }

    login() {
        console.error('Login method not implemented - please override this method');
    }

    batchRequest() {
        let path = this.piWebAPIpath + '/batch';
        console.error('batchRequest method not implemented');
    }

    streamRecorded(webId, startTime = null, endTime = null, maxCount = 1000, selectedFields = []) {
        let path = this.piWebAPIpath + '/streams/' + webId + '/recorded';
        console.error('streamRecorded method not implemented');
    }

    streamInterpolated(webId, startTime = null, endTime = null, interval, syncTime, selectedFields = []){
        let path = this.piWebAPIpath + '/streams/' + webId + '/interpolated';
        console.error('streamInterpolated method not implemented');
    }

    eventframesSearch(){
        console.error('eventframesSearch method not implemented');
    }

    eventframesBatchSearch(){
        console.error('eventframesGet method not implemented');
    }
}
























































































