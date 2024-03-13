import express from 'express';
import ImovelController from '../controllers/imovelController.js';
import Autenticacao from '../middlewares/autenticacao.js';  

const router = express.Router();
let ctrl = new ImovelController();
let auth = new Autenticacao();

router.get('/', auth.validar, (req, res) => {

    // #swagger.tags = ['Imóvel']
    // #swagger.summary = 'Lista os imóveis'
    /* #swagger.security = [{
            "apiKeyAuth": []
    }] */

    ctrl.listar(req, res);
});

export default router;