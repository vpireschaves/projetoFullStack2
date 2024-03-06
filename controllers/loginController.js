import LoginModel from "../models/loginModel.js";

export default class LoginController{
    
    async autenticar(req, res){
        try{
            if (req.body){     
                let { email, senha } = req.body;
                let loginModel = new LoginModel(email, senha);
                

                if (await loginModel.autenticar()){
                    res.status(200).json({tokenAcesso: "PFSII"});
                }
                else{
                    res.status(401).json({msg: "Nome e/ou e-mail incorretos!"});
                }
            }
            else {
                res.status(400).json({msg: "Preencha corretamente os campos!"});
            }
        }
        catch(ex){
            res.status(500).json({msg: "Erro inesperado! Entre em contato com o nosso suporte técnico!", detalhes: ex.message});
        }
    }
}