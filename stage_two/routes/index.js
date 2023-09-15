import express from 'express';
import AppController from "../controllers/AppController.js";
import UserController from '../controllers/UserController.js';

const router = express.Router();

// App route
router.get('/', AppController.getHome);

// User route
router.post('/', UserController.createPerson);

// router.get('/:id', UserController.getPerson);

// router.patch('/:id', UserController.updatePerson);

// router.delete('/:id', UserController.deletePerson);

export default router;
