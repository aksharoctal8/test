const multer = require('multer');
const path = require('path');

const uploadDir = path.join('public', 'uploads', 'user');
const storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, uploadDir),
    filename: (req, file, cb) =>{
         const uniqueName = `${Date.now()}${path.extname(file.originalname)}`
        cb(null, uniqueName)

    },
})

const handleMultipartData = multer({
    storage: storage,
    limits: { fileSize: 1000000 * 5 },
   
});



module.exports =  handleMultipartData;
