'use strict';
const express = require("express");
const bodyParser = require('body-parser');
const crypto = require('crypto');
const path = require('path');
const multer = require('multer');
const {GridFsStorage} = require('multer-gridfs-storage');
const Grid = require('gridfs-stream');
const mongoose = require("mongoose");
// const methodOverride = require("method-override");
//var tunnel = require('tunnel-ssh');
//var config = require('./db.js');

const app = express();
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

let gfs, mongoURI, conn;

// Add headers
app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', '*');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});

 
//var server = tunnel(config, (error, server) => {
     
//    if (error) 
//        console.log("SSH connection error: " + error);
      
    mongoURI = 'mongodb://localhost:27017/media';

    conn = mongoose.createConnection(mongoURI);
 
    conn.once('open', () => {
        //console.log("SSH connection done (^_^)");

        gfs = Grid(conn.db, mongoose.mongo);
        gfs.collection('uploads');
    });

 
//------------------ Storage engine ----------------- 
const storage = new GridFsStorage({
    url: mongoURI,
    file: (req, file) => {

        return new Promise((resolve, reject) => {
            crypto.randomBytes(16, (err, buf) => {
                console.log('calling storage');
                if (err) {
                    return reject(err);
                }
                const filename = buf.toString('hex') + path.extname(file.originalname);
                const fileInfo = {
                    filename: filename,
                    bucketName: 'uploads'
                };
                resolve(fileInfo);
            });
        });
    }
});
const upload = multer({ storage });
//-------------------- POST METHOD-------------------------------

// Upload method
app.post('/Upload', upload.array('files', 12), (req, res) => {
    console.log('calling upload', req);
    var files = req.file, filesNames = [];

    // set files name
    for (var i = 0; i < files.length; i++) filesNames.push(files[i].filename);


    res.json({ success: true, filesNames: filesNames });
});



// get file by name
app.get('/images/:filename', (req, res) => {
    gfs.files.findOne({ filename: req.params.filename }, (err, file) => {

        if (!file || file.length === 0) {
            return res.status(404).json({
                err: 'No file exist'
            });
        }

        const readstream = gfs.createReadStream(file.filename);
        readstream.pipe(res);

    });
});

// const port =process.env.PORT || 8008
// app.server = app.listen(port,()=>{
//     console.log(`Upload server is running on port ${port}`);
// });
const port = 8008;
app.listen(port, () => console.log('Upload server is running on ' + port));
