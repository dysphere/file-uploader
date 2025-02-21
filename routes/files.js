const express = require('express');
const multer  = require('multer')
const upload = multer({ dest: 'uploads/' })

const router = express.Router();

const file_controller = require("../controllers/fileController");

router.get('/upload', file_controller.file_create_get);
router.post('/upload', upload.single('file_upload'), file_controller.file_create_post);

module.exports = router; 