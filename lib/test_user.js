import { createUser, getUser, deleteUser } from "./user.js"


createUser({
    username: "vsahler",
    password: "password"
});

// console.log(JSON.stringify(
//     getUser({
//         username: "vsahler"
//     })
// ));

// deleteUser({
//     username: "vsahler"
// });

// console.log(JSON.stringify(
//     getUser({
//         username: "vsahler"
//     })
// ));
