export default class LoginModel {

    #email;
    #senha;

    get email() {
        return this.#email;
    }

    set email(email) {
        this.#email = email
    }

    get senha(){
        return this.#email;
    }

    set senha(senha) {
        this.#senha = senha;
    }

    constructor (email, senha) {
        this.#email = email,
        this.#senha = senha
    }

    toJSON() {
        return {
            "email": this.#email,
            "senha": this.#senha
        }
    }
}