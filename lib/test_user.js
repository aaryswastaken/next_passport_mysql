import { createUser, getUser, deleteUser, validatePassword } from "./user.js"


// createUser({
//     username: "vsahler",
//     password: "password"
// });

getUser({
    username: "vsahler"
}).on("result", (row) => {
    console.log(row)
})

validatePassword({
    username: "vsahler",
    password: "password"
}).then((result) => {
    console.log(result ? "Login successful !" : "Login Failed :(")
})

console.log("Finished :)")