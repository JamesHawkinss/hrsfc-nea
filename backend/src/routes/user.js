const express = require("express");
const router = express.Router();
const { User } = require('../models/User');

router.get(
    "/@me",
    (req, res) => {
        // If the user isn't authenticated, return
        if (!req.user) {
            return res.status(401).json({
                status: false,
            })  
        }

        // Return the user object, removing the password hash
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

        // If the user doesn't exist, return
        if (!user) {
            return res.status(404).json({
                status: false,
                error: `user does not exist`
            })
        }

        // Return the user object, removing the password hash
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
        // If the user isn't authenticated, return
        if (!req.user) {
            return res.status(401).json({
                status: false,
            })  
        }

        // If the request doesn't include any search criteria, return
        if (!req.body || !(req.body.studentId || req.body.username)) {
            return res.status(400).json({
                status: false,
                error: "missing search query: must include studentId or username"
            })
        }

        // Construct a filter for querying database
        const filter = {
            ...(req.body.studentId ? { studentId: req.body.studentId } : {}),
            ...(req.body.username ? { username: req.body.username } : {}),
        }

        // Find one user matching the filter
        const user = await User.findOne(filter);

        // If no users found, return
        if (!user) {
            return res.status(404).json({
                status: false,
                error: "user not found"
            })
        }

        // Return the user
        return res.status(200).json({
            status: true,
            data: user
        })
    }
)

module.exports = router;
