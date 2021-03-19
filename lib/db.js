import mysql from "mysql";

var conn = global.conn ?? undefined;

if(conn === undefined) {
    conn = mysql.createConnection({
        host: "localhost",
        user: "next",
        password: "dummypwd",
        database: "next"
    });

    // conn.connect();
    global.conn = conn;
}

export { conn };
