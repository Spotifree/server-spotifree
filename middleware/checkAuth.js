const jwt = require('jsonwebtoken')

module.exports = {
  isLogin (req, res, next) {
    jwt.verify(req.headers.access_token, process.env.SECRET_JWT, function(err, decoded) {
      if(!err){
        req.userLogin = decoded
        next()
      } else {
        res.status(401).send({
          status: 'access denied!!!'
        })
      }
    });
  }
}