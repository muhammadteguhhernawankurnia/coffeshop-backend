const multer = require('multer');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'public/uploads/images'); //storage
  },
  filename: (req, file, cb) => {
    // let fileName = file.originalname.split('.');
    // cb(null, `${fileName[0]}-${new Date().getTime()}.${fileName[1]}`); //resiko kalo ada titik 2x
    cb(null, `${new Date().getTime()}-${file.originalname}`); //nma file gambar diupload
  },
});

const formUpload = multer({
  storage: storage,
  // dest: {dest: 'uploads'}
});

module.exports = formUpload;
