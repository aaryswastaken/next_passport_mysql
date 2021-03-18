import { createUser, getUser, deleteUser, validatePassword } from "./user.js"


// createUser({
//     username: "vsahler",
//     password: "password"
// });

getUser({
    username: "vsahler"
}).then((row) => {
    // console.log(row)
}).catch((error) => {
    throw error;
});

validatePassword({
    username: "vsahler",
    password: "password"
}).then((result) => {
    console.log(result ? "Login successful !" : "Login Failed :(")
}).catch((error) => {
    throw error;
});

console.log("Finished :)")