module.exports = {
    databaseOptions: {
        host: "localhost",
        port: 3306,
        user: "next",
        password: "dummypwd",
        database: "next"
    },
    createDatabase: true,
    dbSchema: "./sdb_schema.sql",
    truncateDatabase: false
};
