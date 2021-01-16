const express = require('express'),
    bodyParser = require('body-parser'),
    v1ApiRoutes = require('./routes/v1/api');
    
    require('dotenv').config();
    
    const app = express();
    
    const port = process.env.PORT || 3003;
    
    app.use((req, res, next) => {
      res.header("Access-Control-Allow-Origin", "*");
      res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
      next();
    });
    
    app.use(bodyParser.json());
    app.use(express.static('public'));
    app.use('/images', express.static(__dirname + '/Images'));

    app.use('/api/v1', v1ApiRoutes);
    
    app.use((req, res, next) => {
      res.send('Welcome to Express');
    });
    
    app.use((err, req, res, next) => {
      res.send({code: 401, message: err.toString()});
    });
    
    app.listen(port, () => {
      console.log(`Server running on port ${port}`)
    });