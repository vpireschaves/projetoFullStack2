import Database from "../db/database.js";
import PerfilModel from "./perfilModel.js";

const banco = new Database();

export default class UsuarioModel {

    #usuId;
    #usuNome;
    #usuEmail;
    #usuSenha;
    #perfil;

    get usuId() {
        return this.#usuId;
    }

    set usuId(usuId) {
        this.#usuId = usuId
    }

    get usuNome() {
        return this.#usuNome;
    }

    set usuNome(usuNome) {
        this.#usuNome = usuNome
    }

    get usuEmail() {
        return this.#usuEmail;
    }

    set usuEmail(usuEmail) {
        this.#usuEmail = usuEmail
    }

    get usuSenha() {
        return this.#usuSenha;
    }

    set usuSenha(usuSenha) {
        this.#usuSenha = usuSenha
    }

    get perfil() {
        return this.#perfil;
    }

    set perfil(perfil) {
        this.#perfil = perfil
    }

    constructor (usuId, usuNome, usuEmail, usuSenha, perfil) {
        this.#usuId = usuId,
        this.#usuNome = usuNome,
        this.#usuEmail = usuEmail,
        this.#usuSenha = usuSenha,
        this.#perfil = perfil
    }

    toJSON() {
        return {
            "usuId": this.#usuId,
            "usuNome": this.#usuNome,
            "usuEmail": this.#usuEmail,
            "usuSenha": this.#usuSenha,
            "perfil": this.#perfil.toJSON()
        }
    }

    async listar() {
        let lista = [];
        let sql = "select * from tb_usuario u inner join tb_perfil p on u.per_id = p.per_id";
        
        let rows = await banco.ExecutaComando(sql);

        for (let index = 0; index < rows.length; index++) {
            let row = rows[index];

            lista.push(new UsuarioModel(row['usu_id'], row['usu_nome'], row['usu_email'], row['usu_senha'], new PerfilModel(row['per_id'], row['per_nome'])));     
        }

        return lista;
    }

    async gravar() {

        if (this.#usuId == 0){
            var sql = "insert into tb_usuario (usu_nome, usu_email, usu_senha, per_id) values (?, ?, ?, ?)";

            var valores = [this.#usuNome, this.#usuEmail, this.#usuSenha, this.#perfil.perfilId];
        }
        else{
            var sql = "update tb_usuario set usu_nome = ?, usu_email = ?, usu_senha = ?, per_id = ? where usu_id = ?";

            var valores = [this.#usuNome, this.#usuEmail, this.#usuSenha, this.#perfil.perfilId, this.#usuId];
        }

        let result = await banco.ExecutaComandoNonQuery(sql, valores);

        return result;
    }

    async obter(id) {
        let sql = "select * from tb_usuario u inner join tb_perfil p on u.per_id = p.per_id where usu_id = ?";

        let valores = [id];

        let row = await banco.ExecutaComando(sql, valores);

        if(row.length > 0){
            return new UsuarioModel(row[0]["usu_id"], row[0]["usu_nome"], row[0]["usu_email"], row[0]["usu_senha"], new PerfilModel(row[0]["per_id"], row[0]["per_nome"]));
        }
        
        return null;
    }

    async obterPorEmailSenha(email, senha){
        let sql = "select * from tb_usuario where usu_email = ? and usu_senha = ?";

        let valores = [email, senha];

        let row = await banco.ExecutaComando(sql, valores);

        if(row.length > 0){
            return new UsuarioModel(row[0]["usu_id"], row[0]["usu_nome"], row[0]["usu_email"], row[0]["usu_senha"], new PerfilModel(row[0]["per_id"], row[0]["per_nome"]));
        }
        
        return null;
    }

    async deletar(id){
        let sql = "delete from tb_usuario where usu_id = ?";

        let valores = [id];

        let result = await banco.ExecutaComandoNonQuery(sql, valores);

        return result;
    }

    async alterarEmail(id, email){
        
        let sql = "update tb_usuario set usu_email = ? where usu_id = ?";

        let valores = [email, id];

        let result = await banco.ExecutaComandoNonQuery(sql, valores);
        
        return result;
    }
}