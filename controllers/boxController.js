var BoxSDK = require('box-node-sdk');
var axios = require('axios');
var fs = require("fs");
require("dotenv").load();
var client = BoxSDK.getBasicClient(process.env.BOX_TOKEN);


const Box = "https://api.box.com/2.0";
const headers = { 'Authorization': `Bearer ${process.env.BOX_TOKEN}` }

// Defining methods for the Box controller
module.exports = {
    getFolder: (req, res) => {
        console.log(req.params.folder);
        // console.log(req);
        // client.folders.get(req.folder)
        //     .then(folders => {
        //         console.log(folders)
        //         folders.item_collection.entries.forEach(folder => {
        //             console.log(folder)
        //             if (folder.name === req.params.ID) {
        //                 console.log(folder)
        //                 res.json(folder)
        //             }
        //         })
        //     })
        //     .catch(err => res.json(err));
    },
    uploadFile: (req, res) => {

        // var fs = require('fs');
        // var stream = fs.createReadStream('/path/to/My File.txt');
        // var folderID = "12345";
        // client.files.uploadFile(folderID, 'My File.txt', stream)
        //     .then(file => {
        //         // ...
        //     });
        console.log(req);

    },
    createFolder: (req, res) => {
        console.log(req.params.name);
        // Creating folder wiith name of req.params.name in parent folder directory 0
        client.folders.create('0', `${req.params.name}`)
            .then(folder => {
                res.json(folder);
            });
    },
    downloadFile: (req, res) => {

    },
    getLink: (req, res) => {

    }
};
