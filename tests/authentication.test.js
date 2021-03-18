import { createUser, getUser, deleteUser, validatePassword, conn } from "../lib/user.js"
import mysql from "mysql";


// THIS IS A DIRTY WAY TO SAVE AND RESTORE THE DB

var tablesToClean = [
    "user"
]
var dump = {};

beforeAll((done) => {
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
})

describe("user.js", () => {
    it("Table is clean", (done) => {
        conn.query("SELECT * FROM user", (err, result, fields) => {
            expect(result).toHaveLength(0);
            expect(err).toBeNull();
            done();
        })
    });

    it("Create one user", (done) => {
        createUser({
            username: "test",
            password: "password"
        }).then((r) => {
            conn.query("SELECT * FROM user", (err, result, fields) => {
                expect(result).toHaveLength(1);
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
