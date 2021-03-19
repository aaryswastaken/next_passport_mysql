import Password from "node-php-password";
import db from "./db.js";  // Very udefull bc makes sure that the connection is init at least once

export function createUser({username, password}) {
    return new Promise((resolve, reject) => {
        let hash = Password.hash(password);
        let x = global.conn.query("INSERT INTO next.user SET ?", {username, password: hash}, (err, results, fields) => {
            if(err) {reject(err)}

            resolve(results);
        })
    })
}

export function deleteUser({username}) {
    return new Promise((resolve, reject) => {
        global.conn.query(`DELETE FROM next.user WHERE username='${username}'`, (err, results, fields) => {
            if(err) {reject(err)}

            resolve(results);
        });
    })
}

export function getUser({username}) {
    return new Promise((resolve, reject) => {
        global.conn.query("SELECT * FROM next.user WHERE ?", {username}, (err, results, fields) => {
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
