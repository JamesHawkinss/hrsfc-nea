const express = require("express");
const router = express.Router();

router.get(
    "/",
    (req, res) => {
        res.json({ hi: "123" })
    }
);

module.exports = router;
