import { createUser, getUser, deleteUser, validatePassword } from "../lib/user.js"
import compose from "docker-compose"
import mysql from "mysql";

// THIS IS A DIRTY WAY TO SAVE AND RESTORE THE DB

var tablesToClean = [
    "user"
]
var dump = {};

/* beforeAll((done) => {
    let n = 0;

    tablesToClean.forEach((tableName) => {
        conn.query(`SELECT * from ${tableName}`, (err, results, fields) => {
            dump[tableName] = results;

            console.log("Before delete");

            conn.query(`DELETE FROM ${tableName}`, (err, results, fields) => {
                n+=1;
                console.log("Deleted "+tableName);
                if(n === tablesToClean.length) {
                    done();
                }
            });
        });
    });
})

afterAll(() => {
    tablesToClean.forEach((tableName) => {
        conn.query(`DELETE FROM ${tableName}`);

        dump[tableName].forEach((row) => {
            conn.query(`INSERT INTO ${tableName} SET ?`, row)
        })
    });
}) */


// Implement test server
beforeAll((done) => {
    // if(conn !== undefined) {
    //     conn.end();
    //     delete global.conn
    // }
    delete global.conn
    global.conn = mysql.createConnection({
        host: "127.0.0.1",
        user: "root",
        password: "root",
        port: 3307,
        database: "next"
    });

    conn.connect();

    done();
})

describe("DB test", () => {
    it("Connection is up", (done) => {
        setTimeout(() => {
            expect(conn.state).toBe("authenticated");
            done();
        }, 250)
    });

    it("Query is working", (done) => {
        conn.query("SELECT 1+1", (err, results, fields) => {
            expect(err).toBeNull();
            expect(results).toHaveLength(1);
            // expect(results[0]).toBe(2);
            done();
        })
    })
})

describe("user.js", () => {
    it("Table is clean", (done) => {
        conn.query("SELECT * FROM user", (err, results, fields) => {
            expect(results).toHaveLength(0);
            expect(err).toBeNull();
            done();
        })
    });

    it("Create one user", (done) => {
        createUser({
            username: "test",
            password: "password"
        }).then((r) => {
            console.log(r)
            conn.query("SELECT * FROM user", (err, results, fields) => {
                expect(results).toHaveLength(1);
                expect(err).toBeNull();
                done();
            });
        }).catch((e) => {
            expect(e).toBeNull();
            done();
        })
    });

    it("Test if newly created user exist", (done) => {
        getUser({username: "test"})
        .then((r) => {
            expect(r).toHaveLength(1);
            expect(r[0]).toHaveProperty("username");
            expect(r[0]).toHaveProperty("password");
            expect(r[0].username).toBe("test");
            expect(r[0].password).not.toBe("password");
            done();
        }).catch((err) => {
            expect(err).toBeNull();
            done();
        });
    })
})
