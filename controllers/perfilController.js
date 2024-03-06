export default class PerfilController {

    listar(req, res) {
        res.status(200).json()[
            {
                id: 1,
                descricao: 'Administrador'
            }
        ]
    }

}