import jwt from 'jsonwebtoken';
import UsuarioModel from "../models/usuarioModel.js";

//segredo utilizado para o JWT - apenas de teste
const JWT_SEGREDO = "M3H4CK34R4M";

export default class Autenticacao {

    async validar(req, res, next){
        
        if(req.cookies.jwt){

            let token = req.cookies.jwt;

            try{
                let usuario = jwt.verify(token, JWT_SEGREDO);

                let usuarioModel = new UsuarioModel();
                usuarioModel = await usuarioModel.obter(usuario.usuId);

                if (usuarioModel != null){
                    next();
                }
                else{
                    res.status(401).json({msg: "Usuário inválido"});
                }
            }
            catch(ex){

                if(ex.name == "TokenExpiredError"){
                    let usuarioRecuperado = jwt.verify(token, JWT_SEGREDO, { ignoreExpiration: true });

                    //gera o token novamente e escreve na cookie de resposta

                    let auth = new Autenticacao();

                    let novoToken = auth.gerarToken({
                        usuId: usuarioRecuperado.usuId,
                        usuNome: usuarioRecuperado.usuNome,
                        usuEmail: usuarioRecuperado.usuEmail,
                        perfil: usuarioRecuperado.perfil
                    });
                    res.cookie(jwt, novoToken, {httpOnly: true});

                    next();
                }
                else{
                    res.status(401).json({msg: "Usuário não autorizado"});
                }
            }
        }
        else {
            res.status(401).json({msg: "Usuário não autorizado"});
        }

    }

    gerarToken(usuario){
        return jwt.sign(usuario, JWT_SEGREDO, { expiresIn: 60 });
    }
}