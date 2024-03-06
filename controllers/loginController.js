let usuarios = [
    {
        id: 1,
        nome: "Fulvio",
        email: "fulvio@unoeste.br",
        cidade: "Presidente Prudente",
        sexo: "M",
        idade: 26,
        senha: 123
    },
    {
        id: 2,
        nome: "Fulano",
        email: "fulano@unoeste.br",
        cidade: "Presidente Prudente",
        sexo: "M",
        idade: 44,
        senha: 456
    }
]

export default class LoginController{
    
    autenticar(req, res){
        try{
            if (req.body){             
                let usuario = usuarios.filter(x => x.email == req.body.email && x.senha == req.body.senha)

                if (usuario.length > 0) {
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