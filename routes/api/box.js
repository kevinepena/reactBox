const router = require("express").Router();
const controller = require("../../controllers/boxController");
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });
// setup a new instance of the AvatarStorage engine 
// var ImgStorage = require('../helpers/imgStorage');

// var storage = ImgStorage({
//     square: true,
//     responsive: true,
//     greyscale: true,
//     quality: 70
// });

var limits = {
    fileSize: 1024 * 1024, // 1 MB (max file size)
};

// var fileFilter = function (req, file, cb) {
//     // supported image file mimetypes
//     var allowedMimes = ['image/jpeg', 'image/pjpeg', 'image/png', 'image/gif'];

//     if (_.includes(allowedMimes, file.mimetype)) {
//         // allow supported image files
//         cb(null, true);
//     } else {
//         // throw error for invalid files
//         cb(new Error('Invalid file type. Only jpg, png and gif image files are allowed.'));
//     }
// };

// setup multer
// var upload = multer({
// 	limits: limits
// });


require("dotenv").load();

// Auth related frameworks
const jwt = require("express-jwt");
const jwtAuthz = require("express-jwt-authz");
const jwksRsa = require("jwks-rsa");


const checkJwt = jwt({
    // Dynamically provide a signing key
    // based on the kid in the header and 
    // the signing keys provided by the JWKS endpoint.
    secret: jwksRsa.expressJwtSecret({
        cache: true,
        rateLimit: true,
        jwksRequestsPerMinute: 5,
        jwksUri: `https://${process.env.AUTH0_DOMAIN}/.well-known/jwks.json`
    }),

    // Validate the audience and the issuer.
    audience: process.env.AUTH0_AUDIENCE,
    issuer: `https://${process.env.AUTH0_DOMAIN}/`,
    algorithms: ['RS256']
});

const checkAdmin = jwtAuthz(['scope:admin']);


// matches with /api/box
router
    .route("/");

router
    .route("/:ID")
    .get(checkJwt, controller.getFolder);

router
    .route("/create/:ID")
    .get(checkJwt, checkAdmin, controller.createFolder);

router
    .route("/upload/:ID")
    .post(checkJwt, upload.any(), controller.uploadFile)

router
    .route("/download/:ID")
    .get(checkJwt, controller.downloadFile);

router
    .route("/link/:ID")
    .get(checkJwt, controller.getLink);


module.exports = router;