const router = require('express').Router()
const userControllers = require('../controllers/userControllers')

router.get('/', userControllers.getAll)
router.post('/signup', userControllers.signup)
router.post('/login', userControllers.login)

module.exports = router;