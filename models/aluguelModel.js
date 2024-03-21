import Database from "../db/database.js";

const banco = new Database();

export default class AluguelModel {
    #aluguelId;
    #aluguelMes;
    #aluguelVencimento;
    #aluguelValor;
    #aluguelPago;
    #contrato;

    get aluguelId() {
        return this.#aluguelId;
    }

    get aluguelMes() {
        return this.#aluguelMes;
    }

    get aluguelVencimento() {
        return this.#aluguelVencimento;
    }

    get aluguelValor() {
        return this.#aluguelValor;
    }

    get aluguelPago() {
        return this.#aluguelPago;
    }

    get contrato() {
        return this.#contrato;
    }

    set aluguelId(aluguelId) {
        this.#aluguelId = aluguelId;
    }

    set aluguelMes(aluguelMes) {
        this.#aluguelMes = aluguelMes;
    }

    set aluguelVencimento(aluguelVencimento) {
        this.#aluguelVencimento = aluguelVencimento;
    }

    set aluguelValor(aluguelValor) {
        this.#aluguelValor = aluguelValor;
    }

    set aluguelPago(aluguelPago) {
        this.#aluguelPago = aluguelPago;
    }

    set contrato(contrato) {
        this.#contrato = contrato;
    }

    constructor(aluguelId, aluguelMes, aluguelVencimento, aluguelValor, aluguelPago, contrato) {
        this.#aluguelId = aluguelId;
        this.#aluguelMes = aluguelMes;
        this.#aluguelVencimento = aluguelVencimento;
        this.#aluguelValor = aluguelValor;
        this.#aluguelPago = aluguelPago;
        this.#contrato = contrato;
    }

    async gravar() {
        
        let sql = "INSERT INTO tb_aluguel (alu_mes, alu_vencimento, alu_valor, alu_pago, ctr_id) VALUES (?, ?, ?, ?, ?)";

        let valores = [this.#aluguelMes, this.#aluguelVencimento, this.#aluguelValor, this.#aluguelPago, this.#contrato.contratoId];

        let result = await banco.ExecutaComandoNonQuery(sql, valores);

        return result;
    }
}