const express = require("express");
const router = express.Router();
const { SharedTimetable } = require("../models/SharedTimetable");

router.get("/:id", async (req, res) => {
	// If the user isn't authenticated, return
	if (!req.user) {
		return res.status(401).json({
			status: false,
		});
	}

	const { id } = req.params;

	if (!id) {
		return res.status(400).json({
			status: false,
			error: "missing shared timetable id",
		});
	}

	// Get the shared timetable from the database
	const sharedTimetable = await SharedTimetable.findById(id);

	// If that shared timetable doesn't exist, return
	if (!sharedTimetable) {
		return res.status(404).json({
			status: false,
			error: `shared timetable does not exist`,
		});
	}

	// TODO construct timetable from sharedTimetable

	return res.json({
		status: true,
		data: { ...sharedTimetable.toObject() },
	});
});

router.post("/create", async (req, res) => {
	// If the user isn't authenticated, return
	if (!req.user) {
		return res.status(401).json({
			status: false,
		});
	}

	// Abstract name from request body
	const { name } = req.body;

	if (!name) {
		return res.status(400).json({
			status: false,
			error: "missing name",
		});
	}

	// Create a new shared object document, including the requesting user
	const sharedTimetable = new SharedTimetable({
		name,
		participants: [req.user.studentId],
	});

	// Save the new shared timetable to the database
	try {
		await sharedTimetable.save();
	} catch (err) {
		return res.status(500).json({
            status: false,
            error: err.message, 
        });
	}

	// On success, return the new shared timetable object
	return res.json({
		status: true,
		data: { ...sharedTimetable.toObject() },
	});
});

router.post(
    '/join/:id',
    async (req, res) => {
		// If the user isn't authenticated, return
        if (!req.user) {
            return res.status(401).json({
                status: false,
            });
        }
    
		// Abstract the shared timetable ID from request params
        const { id } = req.params;
    
        if (!id) {
            return res.status(400).json({
                status: false,
                error: "missing shared timetable id",
            });
        }

		// Get the shared timetable from the database
        const sharedTimetable = await SharedTimetable.findById(id);

		// If the shared timetable doesn't exist, return
        if (!sharedTimetable) {
            return res.status(404).json({
                status: false,
                error: `shared timetable does not exist`,
            });
        }

		// If the user is a participant, return
        if (sharedTimetable.participants.includes(req.user.studentId)) {
            return res.status(200).json({
                status: true,
                error: `user already in timetable`,
            });
        }

		// Add the user as a participant
        sharedTimetable.participants.push(req.user.studentId);

		// Update the shared timetable in the database
        try {
            await sharedTimetable.save();
        } catch (err) {
            return res.status(500).json({
                status: false,
                error: err.message, 
            });
        }
    
		// Return the new shared timetable object
        return res.json({
            status: true,
            data: { ...sharedTimetable.toObject() },
        });
    }
)

module.exports = router;
