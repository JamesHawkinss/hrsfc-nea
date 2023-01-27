const express = require("express");
const router = express.Router();
const { User } = require('../models/User');
const { SharedTimetable } = require('../models/SharedTimetable');

router.get(
    "/@me",
    (req, res) => {
        if (!req.user) {
            return res.status(401).json({
                status: false,
                error: "not logged in"
            })  
        }

        if (!req.user.timetable) {
            return res.status(404).json({
                status: false,
                error: "user does not have timetable"
            })
        }

        return res.json({
            status: true,
            data: { ...req.user.timetable.toObject() }
        })
    }
);

router.post(
    "/@me",
    async (req, res) => {
        if (!req.user) {
            return res.status(401).json({
                status: false,
            })  
        }

        const newTimetable = {
            1: req.body[1],
            2: req.body[2],
            3: req.body[3],
            4: req.body[4],
            5: req.body[5],
        }

        req.user.timetable = newTimetable;

        try {
            await req.user.save();
        } catch (err) {
            console.error(err);
            return res.status(500).json({
                status: false,
                error: "failed to save timetable"
            })
        }

        return res.json({
            status: true,
            data: { ...req.user.timetable.toObject() }
        })
    }
)

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

        if (!user.friends.includes(req.user.studentId)) {
            return res.status(403).json({
                status: false,
                error: "user is not your friend"
            })
        }

        if (!user || !user.timetable) {
            return res.status(404).json({
                status: false,
                error: `user ${!user ? "does not exist" : "does not have timetable"}`
            })
        }

        return res.json({
            status: true,
            data: { ...user.timetable.toObject() }
        })
    }
);

module.exports = router;
