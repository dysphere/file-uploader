const express = require('express');
const router = express.Router();

const folder_controller = require("../controllers/folderController");

router.get('/create', folder_controller.folder_create_get);
router.post('/create', folder_controller.folder_create_post);

module.exports = router; 