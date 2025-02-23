const express = require('express');
const router = express.Router();

const folder_controller = require("../controllers/folderController");

router.get('/create', folder_controller.folder_create_get);
router.post('/create', folder_controller.folder_create_post);

router.get('/:id', folder_controller.folder_read_get);
router.post('/:id', folder_controller.folder_read_post);

router.get('/:id/update', folder_controller.folder_update_get);
router.post('/:id/update', folder_controller.folder_update_post);

router.get('/:id/delete', folder_controller.folder_delete_get);
router.post('/:id/delete', folder_controller.folder_delete_post);

module.exports = router; 