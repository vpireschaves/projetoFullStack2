export default class Autenticacao {

    validar(req, res, next){

        if(req.headers.chaveapi == "PFSII"){
            next();
        }
        else {
            res.status(401).json({msg: "Usuário não autorizado"});
        }

    }
}