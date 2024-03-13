import ImovelModel from "../models/imovelModel.js";

export default class ImovelController {

    async listar (req, res) {

        try {
            let imovel = new ImovelModel();
            let lista = await imovel.listar();

            res.status(200).json(lista);
        }
        catch(ex){
            res.status(500).json({msg: "Erro inesperado! Entre em contato com o nosso suporte técnico!"});
        }
    }

    async obter (req, res) {
        try {
            let { id } = req.params;
            let imovel = new ImovelModel();
            let imovelEncontrado = await imovel.obter(id);
            
            if(imovelEncontrado != null){
                res.status(200).json(imovelEncontrado);
            }
            else {
                res.status(404).json({msg: `Imóvel com o id ${id} não encontrado!`});
            }
        }
        catch(ex){
            res.status(500).json({msg: "Erro inesperado! Entre em contato com o nosso suporte técnico!"});
        }
    }
}