import ImovelModel from "../models/imovelModel.js";

export default class ImovelController {

    async listar (req, res) {

        try {
            let imovel = new ImovelModel();
            let lista = await imovel.listar();

            res.status(200).json(lista);
        }
        catch(ex){
            res.status(500).json({msg: "Erro inesperado! Entre em contato com o nosso suporte técnico!", detalhes: ex.message});
        }
    }
}