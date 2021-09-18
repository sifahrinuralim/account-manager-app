const router = require('express').Router()
const accountAppController = require("../controllers/accountAppController")

// Landing Page
router.get('/', accountAppController.homepage) //

// Read Process Login
router.get('/login/', accountAppController.homepage) //Show Page Login
router.post('/login/cekLogin', accountAppController.login) //Process Login

// Create Process
router.post('/api/v1/register', accountAppController.register) // create
router.get('/add-user', (req, res) => {res.render('add_user')}) //Show Form Create

// Read Process
router.get('/user-list', accountAppController.getAll) //getAll
router.get('/user-list/:phone_number', accountAppController.getOne) //getOne

// Update Process
router.get('/update-user/:id', accountAppController.showUserUpdate) //Show Form Update
router.put('/api/v1/update/:id', accountAppController.update) //Update Process
router.post('/api/v1/update/:id', accountAppController.update) //Update Process

// Delete Process
router.get('/delete-user/:id', accountAppController.showUserDelete) //Show Form Delete
router.delete('/api/v1/delete/:id', accountAppController.delete) //Delete Process
router.post('/api/v1/delete/:id', accountAppController.delete) //Delete Process

module.exports = router