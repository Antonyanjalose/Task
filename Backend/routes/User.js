const express = require('express');
const { createUser, getAllusers, updateUser, deleteUser } = require('../controller/User');


const router = express.Router();

router.get('/',getAllusers)
router.post('/add',createUser)
router.put('/edit/:id',updateUser)
router.delete('/delete/:id',deleteUser)


module.exports = router


