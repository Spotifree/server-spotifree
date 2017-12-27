const router = require('express').Router()
const musicControllers =  require('../controllers/uploadController')
const musicHelper = require('../helpers/upload')

router.get('/',  musicControllers.getAll);
router.post('/', musicControllers.upload, musicHelper.sendUploadToGCS, musicControllers.create);
// router.delete('/:id', Music.deleteMusic);
// router.put('/:id',  Music.updateMusic);

module.exports = router