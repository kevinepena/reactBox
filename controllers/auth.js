var request = require("request");
// require("dotenv").load();
const axios = require('axios');

// Defining methods for the booksController
module.exports = {
    getToken: function (req, res) {

        const tkn = req.cookies['tkn'];

        if (!tkn) {
            var options = {
                method: 'POST',
                url: 'https://surreality.auth0.com/oauth/token',
                headers: { 'content-type': 'application/json' },
                body: `{"client_id":"${process.env.AUTH0_CLIENTID}","client_secret":"${process.env.AUTH0_SECRET}","audience":"https://surreality.auth0.com/api/v2/","grant_type":"client_credentials"}`
            };

            request(options, function (error, response, body) {
                if (error) throw new Error(error);
                const Token = JSON.parse(body);
                res.cookie("tkn", Token.access_token, {
                    maxAge: Token.expires_in * 12,
                    httpOnly: true,
                    sameSite: true,
                    // path: 'api/auth'
                    // secure: true  ONLY FOR SECURE HTTPS - PRODUCTION ONLY
                }).send("new tkn");
            });
        } else {
            res.json("old tkn");
        }
    },
    getUsers: function (req, res) {
        const tkn = req.cookies['tkn'];

        if (!tkn) res.json('No Token Found');

        const headers = { 'Authorization': `Bearer ${tkn}` }
        axios.get("https://surreality.auth0.com/api/v2/users", { headers })
            .then(users => {
                res.json(users.data)
            })
            .catch(err => {
                res.json(err)
            });
    },
    createUser: function (req, res) {
        const tkn = req.cookies['tkn'];

        const headers = {
            'Authorization': `Bearer ${tkn}`,
            'Content-Type': 'application/json'
        }
        axios.post('https://surreality.auth0.com/api/v2/users', JSON.stringify(req.body.authUser), { headers })
            .then(resp => {
                res.json(resp.data);
            })
            .catch(err => {
                res.json(err);
            });
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
