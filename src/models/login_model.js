const mongoose = require('mongoose')
const validator = require('validator')
const bcryptjs = require('bcryptjs')

const LoginSchema = new mongoose.Schema({
    email: { type: String, required: true },
    password: { type: String, required: true }
})

const LoginModel = mongoose.model('Login', LoginSchema)
class Login {
    constructor(body) {
        this.body = body
        this.errors = []//se tiver um erro aq, n da pra cadastrar
        this.user = null//
    }
    async register() {//salva o usuario
        this.valida()
        if (this.errors.length > 0) return
        await this.userExist()
        if (this.errors.length > 0) return
        const salt = bcryptjs.genSaltSync()
        this.body.password = bcryptjs.hashSync(this.body.password, salt)
        this.user = await LoginModel.create(this.body)

    }

    async login() {//salva o usuario
        this.valida()
        if (this.errors.length > 0) return
        this.user = await LoginModel.findOne({ email: this.body.email })
        if(!this.user) {
            this.errors.push('Usuario não existe')
            return
        }
        const isPasswordValid = await bcryptjs.compare(this.body.password, this.user.password);
        if(!isPasswordValid){
            console.log('senha invalida')
            this.errors.push('senha invalida')
            this.user=null//garante que o usuario seja nulo porque ele esta sendo criado antes
            return
        }

    }

    async userExist() {
        const user = await LoginModel.findOne({ email: this.body.email })
        if (user) this.errors.push('Usuario ja existe')
    }

    valida() {//confere se os dados estão consistentes
        this.cleanUp()
        if (!validator.isEmail(this.body.email)) {
            this.errors.push('email invalido')
        }

        if (this.body.password.length < 5 || this.body.password.length > 30) {
            this.errors.push('senha de tamanho invalido, precisa esta entre 5 e 30')
        }

    }
    cleanUp() {
        for (const key in this.body) {
            if (typeof this.body[key] !== 'string') {
                this.body[key] = ''
            }
        }

        this.body = {//tira o campo do csrf
            email: this.body.email,
            password: this.body.password
        }
    }
}

module.exports = Login