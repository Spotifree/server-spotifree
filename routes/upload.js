const router = require('express').Router()
const musicControllers =  require('../controllers/uploadController')
const musicHelper = require('../helpers/upload')
const Multer = require('multer')
const upload = musicHelper.multer.fields([{ name: 'image', maxCount: 1 }, { name: 'music', maxCount: 8 }])
// const uploadImage = musicHelper.multer.single('image');
/* GET Musics listing. */
router.get('/',  musicControllers.getAllMusics);
router.post('/', (req, res, next) => {
  console.log('MASUK')
  upload(req, res, function (err) {
    if (err) {
      return res.status(400).json({
        error: 'err'
      });
      console.log('MASUK1')
      console.log(err)
    }
    next();
  });
  
}, 
musicHelper.sendUploadToGCS, (req, res, next) => {
  console.log('SIAP SAVE')
  musicControllers.createMusic(req, res, next)
});
// router.delete('/:id', Music.deleteMusic);
// router.put('/:id',  Music.updateMusic);

module.exports = router