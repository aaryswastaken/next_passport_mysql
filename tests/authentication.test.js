import { createUser, getUser, deleteUser, validatePassword } from "../lib/user.js"
import mysql from "mysql";

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
