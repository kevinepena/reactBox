var request = require("request");
require("dotenv").load();

// Defining methods for the booksController
module.exports = {
    getToken: function (req, res) {
        var options = {
            method: 'POST',
            url: 'https://surreality.auth0.com/oauth/token',
            headers: { 'content-type': 'application/json' },
            body: `{"client_id":"${process.env.AUTHMGMT_CLIENTID}","client_secret":"${process.env.AUTHMGMT_SECRET}","audience":"urn:auth0-authz-api","grant_type":"client_credentials"}`
        };
        
        request(options, function (error, response, body) {
            if (error) throw new Error(error);

            // console.log(body);
            // console.log(body.access_token);
            // console.log(body.expires_at);

            // console.log('yo')
            
            // res.cookie("tkn", body.access_token, {expire: new Date() + body.expires_at}).send("set");
        });
    },
    login: function (req, res) {

    }
    // findById: function (req, res) {
    //   db.Article
    //     .findById(req.params.id)
    //     .then(dbModel => res.json(dbModel))
    //     .catch(err => res.status(422).json(err));
    // },
    // create: function (req, res) {
    //   db.Article
    //     .create(req.body)
    //     .then(dbModel => res.json(dbModel))
    //     .catch(err => res.status(422).json(err));
    // },
    // update: function (req, res) {
    //   db.Article
    //     .findOneAndUpdate({ _id: req.params.id }, req.body)
    //     .then(dbModel => res.json(dbModel))
    //     .catch(err => res.status(422).json(err));
    // },
    // remove: function (req, res) {
    //   db.Article
    //     .findById({ _id: req.params.id })
    //     .then(dbModel => dbModel.remove())
    //     .then(dbModel => res.json(dbModel))
    //     .catch(err => res.status(422).json(err));
    // }
};
