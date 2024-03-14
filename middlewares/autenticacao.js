import jwt from 'jsonwebtoken';

//segredo utilizado para o JWT - apenas de teste
const JWT_SEGREDO = "M3H4CK34R4M";

export default class Autenticacao {

    validar(req, res, next){
        jwt.verify( )

        if(req.headers.chaveapi == "PFSII"){
            next();
        }
        else {
            res.status(401).json({msg: "Usuário não autorizado"});
        }

    }

    gerarToken(usuario){
        return jwt.sign(JSON.stringify(usuario.toJSON()), JWT_SEGREDO);
    }
}