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

    toJSON() {
        return {
            "perfilId": this.#perfilId,
            "perfilNome": this.#perfilNome
        }
    }
}