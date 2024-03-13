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

    async excluir (req, res) {
        try {
            let { id } = req.params;
            let imovel = new ImovelModel();
            let result = await imovel.excluir(id);
            
            if(result){
                res.status(200).json({msg: `Imóvel com o id ${id} excluído com sucesso!`});
            }
            else {
                res.status(500).json({msg: "Erro durante a exclusão do imóvel!"});
            }
        }
        catch(ex){
            res.status(500).json({msg: "Erro inesperado! Entre em contato com o nosso suporte técnico!"});
        }
    }

    async cadastrar (req, res) {
        try{
            let { imovelDescricao, imovelValor, imovelCep, imovelEndereco, imovelBairro, imovelCidade, imovelUf, imovelDisponivel } = req.body;

            if (imovelDescricao != "" && imovelValor != "" && imovelCep != "" && imovelEndereco != "" && imovelBairro != "" && imovelCidade != "" && imovelUf != "" && imovelDisponivel != "") {

                if (parseFloat(imovelValor) > 0){
                    let imovel = new ImovelModel(0, imovelDescricao, imovelValor, imovelCep, imovelEndereco, imovelBairro, imovelCidade, imovelUf, imovelDisponivel);
                    let result = await imovel.gravar();

                    if(result){
                        res.status(201).json({msg: "Imóvel gravado com sucesso!"});
                    }
                    else {
                        res.status(500).json({msg: "Erro durante o cadastro do imóvel!"});
                    }
                }
                else {
                    res.status(400).json({msg: "O imovelValor não pode ser negativo!"});
                }
            }
            else {
                res.status(400).json({msg: "Existem campos que não foram preenchidos!"});
            }
        }
        catch(ex){
            res.status(500).json({msg: "Erro inesperado! Entre em contato com o nosso suporte técnico!"});
        }
    }

    async atualizar (req, res) {
        try{
            let { ImovelId, imovelDescricao, imovelValor, imovelCep, imovelEndereco, imovelBairro, imovelCidade, imovelUf, imovelDisponivel } = req.body;

            if (ImovelId > 0 && imovelDescricao != "" && imovelValor != "" && imovelCep != "" && imovelEndereco != "" && imovelBairro != "" && imovelCidade != "" && imovelUf != "" && imovelDisponivel != "") {

                if (parseFloat(imovelValor) > 0){
                    let imovel = new ImovelModel(id, imovelDescricao, imovelValor, imovelCep, imovelEndereco, imovelBairro, imovelCidade, imovelUf, imovelDisponivel);
                    let result = await imovel.gravar();

                    if(result){
                        res.status(201).json({msg: "Imóvel atualizado com sucesso!"});
                    }
                    else {
                        res.status(500).json({msg: "Erro durante a atualização do imóvel!"});
                    }
                }
                else {
                    res.status(400).json({msg: "O imovelValor não pode ser negativo!"});
                }
            }
            else {
                res.status(400).json({msg: "Existem campos que não foram preenchidos!"});
            }
        }
        catch(ex){
            res.status(500).json({msg: "Erro inesperado! Entre em contato com o nosso suporte técnico!"});
        }
    }
}