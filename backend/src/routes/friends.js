const express = require("express");
const router = express.Router();
const { User } = require('../models/User');

const isFriend = (user, studentId) => user.friends.includes(studentId);

router.get(
    "/@me",
    async (req, res) => {
        if (!req.user) {
            return res.status(401).json({
                status: false,
            })  
        }

        // we could get the data from req.user but
        // we want to get the latest data from the database

        const user = await User.findById(req.user._id);

        const friends = [];
        for (const friendId of user.friends) {
            friends.push(await User.findOne({ studentId: friendId }))
        }

        return res.json({
            status: true,
            data: friends
        });
    }
)

router.get(
    "/@me/requests",
    async (req, res) => {
        if (!req.user) {
            return res.status(401).json({
                status: false,
            })  
        }

        // we could get the data from req.user but
        // we want to get the latest data from the database

        const user = await User.findById(req.user._id);

        return res.json({
            status: true,
            data: { ...user.friendRequests.toObject() }
        });
    }
);

router.post(
    "/:id/request",
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

        if (id === req.user.studentId) {
            return res.status(400).json({
                status: false,
                error: "cannot send request to self"
            })
        }

        const user = await User.findOne({ studentId: id });

        if (user.friendRequests.includes(req.user.studentId)) {
            return res.status(400).json({
                status: false,
                error: "request already sent"
            })
        }

        if (isFriend(req.user, id)) {
            return res.status(400).json({
                status: false,
                error: "already friends"
            })
        }

        await User.findOneAndUpdate(
            { studentId: id },
            { friendRequests: [...user.friendRequests, req.user.studentId] }
        );

        return res.status(200).json({ status: true});
    }
);

router.post(
    "/accept/:id",
    async (req, res) => {

    }
);

module.exports = router;