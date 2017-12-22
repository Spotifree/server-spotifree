const router = require('express').Router()
const Music =  require('../controllers/uploadController')
const musics = require('../helpers/upload')
const Multer = require('multer')
const upload = musics.multer.fields([{ name: 'image', maxCount: 1 }, { name: 'music', maxCount: 8 }])
// const uploadImage = musics.multer.single('image');
/* GET Musics listing. */
router.get('/',  Music.getAllMusics);
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
musics.sendUploadToGCS, (req, res, next) => {
  console.log('SIAP SAVE')
  Music.createMusic(req, res, next)
});
// router.delete('/:id', Music.deleteMusic);
// router.put('/:id',  Music.updateMusic);

module.exports = router