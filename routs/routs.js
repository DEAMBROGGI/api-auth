const Router =require("express").Router()

const userControllers = require("../controllers/userController");
const {signUpUser, signInUser, signOutUser} = userControllers

Router.route("/auth/signUp")
.post(signUpUser)

Router.route("/auth/signIn")
.get(signInUser)

Router.route("/auth/signOut")
.post(signOutUser)

module.exports = Router