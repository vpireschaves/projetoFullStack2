import Database from "../db/database.js";
import AluguelModel from "../models/aluguelModel.js";
import ContratoModel from "../models/contratoModel.js";
import ImovelModel from "../models/imovelModel.js";
import UsuarioModel from "../models/usuarioModel.js";

export default class LocacaoController {

    async locar (req, res) {

        let banco = new Database();

        try {
            
            if (req.body) {
                let { imovelId } = req.body;
    
                if (imovelId) {
    
                    let imovel = new ImovelModel();
                    imovel = await imovel.obter(imovelId);
    
                    if (imovel.imovelDisponivel == 'S') {
                        
                        await banco.AbreTransacao();

                        let usuarioId = req.usuarioLogado.usuId;
                        let contrato = new ContratoModel(0, new ImovelModel(imovelId), new UsuarioModel(usuarioId));
    
                        contrato.contratoId = await contrato.gravar(banco);
    
                        //gerar um ano de aluguel para o contrato
                        for (let i = 0; i < 12; i++) {
                            let aluguel = new AluguelModel();
                            aluguel.aluguelValor = imovel.imovelValor;
                            aluguel.aluguelPago = 'N';
                            aluguel.contrato = contrato;
    
                            let dataVencimento = new Date();
                            dataVencimento.setMonth(dataVencimento.getMonth() + 1);
    
                            let mes = dataVencimento.getMonth() + 1;
                            aluguel.aluguelMes = mes;
                            aluguel.aluguelVencimento = dataVencimento;
    
                            await aluguel.gravar(banco);
                        }
    
                        imovel.imovelDisponivel = "N";
                        await imovel.gravar(banco);

                        await banco.Commit();
    
                        res.status(200).json({ msg: "Imóvel locado com sucesso!" });
                    }
                    else{
                        res.status(400).json({ msg: "Imóvel indisponível para locação!" });
                    }
    
                }
                else {
                    res.status(400).json({ msg: "O corpo da requisição não possui o id do imóvel." });
                }

            }
            else {
                res.status(400).json({ msg: "Requisição inválida!" });
            }

        } catch (error) {

            await banco.Rollback();
            
            res.status(500).json({msg: "Erro interno de servidor!"});
        }

    }
}