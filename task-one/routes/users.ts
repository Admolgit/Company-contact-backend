var express = require('express');
var router = express.Router();
import { getUsers, getUser, deleteUser, createUser, updateUser } from '../controller/users';
// var database = require('../database.json');

/* GET users listing. */

router.get('/', getUsers);

router.post('/', createUser);

router.get('/:id', getUser);

router.delete('/:id', deleteUser);

router.put('/:id', updateUser);

export default router;