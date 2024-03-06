import Database from "../db/database.js";

const banco = new Database();

export default class PerfilModel {

    #perfilId;
    #perfilNome;

    get perfilId() {
        return this.#perfilId;
    }

    set perfilId(perfilId) {
        this.#perfilId = perfilId
    }

    get perfilNome(){
        return this.#perfilId;
    }

    set perfilNome(perfilNome) {
        this.#perfilNome = perfilNome;
    }

    constructor (perfilId, perfilNome) {
        this.#perfilId = perfilId,
        this.#perfilNome = perfilNome
    }

    async listar(){
        let lista = [];
        let sql = "select * from tb_perfil";

        let rows = await banco.ExecutaComando(sql);

        for (let index = 0; index < rows.length; index++) {
            const row = rows[index];

            lista.push(new PerfilModel(row["per_id"], row["per_nome"]));
        }

        return lista;
    }


    toJSON() {
        return {
            "perfilId": this.#perfilId,
            "perfilNome": this.#perfilNome
        }
    }
}