var request = require("request");
require("dotenv").load();

// Defining methods for the booksController
module.exports = {
    getToken: function (req, res) {

        var options = {
            method: 'POST',
            url: 'https://surreality.auth0.com/oauth/token',
            headers: { 'content-type': 'application/json' },
            body: `{"client_id":"${process.env.AUTH0_CLIENTID}","client_secret":"${process.env.AUTH0_SECRET}","audience":"https://surreality.auth0.com/api/v2/","grant_type":"client_credentials"}`
        };

        request(options, function (error, response, body) {
            if (error) throw new Error(error);

            res.json(body);

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
