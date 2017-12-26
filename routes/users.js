const router = require('express').Router()
const userControllers = require('../controllers/userControllers')

router.get('/', userControllers.getAll)
router.post('/signup', userControllers.signup)

module.exports = router;