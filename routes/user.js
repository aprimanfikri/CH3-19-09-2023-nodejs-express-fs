const express = require('express');
const user = require('../controllers/user');

const router = express.Router();

router.route('/').get(user.getAllData).post(user.createData);
router.route('/:id').get(user.getDataById).patch(user.updateDataById).delete(user.deleteDataById);

module.exports = router;
