import express from 'express';
import {
    createKitten,
    getAllKittens,
    getKitten,
    getUserKittens,
    updateKitten,
    toggleKittenStatus,
    deleteKitten
} from '../controllers/kittens.controller.js';
import { validateAuth } from '../middlewares/users.middlewares.js';

const kittensRouter = express.Router();

// Rota para criar um novo gatinho
kittensRouter.post('/kittens', validateAuth, createKitten);

kittensRouter.get('/user-kittens', validateAuth, getUserKittens); 

// Rota para obter todos os gatinhos
kittensRouter.get('/kittens', getAllKittens);

// Rota para obter detalhes de um gatinho específico
kittensRouter.get('/kittens/:id', getKitten);

// Rota para atualizar os detalhes de um gatinho
kittensRouter.put('/kittens/:id', validateAuth, updateKitten);

// Rota para ativar/desativar o status de um gatinho
kittensRouter.patch('/kittens/:id/toggle-status', validateAuth, toggleKittenStatus);

// Rota para excluir um gatinho
kittensRouter.delete('/kittens/:id', validateAuth, deleteKitten);

export default kittensRouter;
