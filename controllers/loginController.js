import Autenticacao from "../middlewares/autenticacao.js";
import LoginModel from "../models/loginModel.js";
import UsuarioModel from "../models/usuarioModel.js";

export default class LoginController{
    
    async autenticar(req, res){
        try{
            if (req.body){     
                let { email, senha } = req.body;
                let loginModel = new LoginModel(email, senha);
                

                if (await loginModel.autenticar()){
                    let usuario = new UsuarioModel();
                    usuario = await usuario.obterPorEmailSenha(email, senha);
                    usuario.usuSenha = "";
                    let auth = new Autenticacao();
                    let token = auth.gerarToken(usuario.toJSON());

                    res.cookie("jwt", token, {httpOnly: true});

                    res.status(200).json({tokenAcesso: token});
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