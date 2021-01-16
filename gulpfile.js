require('dotenv').config({
    silent: true
});

require('rootpath')();

const gulp = require('gulp'),
    nodemon = require('gulp-nodemon'),
    pkg = require('package.json'),
    pm2 = require('pm2');


const startServer = (next) => {
    // @todo : write the same for prod
    nodemon({
        script: 'index.js',
        ext: 'js',
        verbose: true,
        ignore: [
            'gulpfile.js',
            'node_modules/*'
        ],
        env: {
            'NODE_ENV': 'development'
        },
        done: next
    })
}

const stopServer = (next) => {
    Promise.resolve()
        .then( () => {
            return pm2.connect();
        })
        .then( () => {
            return pm2.stop(process.env.NAME || pkg.name);
        })
        .then( () => {
            return pm2.disconnect();
        })
        .then( () => {
            return next();
        })
        .catch(err => {
            pm2.disconnect();
            console.log(err);
            return next();
        });
}


gulp.task('stop-server', stopServer);
gulp.task('start-server', startServer);
gulp.task('default', gulp.series(['stop-server', 'start-server']))