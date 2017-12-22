const path = require('path');
const Storage = require('@google-cloud/storage');
const CLOUD_BUCKET = 'jepretgram-vnx';
const Multer = require('multer')

const storage = Storage({
  projectId: 'ecommerce',
  keyFilename: 'keyjson.json'
})

const bucket = storage.bucket(CLOUD_BUCKET);

const getPublicUrl = filename => {
  return `https://storage.googleapis.com/${CLOUD_BUCKET}/${filename}`;
}

const sendUploadToGCS = (req, res, next) => {
  if (!req.files) {
    console.log('EROOOOOOOOOOOOOOOOOOR')
    return next()
  }
  const gcsname = Date.now() + req.files.image[0].originalname
  const fileImage = bucket.file(gcsname)
  const gcsnameMusic = Date.now() + req.files.music[0].originalname
  const fileMusic = bucket.file(gcsnameMusic)
  console.log('__________________________', gcsname, gcsnameMusic)
  const stream = fileImage.createWriteStream({
    metadata: {
      contentType: req.files.image[0].mimetype
    }
  })
  
  
  //IMAGE
  stream.on('error', (err) => {
    console.log(err)
    req.files.image[0].cloudStorageError = err
    next(err)
  })
  stream.on('finish', () => {
    req.files.image[0].cloudStorageObject = gcsname
    fileImage.makePublic().then(() => {
      req.files.image[0].cloudStoragePublicUrl = getPublicUrl(gcsname)
      uploadMusic()
    })
  })
  stream.end(req.files.image[0].buffer)
  uploadMusic = () => {
    //MUSIC
    const streamMusic = fileMusic.createWriteStream({
      metadata: {
        contentType: req.files.music[0].mimetype
      }
    })
    streamMusic.on('error', (err) => {
      console.log(err)
      req.files.music[0].cloudStorageError = err
      next(err)
    })
    streamMusic.on('finish', () => {
      req.files.music[0].cloudStorageObject = gcsnameMusic
      fileMusic.makePublic().then(() => {
        req.files.music[0].cloudStoragePublicUrl = getPublicUrl(gcsnameMusic)
        next()
      })
    })
    streamMusic.end(req.files.music[0].buffer)
  }
  console.log('SAMPAI AKHIR')
}

const multer = Multer({
  storage: Multer.MemoryStorage,
  limits: {
    fileSize: 10 * 1024 * 1024
  },
  fileFilter: function (req, file, cb) {
    console.log('DI MULTER', file)
    let filetypes = /jpeg|jpg|png|mp3/;
    let mimetype = filetypes.test(file.mimetype);
    let extname = filetypes.test(path.extname(file.originalname).toLowerCase());

    if (mimetype && extname) {
      return cb(null, true);
    }
    cb("Error: File type not supported");
  }
})

module.exports = {
  multer,
  sendUploadToGCS,
  getPublicUrl
}