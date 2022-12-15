const express = require("express");
const router = express.Router();

router.get(
    "/@me",
    (req, res) => {
        if (req.user) {
            return res.json({ status: true, data: {
                ...req.user.toObject()
            }})
        }
        res.status(401).json({
            status: false,
        })
    }
);

module.exports = router;
