import express from 'express';
import ImovelController from '../controllers/imovelController.js';
import Autenticacao from '../middlewares/autenticacao.js';  

const router = express.Router();
let ctrl = new ImovelController();
let auth = new Autenticacao();

router.get('/', auth.validar, (req, res) => {

    // #swagger.summary = 'Lista os imóveis'


    ctrl.listar(req, res);
});

router.get('/:id', auth.validar, (req, res) => {

    // #swagger.summary = 'Retorna um imóvel baseado em um id'

    ctrl.obter(req, res);
});

router.delete('/excluir/:id', auth.validar, (req, res) => {

    // #swagger.summary = 'Exclui um imóvel baseado em um id'

    ctrl.excluir(req, res);
});

router.post('/cadastrar', auth.validar, (req, res) => {


    // #swagger.summary = 'Cadastra um imóvel'
    /*  #swagger.requestBody = {
            required: true,
            content: {
                "application/json": {
                    schema: {
                        $ref: "#/components/schemas/imovelModel"
                    }  
                }
            }
        } 
    */
    ctrl.cadastrar(req, res);
});

router.put('/atualizar/:id', auth.validar, (req, res) => {

    // #swagger.summary = 'Atualiza todos os atributos de um imóvel no banco de dados'
    /*  #swagger.requestBody = {
            required: true,
            content: {
                "application/json": {
                    schema: {
                        $ref: "#/components/schemas/imovelModel"
                    }  
                }
            }
        } 
    */
    ctrl.atualizar(req, res);
});

export default router;