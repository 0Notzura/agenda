const mongoose = require('mongoose')
const validator = require('validator')

const ContatoSchema = new mongoose.Schema({
    nome: { type: String, required: true },
    sobrenome: { type: String, required: false, default:'' },
    email: { type: String, required: false, default:'' },
    telefone: { type: String, required: false, default:'' },
    data: { type: Date, default:Date.now() },
})

const ContatoModel = mongoose.model('Contato', ContatoSchema)

function Contato(body){
    this.body=body
    this.errors=[]
    this.contato=null
}


Contato.prototype.register = async function () {
    this.valida();
    if (this.errors.length > 0) return;
    try {
        this.contato = await ContatoModel.create(this.body);
    } catch (error) {
        console.log(error);
        this.errors.push('Erro ao criar o contato.');
    }
};
Contato.prototype.valida=function(){//confere se os dados estão consistentes
    this.cleanUp()
    if (this.body.email &&!validator.isEmail(this.body.email)) {
        this.errors.push('email invalido')
    }
    if(!this.body.nome) this.errors.push('O campo nome é obrigatorio')
    if(!this.body.email && !this.body.telefone){
        console.log(this.body)
        this.errors.push("Pelo menos um dos campos deve ser preenchido: telefone ou email")
    }

}
Contato.prototype.cleanUp=function(){
    for (const key in this.body) {
        if (typeof this.body[key] !== 'string' && key!='data') {
            this.body[key] = ''
        }
    }

    this.body = {//tira o campo do csrf
        nome: this.body.nome,
        sobrenome: this.body.sobrenome,
        email: this.body.email,
        telefone: this.body.telefone,
    }
}
Contato.prototype.edit = async function (id) {
    this.valida();
    if (this.errors.length > 0) return;
    try {
        this.contato = await ContatoModel.findByIdAndUpdate(id,this.body,{new:true});
    } catch (error) {
        console.log(error);
        this.errors.push('Erro ao criar o contato.');
    }
};
Contato.buscaPorId=async (id)=>{//estatica
    if(typeof id!='string') return
    const user= await ContatoModel.findById(id)
    return user
}
Contato.buscaContatos=async ()=>{//estatica
    const contatos= await ContatoModel.find().sort({data:-1})
    return contatos
}
Contato.delete=async (id)=>{//estatica
    if (typeof id!='string') return;
    try {
        const contato = await ContatoModel.findByIdAndDelete(id,this.body,{new:true});
        console.log(contato)
        return contato
    } catch (error) {
        console.log(error);
        this.errors.push('Erro ao criar o contato.');
    }
}

module.exports = Contato;