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
        client.folders.get(0)
            .then(folders => {
                // console.log(folders.item_collection)
                folders.item_collection.entries.forEach(folder => {
                    console.log(folder)
                    if (folder.name === req.params.ID) {
                        console.log(folder)
                        res.json(folder)
                    }
                })
            })
            .catch(err => res.json(err));
    },
    uploadFile: (req, res) => {

        console.log(req);

    },
    createFolder: (req, res) => {
        console.log(req.params.ID);
        client.folders.create('0', `${req.params.ID}`)
            .then(folder => {
                console.log(folder);
            });
    },
    downloadFile: (req, res) => {

    },
    getLink: (req, res) => {

    }
};
