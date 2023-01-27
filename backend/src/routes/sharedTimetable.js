const express = require("express");
const router = express.Router();
const { SharedTimetable } = require("../models/SharedTimetable");

router.get("/:id", async (req, res) => {
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

	const sharedTimetable = await SharedTimetable.findById(id);

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
	if (!req.user) {
		return res.status(401).json({
			status: false,
		});
	}

	const { name } = req.body;

	if (!name) {
		return res.status(400).json({
			status: false,
			error: "missing name",
		});
	}

	const sharedTimetable = new SharedTimetable({
		name,
		participants: [req.user.studentId],
	});

	try {
		await sharedTimetable.save();
	} catch (err) {
		return res.status(500).json({
            status: false,
            error: err.message, 
        });
	}

	return res.json({
		status: true,
		data: { ...sharedTimetable.toObject() },
	});
});

router.post(
    '/join/:id',
    async (req, res) => {
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

        const sharedTimetable = await SharedTimetable.findById(id);

        if (!sharedTimetable) {
            return res.status(404).json({
                status: false,
                error: `shared timetable does not exist`,
            });
        }

        if (sharedTimetable.participants.includes(req.user.studentId)) {
            return res.status(200).json({
                status: true,
                error: `user already in timetable`,
            });
        }

        sharedTimetable.participants.push(req.user.studentId);

        try {
            await sharedTimetable.save();
        } catch (err) {
            return res.status(500).json({
                status: false,
                error: err.message, 
            });
        }
    
        return res.json({
            status: true,
            data: { ...sharedTimetable.toObject() },
        });
    }
)

module.exports = router;
