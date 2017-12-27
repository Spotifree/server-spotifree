const router = require('express').Router()
const musicControllers =  require('../controllers/musicController')
const musicHelper = require('../helpers/upload')

router.get('/',  musicControllers.getAll);
router.post('/upload', musicControllers.upload, musicHelper.sendUploadToGCS, musicControllers.create);
router.delete('/:id', musicControllers.remove);
// router.put('/:id',  Music.updateMusic);

module.exports = router