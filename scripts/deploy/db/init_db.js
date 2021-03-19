const mysql = require("mysql");

var cfg = {
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    port: parseInt(process.env.MYSQL_PORT)
};


console.log(cfg)

conn = mysql.createConnection(cfg);


const queries = [
    {query: "DROP DATABASE IF EXISTS next;", blocking: true},
    {query: "CREATE DATABASE next;", blocking: true},
    {query: "create table next.user\n" +
            "(\n" +
            "    id int auto_increment\n" +
            "    primary key,\n" +
            "    username varchar(45)  not null,\n" +
            "    password varchar(500) not null\n" +
            ");\n", blocking: true}
];


function issueQuery(queryId) {
    let query = queries[queryId].query;
    conn.query(query, (err, results, fields) => {
        if(err) {
            console.log(`[ERROR] On query : ${query}\nError dump : ${err}`);
        } else {
            console.log(`[OK] On query : ${query}`);
        }



        if(query.blocking && err) {
            console.log("WAS A BLOCKING QUERRY ... EXITING");
            process.exit(1);
        } else {
            if(queryId < (queries.length-1)) {
                issueQuery(queryId + 1);
            }
        }
    })
}

issueQuery(0);

// CREATE DATABASES

console.log("Ended :)")
