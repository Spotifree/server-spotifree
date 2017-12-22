const path = require('path');
const Storage = require('@google-cloud/storage');
const CLOUD_BUCKET = 'storage-jepretgram';
const Multer = require('multer')

const storage = Storage({
  projectId: 'ecommerce',
  keyFilename: 'keygoogle.json'
})

const bucket = storage.bucket(CLOUD_BUCKET);

const getPublicUrl = filename => {
  return `https://storage.googleapis.com/${CLOUD_BUCKET}/${filename}`;
}

const sendUploadToGCS = (req, res, next) => {
  console.log('INI DI HELPER', req.files)
  if (!req.files) {
    return next()
  }
  const gcsnameImage = Date.now() + req.files.image.originalname
  const fileImage = bucket.file(gcsnameImage)
  const gcsnameMusic = Date.now() + req.files.music.originalname
  const fileMusic = bucket.file(gcsnameMusic)

  const stream = fileImage.createWriteStream({
    metadata: {
      contentType: req.files.image.mimetype
    }
  })
  stream.on('error', (err) => {
    req.files.image.cloudStorageError = err
    next(err)
  })
  stream.on('finish', () => {
    req.files.images.cloudStorageObject = gcsnameImage
    file.makePublic().then(() => {
      req.file.cloudStoragePublicUrl = getPublicUrl(gcsnameImage)
      next()
    })
  })
  stream.end(req.files.image.buffer)
}

const multer = Multer({
  storage: Multer.MemoryStorage,
  limits: {
    fileSize: 10 * 1024 * 1024
  },
  fileFilter: function (req, file, cb) {
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