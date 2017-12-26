const router = require('express').Router()
const userControllers = require('../controllers/userControllers')
const checkAuth = require('../middleware/checkAuth')

router.get('/', checkAuth.isLogin, userControllers.getAll)
router.get('/:id', checkAuth.isLogin, userControllers.getById)
router.post('/signup', userControllers.signup)
router.post('/login', userControllers.login)
router.put('/:id', checkAuth.isLogin, userControllers.update)
router.delete('/:id', checkAuth.isLogin, userControllers.remove)

module.exports = router;