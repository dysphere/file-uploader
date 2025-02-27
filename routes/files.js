const express = require('express');
const multer  = require('multer')
const upload = multer({ dest: 'uploads/' })

const router = express.Router();

const file_controller = require("../controllers/fileController");

router.get('/upload', file_controller.file_create_get);
router.post('/upload', upload.single('file_upload'), file_controller.file_create_post);

router.get('/:id', file_controller.file_read_get);

router.get('/:id/update', file_controller.file_update_get);
router.get('/:id/update', file_controller.file_update_post);

router.post('/:id/delete', file_controller.file_delete_post);

router.post('/:id/download', file_controller.file_download_post);

module.exports = router; 