const express = require("express");
const router = express.Router();
const { User } = require('../models/User');
const { SharedTimetable } = require('../models/SharedTimetable');

router.get(
    "/@me",
    (req, res) => {
        // If the user isn't authenticated, return
        if (!req.user) {
            return res.status(401).json({
                status: false,
                error: "not logged in"
            })  
        }

        // If the user does not have a timetable, return
        if (!req.user.timetable) {
            return res.status(404).json({
                status: false,
                error: "user does not have timetable"
            })
        }

        // Return the timetable object
        return res.json({
            status: true,
            data: { ...req.user.timetable.toObject() }
        })
    }
);

router.post(
    "/@me",
    async (req, res) => {
        // If the user isn't authenticated, return
        if (!req.user) {
            return res.status(401).json({
                status: false,
            })  
        }

        // Construct the timetable from the request body
        const newTimetable = {
            1: req.body[1],
            2: req.body[2],
            3: req.body[3],
            4: req.body[4],
            5: req.body[5],
        }

        // Assign the timetable to the user object
        req.user.timetable = newTimetable;

        // Update the database to save the new timetable
        try {
            await req.user.save();
        } catch (err) {
            console.error(err);
            return res.status(500).json({
                status: false,
                error: "failed to save timetable"
            })
        }

        // Return the new timetable object
        return res.json({
            status: true,
            data: { ...req.user.timetable.toObject() }
        })
    }
)

router.get(
    "/:id",
    async (req, res) => {
        // If the user isn't authenticated, return
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

        // Get the user from the database
        const user = await User.findOne({ studentId: id });

        // If the two users aren't friends, they may not view the timetable
        if (!user.friends.includes(req.user.studentId)) {
            return res.status(403).json({
                status: false,
                error: "user is not your friend"
            })
        }

        // If the user or timetable doesn't exist, return
        if (!user || !user.timetable) {
            return res.status(404).json({
                status: false,
                error: `user ${!user ? "does not exist" : "does not have timetable"}`
            })
        }

        // Return the requested timetable
        return res.json({
            status: true,
            data: { ...user.timetable.toObject() }
        })
    }
);

module.exports = router;
