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
    return new Promise((resolve, reject) => {
        let hash = Password.hash(password);
        let x = conn.query("INSERT INTO user SET ?", {username, password: hash}, (err, results, fields) => {
            if(err) {reject(err)}

            resolve(results);
        })
    })
}

export function deleteUser({username}) {
    return new Promise((resolve, reject) => {
        conn.query(`DELETE FROM user WHERE username='${username}'`, (err, results, fields) => {
            if(err) {reject(err)}

            resolve(results);
        });
    })
}

export function getUser({username}) {
    return new Promise((resolve, reject) => {
        conn.query("SELECT * FROM user WHERE ?", {username}, (err, results, fields) => {
            if (err) {reject(err)}

            resolve(results);
        });
    })
}

export function validatePassword({username, password}) {
    return new Promise((resolve, reject) => {
        getUser({
            username
        }).then((row) => {
            if(!("password" in Object.create(row[0]))) {
                reject();
            }
            try {
                let result = Password.verify(password, row[0].password);
                resolve(result);
            } catch (e) {
                reject(e);
            }
        }).catch((error) => {
            reject(error);
        });
    });
}

export { conn };
