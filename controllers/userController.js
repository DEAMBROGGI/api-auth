const bcryptjs = require("bcryptjs")
const User = require("../models/userModel")


const userControllers = {

    signUpUser: async (req, res) => {
        console.log(req.body)
        const { name, email, password, from } = req.body.userData
        const hashedPassword = bcryptjs.hashSync(password, 10)
        try {

            const user = await User.findOne({ email })

            if (user) {

                if (user.from.indexOf(from) !== -1) {
                    res.json({
                        status: 301,
                        success: false,
                        message: "El usuarios ya existe por favor has el signIn"
                    })
                } else {

                    user.from.push(from)
                    user.password.push(hashedPassword)
                    user.save()
                    if (from !== "form-signUp") {

                        res.json({
                            status: 200,
                            success: true,
                            message: "Hola " + name + ", vamos a agregar " + from + " a tus medios de signIn"
                        })
                    } else {
                        //Enviamos a verificar el mail
                        res.json({
                            status: 200,
                            success: true,
                            message: "Te enviamos un correo para que verifiques tu email a " + email + " y agregar nuestro formularios a tus medios de SignIN"
                        })
                    }
                }


            } else {


                const newUser = await new User({
                    name: name,
                    email: email,
                    password: [hashedPassword],
                    from: [from],
                    emailVerificado: false
                })

                await newUser.save()
                if (from !== "form-signUp") {

                    res.json({
                        status: 200,
                        success: true,
                        message: "Hola " + name + ", vamos a dar de alta tu nuevos usuario con el email " + email
                    })
                } else {
                    //Verificar el mail
                    res.json({
                        status: 200,
                        success: true,
                        message: "Te enviamos un correo para que verifiques tu email a " + email
                    })
                }
            }

        } catch (error) {
            res.json({
                status: 500,
                success: false,
                message: "Algo salio mal reintentalo en unos minutos"
            })
        }


    },
    signInUser: (req, res) => { console.log("controlador signInUser") },
    signOutUser: (req, res) => { console.log("controlador signOutUser") }

}

module.exports = userControllers