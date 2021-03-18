import mysql from "mysql";
import Password from "node-php-password";

var conn = mysql.createConnection({
    host: "localhost",
    user: "next",
    password : "dummypwd",
    database: "next"
});

conn.connect();

export function createUser({username, password}) {
    let hash = Password.hash(password);

    // let q = `INSERT INTO user (username, password) VALUES (${username}, ${hash})`;

    // console.log(q);

    // let x = conn.query(q);
    let x = conn.query("INSERT INTO user SET ?", {username, password: hash})
    // console.log(x);
}

export function deleteUser({username}) {
    conn.query(`DELETE FROM user WHERE username='${username}'`);
}

export function getUser({username}) {
    let results = conn.query("SELECT * FROM user WHERE ?", {username});
    return results;
}

export function validatePassword({username, password}) {
    let promise = new Promise((resolve, reject) => {
        getUser({username}).on("result", (row) => {
            if(!("password" in Object.create(row))) {
                reject();
            }
            resolve(Password.verify(password, row.password));
        });
    });

    return promise
}