const express = require('express');
const user = require('./../middleware/user');
const list = require('./../controllers/list');
const router = express.Router();

router.post('/', user.protect, list.createList);
router.get('/', user.protect, list.findList);
router.post('/status/:id', user.protect, list.changeStatus);

module.exports = router;
