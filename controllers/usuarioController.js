import UsuarioModel from "../models/usuarioModel.js";

export default class UsuarioController {

    async listar(req, res){
        try{

            let usuario = new UsuarioModel();
            let listaUsuarios = await usuario.listar();

            res.status(200).json(listaUsuarios);
        }
        catch(ex){
            res.status(500).json({msg: "Erro inesperado! Entre em contato com o nosso suporte técnico!", detalhes: ex.message});
        }  
    }

    async obter(req, res){

        try{

            let { id } = req.params;
            
            let usuario = new UsuarioModel();
            let usuarioEncontrado = await usuario.obter(id);

            if(usuarioEncontrado != null){
                res.status(200).json(usuarioEncontrado);
            }
            else {
                res.status(404).json({msg: "Usuário não encontrado"});
            }
        }
        catch(ex){
            res.status(500).json({msg: "Erro inesperado! Entre em contato com o nosso suporte técnico!", detalhes: ex.message});
        }        
    }

    excluir(req, res){
        try{
            let usuario = usuarios.filter(x=> x.id == req.params.id);

            if(usuario.length > 0){
                usuarios = usuarios.filter(x => x.id != req.params.id);
    
                res.status(200).json({msg: "Exclusão realizada com sucesso!"});
            }
            else{
                res.status(404).json({msg: "Usuário não encontrado para exclusão!"});
            }
        }
        catch(ex){
            res.status(500).json({msg: "Erro inesperado! Entre em contato com o nosso suporte técnico!", detalhes: ex.message});
        }  
    }
        
    atualizar(req, res){
        try{
            if (req.body){
                if(Object.keys(req.body).length == 6){
                    usuarios = usuarios.map(function(value, index){
    
                        if (req.body.id === value.id){
                            return req.body;
                        }
                        return value;
                    })
    
                    res.status(200).json({msg: "Usuário atualizado com sucesso!"});
                }
                else{
                    res.status(400).json({msg: "Existem campos que não foram preenchidos!"});
                }
            }
            else {
                res.status(400).json({msg: "Preencha corretamente os dados do usuário!"});
            }
        }
        catch(ex){
            res.status(500).json({msg: "Erro inesperado! Entre em contato com o nosso suporte técnico!", detalhes: ex.message});
        }
    }
    
    alterarEmail(req, res){
        try{
            let achou = false;
            if(req.body){
                if(req.body.email != ""){
                    for(let i = 0; i < usuarios.length; i++){
                        
                        if (usuarios[i].id == req.params.id){
                            usuarios[i].email = req.body.email;
                            achou = true;
                        }
                    }
    
                    if(achou){
                        res.status(200).json({msg: "E-mail alterado!"});
                    }
                    else {
                        res.status(404).json({msg: "Usuário não encontrado para alteração de e-mail"});
                    }
                }
                else {
                    res.status(400).json({msg: "O campo e-mail está vazio!"});
                }
            }
            else {
                res.status(400).json({msg: "Preencha o e-mail a ser alterado!"});
            }
        }
        catch(ex){
            res.status(500).json({msg: "Erro inesperado! Entre em contato com o nosso suporte técnico!", detalhes: ex.message});
        }
    }

    async criar(req, res){
        try{
            if(req.body){

                let { usuNome, usuEmail, usuSenha, perfil } = req.body;

                if(usuNome != "" && usuEmail != "" && usuSenha != "" & perfil > 0){
                    
                    let usuario = new UsuarioModel(0, usuNome, usuEmail, usuSenha, perfil);

                    let result = await usuario.gravar();

                    if(result){
                        res.status(201).json({msg: "Usuário cadastrado com sucesso"});
                    }
                    else {
                        res.status(500).json({msg: "Erro interno de servidor."})
                    }                    
                }
                else{
                    res.status(400).json({msg: "Por favor, preencha as todas as informações do usuário"});
                }
            }
            else{
                res.status(400).json({msg: "Por favor, informe os dados do usuário"});
            }
        }
        catch(ex){
            res.status(500).json({msg: "Erro inesperado! Entre em contato com o nosso suporte técnico!", detalhes: ex.message});
        }  
    }
}