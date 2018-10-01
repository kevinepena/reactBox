const accountSid = 'AC050522133dc97c1ade884df14f108107';
const authToken = 'f5ad2fe788f46635bda22899fc616f03';
const client = require('twilio')(accountSid, authToken);
require("dotenv").load();


// DOCS
// https://www.twilio.com/docs/proxy/quickstart

// Defining methods for the booksController
module.exports = {
    createService: function (req, res) {
        //Need Unique Name
        client.proxy.services.create({ uniqueName: req.uniqueName })
            .then(service => {
                // service.sid is required to add phone number
                console.log(service.sid)
            })
            .done();
    },
    sendMessage: function (req, res) {
        client.proxy.services('KSXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX')
        .sessions('KCXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX')
        .participants('KPXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX')
        .messageInteractions
        .create({body: 'Reply to this message to chat!'})
        .then(message_interaction => console.log(message_interaction.sid))
        .done();
    },
    createSession: function (req, res) {
        // A session is a conversation between two people
        // Unique name for each session
        // Session ID sent to users metadata
        client.proxy.services('KSXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX')
            .sessions
            .create({ uniqueName: 'MyFirstSession' })
            .then(session => console.log(session.sid))
            .done();
    },
    addingNumber: function (req, res) {
        client.proxy.services('KSXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX')
            .phoneNumbers
            .create({ sid: 'PNXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX' })
            .then(phone_number => console.log(phone_number.sid))
            .done();
    },
    createParticipant: function (req, res) {
        client.proxy.services('KSXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX')
            .sessions('KCXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX')
            .participants
            .create({friendlyName: 'Alice', identifier: '+15558675310'})
            .then(participant => console.log(participant.proxyIdentifier))
            .done();
    }
};
