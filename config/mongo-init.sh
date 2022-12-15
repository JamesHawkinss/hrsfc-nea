mongo --eval "
db.auth('$MONGO_INITDB_ROOT_USERNAME', '$MONGO_INITDB_ROOT_PASSWORD');
db = db.getSiblingDB('$MONGO_NEW_DB');
db.createUser({
    user: '$MONGO_NEW_USER',
    pwd: '$MONGO_NEW_PASS',
    roles: [
        {
            role: 'readWrite',
            db: '$MONGO_NEW_DB'
        }
    ]
});"
