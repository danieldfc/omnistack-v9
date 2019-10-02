const { resolve, extname, basename } = require('path');
const multer = require('multer');

module.exports = {
  storage: multer.diskStorage({
    destination: resolve(__dirname, '..', '..', 'tmp', 'uploads'),
    filename: (req, file, cb) => {
      const ext = extname(file.originalname);
      const name = basename(file.originalname, ext)
      cb(null, `${name}-${Date.now()}${ext}`)
    }
  })
}
