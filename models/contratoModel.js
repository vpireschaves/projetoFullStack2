

export default class ContratoModel {
    
    #contratoId;
    #imovel;
    #usuario;

    get contratoId() {
        return this.#contratoId;
    }

    get imovel() {
        return this.#imovel;
    }

    get usuario() {
        return this.#usuario;
    }

    set contratoId(contratoId) {
        this.#contratoId = contratoId;
    }

    set imovel(imovel) {
        this.#imovel = imovel;
    }

    set usuario(usuario) {
        this.#usuario = usuario;
    }

    constructor(contratoId, imovel, usuario) {
        this.#contratoId = contratoId;
        this.#imovel = imovel;
        this.#usuario = usuario;
    }

    toJSON() {
        return {
            "contratoId": this.#contratoId,
            "imovel": this.#imovel.toJSON(),
            "usuario": this.#usuario.toJSON()
        }
    }

    async gravar(){
        let sql = "INSERT INTO tb_contrato (imv_id, usu_id) VALUES (?, ?)";
        let valores = [this.#imovel.imovelId, this.#usuario.usuId];
    
        let idGerado = await banco.ExecutaComandoNonQuery(sql, valores);

        return idGerado;
    }
}