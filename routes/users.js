const router = require('express').Router()
const userControllers = require('../controllers/userControllers')

router.get('/', userControllers.getAll)
router.post('/signup', userControllers.signup)
router.post('/login', userControllers.login)
router.put('/:id', userControllers.update)
router.delete('/:id', userControllers.remove)

module.exports = router;