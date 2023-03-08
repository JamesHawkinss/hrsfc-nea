const express = require("express");
const router = express.Router();
const { User } = require('../models/User');

const isFriend = (user, studentId) => user.friends.includes(studentId);

router.get(
    "/@me",
    async (req, res) => {
        // If the user isn't authenticated, return
        if (!req.user) {
            return res.status(401).json({
                status: false,
            })  
        }

        // we could get the data from req.user but
        // we want to get the latest data from the database

        // Get the latest user data from the database
        const user = await User.findById(req.user._id);

        // Collate all the user's friends
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
        // If the user isn't authenticated, return
        if (!req.user) {
            return res.status(401).json({
                status: false,
            })  
        }

        // we could get the data from req.user but
        // we want to get the latest data from the database

        // Get the latest user data from the database
        const user = await User.findById(req.user._id);

        // Return the friendRequests object
        return res.json({
            status: true,
            data: { ...user.friendRequests.toObject() }
        });
    }
);

router.post(
    "/:id/request",
    async (req, res) => {
        // If the user isn't authenticated, return
        if (!req.user) {
            return res.status(401).json({
                status: false,
            })  
        }

        // Abstract id from query parameters
        const { id } = req.params;
        
        if (!id) {
            return res.status(400).json({
                status: false,
                error: "missing student id"
            })
        }

        // Stop user from sending a friend request to themselves
        if (id === req.user.studentId) {
            return res.status(400).json({
                status: false,
                error: "cannot send request to self"
            })
        }

        // Get the latest user data of the destination user
        const user = await User.findOne({ studentId: id });

        // If a friend request already exists for this connection, return
        if (user.friendRequests.includes(req.user.studentId)) {
            return res.status(400).json({
                status: false,
                error: "request already sent"
            })
        }

        // If the users are already friends, return
        if (isFriend(req.user, id)) {
            return res.status(400).json({
                status: false,
                error: "already friends"
            })
        }

        // Create the friend request in the database
        await User.findOneAndUpdate(
            { studentId: id },
            { $push: { friendRequests: req.user.studentId } }
        );

        return res.status(200).json({ status: true });
    }
);

router.post(
    "/accept/:id",
    async (req, res) => {
        // If the user isn't authenticated, return
        if (!req.user) {
            return res.status(401).json({
                status: false,
            })  
        }

        // Abstract the user id from the query params
        const { id } = req.params;
        
        if (!id) {
            return res.status(400).json({
                status: false,
                error: "missing student id"
            })
        }

        // we could get the data from req.user but
        // we want to get the latest data from the database
        const self = await User.findById(req.user._id);

        // If there is no pending friend request for the provided id, return
        if (!self.friendRequests.includes(id)) {
            return res.status(400).json({
                status: false,
                error: "no such friend request"
            })
        }

        // Update the self friend requests object to remove the accepted friend request
        // and add the user as a friend
        const newFriendRequests = self.friendRequests.filter((studentId) => studentId !== id);

        // update self user
        await User.findOneAndUpdate(
            { studentId: self.studentId },
            {
                friendRequests: newFriendRequests,
                $push: { friends: id }
            }
        );

        // Update the destination user to finalise the friendship
        await User.findOneAndUpdate(
            { studentId: id },
            { $push: { friends: self.id } }
        );


    }
);

// TODO remove friend

module.exports = router;