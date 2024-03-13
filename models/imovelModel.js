import Database from "../db/database.js";

const banco = new Database();

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

    async listar(){

        let lista = [];

        let sql = "select * from tb_imovel";
        let rows = await banco.ExecutaComando(sql);

        for (let index = 0; index < rows.length; index++) {
            const row = rows[index];

            lista.push(new ImovelModel(row["imovelId"], row["imovelDescricao"], row["imovelValor"], row["imovelCep"], row["imovelEndereco"], row["imovelBairro"], row["imovelCidade"], row["imovelUf"], row["imovelDisponivel"]));
        }

        return lista;
    }
}