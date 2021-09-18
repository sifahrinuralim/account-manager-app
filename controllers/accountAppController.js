const { AccountApp } = require("../models/index")
var bcrypt = require("bcrypt")
var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
// const { ValidationError } = require("sequelize/types");

class AccountAppController {
    //Show Login Page
    static homepage(req, res) {
        res.render('login.ejs')
    }

    // Login Process
    static login(req, res) {
        const phoneNumberUser = req.body.phoneNumberUserInput
        const passwordUser = req.body.passwordUserInput
        let validasiForm = ""

        if (!phoneNumberUser) {
            let obj = { pesan: "Data belum lengkap", linkUrl: "http://localhost:8000/login" }
            res.render("errorHandler.ejs", obj)
        } else {
            AccountApp.findOne({
                where: { phone_number: phoneNumberUser }
            })
                .then((dataLogin) => {
                    bcrypt.compare(passwordUser, dataLogin.password, function (err, dataPassword) {
                        if (dataPassword === true && dataLogin.phone_number === phoneNumberUser) {
                            res.status(201).redirect("http://localhost:8000/user-list");
                        } else {
                            let obj = { pesan: "Phone Number atau Password Salah", linkUrl: "http://localhost:8000/login" }
                            res.render("errorHandler.ejs", obj)
                        }
                    });
                })
                .catch((err) => {
                    let obj = { pesan: "Phone Number belum terdaftar, silahkan buat akun", linkUrl: "http://localhost:8000/login" }
                    res.render("errorHandler.ejs", obj)
                })
        }
    }

    // Create User
    static register(req, res) {
        const { first_name, last_name, email, phone_number, position, password, confirmPassword } = req.body

        async function validasiDatabase() {
            const cekEmailDB = await AccountApp.findOne({ where: { email: req.body.email } });
            const cekPhoneNumberDB = await AccountApp.findOne({ where: { phone_number: req.body.phone_number } });

            if (cekEmailDB != null && cekPhoneNumberDB != null) {
                let obj = { pesan: "Email dan Phone Number Sudah Digunakan", linkUrl: "http://localhost:8000/add-user" }
                res.render("errorHandler.ejs", obj)
            } else if (cekEmailDB != null) {
                let obj = { pesan: "Email Telah Digunakan", linkUrl: "http://localhost:8000/add-user" }
                res.render("errorHandler.ejs", obj)
            } else if (cekPhoneNumberDB != null) {
                let obj = { pesan: "Phone Number Telah Digunakan", linkUrl: "http://localhost:8000/add-user" }
                res.render("errorHandler.ejs", obj)
            } else {
                let obj = { pesan: "Internal Server Error, Silahkan Coba Kembali", linkUrl: "http://localhost:8000/add-user" }
                res.render("errorHandler.ejs", obj)
            }
        }
        
        if (!first_name || !last_name || !email || !phone_number || !position || !password || !confirmPassword) {
            let obj = { pesan: "Data belum lengkap", linkUrl: "http://localhost:8000/add-user" }
            res.render("errorHandler.ejs", obj)

        } else if (password != confirmPassword) {
            let obj = { pesan: "Password Tidak Sama, Silahkan Coba Kembali", linkUrl: "http://localhost:8000/add-user" }
            res.render("errorHandler.ejs", obj)

        } else {
            AccountApp.create({ first_name, last_name, email, phone_number, position, password })
                .then((dataAccount) => {
                    let obj = { pesan: "Data berhasil ditambahkan", linkUrl: "http://localhost:8000/login" }
                    res.render("errorHandler.ejs", obj)
                })
                .catch((err) => {
                    validasiDatabase()
                })
        }
    }

    // Get All
    static getAll(req, res) {
        AccountApp.findAll({ order: [['id', 'DESC']] })
            .then((dataGetAll) => {
                res.render('index.ejs', {
                    userData: dataGetAll
                })
            })
            .catch((err) => {
                res.status(500).json({
                    message: "Internal Server Error",
                    log: err
                })
            })
    }

    // Get One
    static getOne(req, res) {
        let phoneNumber = req.params.phone_number

        if (!phoneNumber) {
            res.status(422).json({
                message: "Error"
            })
        } else {
            AccountApp.findOne({
                where: {
                    phone_number: phoneNumber
                }
            })
                .then((dataGetOne) => {
                    if (dataGetOne === null) {
                        let obj = { pesan: "Phone Number tidak ditemukan", linkUrl: "http://localhost:8000/user-list" }
                        res.render("errorHandler.ejs", obj)
                    } else {
                        res.render("searchEngine.ejs", {
                            userData: dataGetOne
                        })
                    }
                })
                .catch((err) => {
                    let obj = { pesan: "Data tidak ditemukan", linkUrl: "http://localhost:8000/user-list" }
                    res.render("errorHandler.ejs", obj)
                })
        }
    }

    // Show Update User
    static showUserUpdate(req, res) {
        let getById = req.params.id

        AccountApp.findOne({
            where: {
                id: getById
            }
        })
            .then((dataGetOne) => {
                res.render('update_user.ejs', {
                    dataGetUpdate: dataGetOne
                })
            })
            .catch((err) => {
                let obj = { pesan: "Internal Server Error, Silahkan Coba Lagi", linkUrl: "http://localhost:8000/user-list/" }
                res.render("errorHandler.ejs", obj)
            })
    }

    // Update User Process
    static update(req, res) {
        const targetId = req.body.id
        let text = "http://localhost:8000/update-user/" + targetId

        async function validasiEmail() {
            const cekEmailDB = await AccountApp.findOne({ where: { email: req.body.email } });

            if (cekEmailDB != null) {
                let obj = { pesan: "Email Telah Digunakan", linkUrl: text }
                res.render("errorHandler.ejs", obj)
            }
        }

        async function validasiPN() {
            const cekPhoneNumberDB = await AccountApp.findOne({ where: { phone_number: req.body.phone_number } });

            if (cekPhoneNumberDB != null) {
                let obj = { pesan: "Phone Number Telah Digunakan", linkUrl: text }
                res.render("errorHandler.ejs", obj)
            }
        }

        AccountApp.update(req.body, { where: { id: targetId } })
            .then((data) => {
                let obj = { pesan: "Data berhasil di Update", linkUrl: text }
                res.render("errorHandler.ejs", obj)
            })
            .catch((err) => {
                validasiEmail()
                validasiPN()
            })

    }

    // Show Delete User
    static showUserDelete(req, res) {
        let getById = req.params.id

        AccountApp.findOne({
            where: {
                id: getById
            }
        })
            .then((dataGetOne) => {
                res.render('delete_user.ejs', {
                    dataGetUpdate: dataGetOne
                })
            })
            .catch((err) => {
                let obj = { pesan: "Internal Server Error, Silahkan Coba Lagi", linkUrl: "http://localhost:8000/user-list/" }
                res.render("errorHandler.ejs", obj)
            })
    }

    // Delete User
    static delete(req, res) {
        const targetId = req.params.id

        if (!targetId) {
            res.status(422).redirect("/user-list")
        } else {
            AccountApp.destroy({ where: { id: targetId } })
                .then((data) => {
                    let obj = { pesan: "Data Berhasil Dihapus", linkUrl: "http://localhost:8000/user-list/" }
                    res.render("errorHandler.ejs", obj)
                })
                .catch((err) => {
                    let obj = { pesan: "Internal Server Error, Silahkan Coba Lagi", linkUrl: "http://localhost:8000/user-list/" }
                    res.render("errorHandler.ejs", obj)
                })
        }
    }
}

module.exports = AccountAppController