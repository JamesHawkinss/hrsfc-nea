db.createUser(
    {
        user: "user",
        pwd: "pass",
        roles: [
            {
                role: "readWrite",
                db: "hrsfc-timetables"
            }
        ]
    }
);