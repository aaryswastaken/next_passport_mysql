import mysql from "promise-mysql";
import Password from "node-php-password";

var conn;

( async () => {
    conn = await mysql.createConnection({
        host: "localhost",
        user: "next",
        password : "dummypwd",
        database: "next"
    }).catch(
        (e)=>{
            console.log(e);
        }
    );


    conn.connect();
})();

async function createUser({user, pass}) {
    let hash = Password.hash(pass);

    let q = `INSERT INTO user (username, password) VALUES (${username}, ${pass})`;

    console.log(q);

    // let x = await conn.query(q);
    console.log(JSON.stringify(x));
}

async function deleteUser({username}) {
    await conn.query(`DELETE FROM user WHERE username='{username}'`);
}

async function getUser({username}) {
    let {results} = await conn.query(`SELECT * FROM user WHERE username={username}`)
    console.log(results);
}

function validatePassword(user, inputPassword) {

}

export { createUser, deleteUser, getUser, validatePassword }