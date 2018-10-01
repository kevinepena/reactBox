const router = require("express").Router();
const authMgmtRoutes = require('./authMgmt');
const authRoutes = require("./auth");
const boxRoutes = require('./box');
const twilioRoutes = require('./twilio');
// authMgmt Routes
router.use("/authMgmt", authMgmtRoutes);

// box routes
router.use("/box", boxRoutes);

router.use("/auth", authRoutes);

router.use('/twilio', twilioRoutes);

module.exports = router;
