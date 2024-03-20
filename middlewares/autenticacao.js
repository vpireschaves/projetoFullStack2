import jwt from 'jsonwebtoken';
import UsuarioModel from "../models/usuarioModel.js";

//segredo utilizado para o JWT - apenas de teste
const JWT_SEGREDO = "M3H4CK34R4M";

export default class Autenticacao {

    async validar(req, res, next){
        
        if(req.headers.chaveapi){

            try{
                let usuario = jwt.verify(req.headers.chaveapi, JWT_SEGREDO);

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
                res.status(401).json({msg: "Usuário não autorizado"});
            }
        }
        else {
            res.status(401).json({msg: "Usuário não autorizado"});
        }

    }

    gerarToken(usuario){
        return jwt.sign(JSON.stringify(usuario.toJSON()), JWT_SEGREDO);
    }
}