const express = require("express");
const router = express.Router();
const { User } = require('../models/User');

router.get(
    "/@me",
    (req, res) => {
        if (!req.user) {
            return res.status(401).json({
                status: false,
            })  
        }

        return res.json({
            status: true,
            data: {
                ...req.user.toObject(),
                password: undefined,
            }
        })
    }
);

router.get(
    "/:id",
    async (req, res) => {
        if (!req.user) {
            return res.status(401).json({
                status: false,
            })  
        }
    
        const { id } = req.params;
        

        if (!id) {
            return res.status(400).json({
                status: false,
                error: "missing student id"
            })
        }

        const user = await User.findOne({ studentId: id });

        if (!user) {
            return res.status(404).json({
                status: false,
                error: `user does not exist`
            })
        }

        return res.json({
            status: true,
            data: {
                ...user.toObject(),
                password: undefined,
            }
        })
    }
);

router.post(
    "/search",
    async (req, res) => {
        if (!req.user) {
            return res.status(401).json({
                status: false,
            })  
        }

        if (!req.body || !(req.body.studentId || req.body.username)) {
            return res.status(400).json({
                status: false,
                error: "missing search query: must include studentId or username"
            })
        }

        const filter = {
            ...(req.body.studentId ? { studentId: req.body.studentId } : {}),
            ...(req.body.username ? { username: req.body.username } : {}),
        }

        const user = await User.findOne(filter);

        if (!user) {
            return res.status(404).json({
                status: false,
                error: "user not found"
            })
        }

        return res.status(200).json({
            status: true,
            data: user
        })
    }
)

module.exports = router;
