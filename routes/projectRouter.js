const express = require('express')
const router = express.Router()
const { getProjects } = require('../controller/displayProjectController')
const multer = require('multer');
// const path = require('path');
const projectController = require('../controller/addProjectController');
// const upload = multer({ dest: 'uploads/'});
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'src/images');
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now();
    cb(null, uniqueSuffix + '-' + file.originalname);
  }
});

const upload = multer({ storage: storage });

router.post('/dashboard/upload-project', upload.fields([
  { name: 'detail', maxCount: 1 },
  { name: 'mainImage', maxCount: 1 },
  { name: 'images', maxCount: 8 },
  { name: 'video', maxCount: 1 }
]), projectController.uploadProject);


router.get('/dashboard/project', getProjects)


module.exports = router
