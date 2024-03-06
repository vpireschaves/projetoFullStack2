import express from 'express';
import PerfilController from '../controllers/perfilController.js';
import Autenticacao from '../middlewares/autenticacao.js';

const router = express.Router();

let ctrl = new PerfilController();
let auth = new Autenticacao();

router.get('/', auth.validar, (req, res) => {

     // #swagger.tags = ['Perfil']
     // #swagger.summary = 'Lista os perfis de acesso'
     /* #swagger.security = [{
            "apiKeyAuth": []
    }] */

    ctrl.listar(req, res);
});

export default router;