import Database from "../db/database.js";

let banco = new Database();

export default class ImovelModel {

    #imovelId;
    #imovelDescricao;
    #imovelValor;
    #imovelCep;
    #imovelEndereco;
    #imovelBairro;
    #imovelCidade;
    #imovelUf;
    #imovelDisponivel;

    get imovelId() {
        return this.#imovelId;
    }
    set imovelId(imovelId) {
        this.#imovelId = imovelId;
    }

    get imovelDescricao() {
        return this.#imovelDescricao;
    }
    set imovelDescricao(imovelDescricao) {
        this.#imovelDescricao = imovelDescricao;
    }

    get imovelValor() {
        return this.#imovelValor;
    }
    set imovelValor(imovelValor) {
        this.#imovelValor = imovelValor;
    }
    
    get imovelCep() {
        return this.#imovelCep;
    }
    set imovelCep(imovelCep) {
        this.#imovelCep = imovelCep;
    }

    get imovelEndereco() {
        return this.#imovelEndereco;
    }
    set imovelEndereco(imovelEndereco) {
        this.#imovelEndereco = imovelEndereco;
    }

    get imovelBairro() {
        return this.#imovelBairro;
    }
    set imovelBairro(imovelBairro) {
        this.#imovelBairro = imovelBairro;
    }

    get imovelCidade() {
        return this.#imovelCidade;
    }
    set imovelCidade(imovelCidade) {
        this.#imovelCidade = imovelCidade;
    }

    get imovelUf() {
        return this.#imovelUf;
    }
    set imovelUf(imovelUf) {
        this.#imovelUf = imovelUf;
    }

    get imovelDisponivel() {
        return this.#imovelDisponivel;
    }
    set imovelDisponivel(imovelDisponivel) {
        this.#imovelDisponivel = imovelDisponivel;
    }

    constructor(imovelId, imovelDescricao, imovelValor, imovelCep, imovelEndereco, imovelBairro, imovelCidade, imovelUf, imovelDisponivel) {
        this.#imovelId = imovelId;
        this.#imovelDescricao = imovelDescricao;
        this.#imovelValor = imovelValor;
        this.#imovelCep = imovelCep;
        this.#imovelEndereco = imovelEndereco;
        this.#imovelBairro = imovelBairro;
        this.#imovelCidade = imovelCidade;
        this.#imovelUf = imovelUf;
        this.#imovelDisponivel = imovelDisponivel;
    }

    toJSON() {
        return {
            "imovelId": this.#imovelId,
            "imovelDescricao": this.#imovelDescricao,
            "imovelValor": this.#imovelValor,
            "imovelCep": this.#imovelCep,
            "imovelEndereco": this.#imovelEndereco,
            "imovelBairro": this.#imovelBairro,
            "imovelCidade": this.#imovelCidade,
            "imovelUf": this.#imovelUf,
            "imovelDisponivel": this.#imovelDisponivel
        }
    }

    toMap(rows){

        let lista = [];

        for (let index = 0; index < rows.length; index++) {
            const row = rows[index];

            lista.push(new ImovelModel(row["imv_id"], row["imv_descricao"], row["imv_valor"], row["imv_cep"], row["imv_endereco"], row["imv_bairro"], row["imv_cidade"], row["imv_uf"], row["imv_disponivel"]));
        }

        return lista;
    }

    async listar(){

        let lista = [];

        let sql = "select * from tb_imovel";
        let rows = await banco.ExecutaComando(sql);

        lista = this.toMap(rows);

        return lista;
    }

    async obter(id){
        let sql = "select * from tb_imovel where imv_id = ?";

        let valores = [id];

        let rows = await banco.ExecutaComando(sql, valores);

        if(rows.length > 0){
            return this.toMap(rows)[0];
        }
        
        return null;
    }

    async excluir(id){
        let sql = "delete from tb_imovel where imv_id = ?";

        let valores = [id];

        let result = await banco.ExecutaComandoNonQuery(sql, valores);

        return result;
    }

    async gravar(bd){
        let sql = '';
        let valores = [];

        if(bd != null){
            banco = bd;
        }

        if (this.#imovelId == 0){
            //inserção
            
            sql = "insert into tb_imovel (imv_descricao, imv_valor, imv_cep, imv_endereco, imv_bairro, imv_cidade, imv_uf, imv_disponivel) values (?, ?, ?, ?, ?, ?, ?, ?)";

            valores = [this.#imovelDescricao, this.#imovelValor, this.#imovelCep, this.#imovelEndereco, this.#imovelBairro, this.#imovelCidade, this.#imovelUf, this.#imovelDisponivel];
        }
        else {
            //alteração

            sql = "update tb_imovel set imv_descricao = ?, imv_valor = ?, imv_cep = ?, imv_endereco = ?, imv_bairro = ?, imv_cidade = ?, imv_uf = ?, imv_disponivel = ? where imv_id = ?";

            valores = [this.#imovelDescricao, this.#imovelValor, this.#imovelCep, this.#imovelEndereco, this.#imovelBairro, this.#imovelCidade, this.#imovelUf, this.#imovelDisponivel, this.#imovelId];
        }

        let result = await banco.ExecutaComandoNonQuery(sql, valores);

        return result;
    }
}