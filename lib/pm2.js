const pm2 = require('pm2');


const connect = () => {
    return new Promise( (resolve, reject) => {
        pm2.connect(err => {
            if(err){
                return reject(err);
            }else{
                return resolve();
            }
        })
    })
}

const start = (options) => {
    return new Promise( (resolve, reject) => {
        pm2.start(options, (err, apps) => {
            if(err){
                console.log("Could not start!");
                return reject(err);
            }else{
                console.log("Started!")
                return resolve(apps);
            }
        })
    })
}

const stop = (name) => {
    return new Promise( (resolve, reject) => {
        pm2.stop(name, (err) => {
            if(err){
                console.log("Could not stop!");
                return reject(err);
            }else{
                console.log("Stopped!")
                return resolve();
            }
        })
    })
}

const disconnect = () => {
    return new Promise( (resolve, reject) => {
        pm2.disconnect(err => {
            if(err){
                return reject(err);
            }else{
                return resolve();
            }
        })
    })
}

exports.connect = connect;
exports.start = start;
exports.stop = stop;
exports.disconnect = disconnect;
