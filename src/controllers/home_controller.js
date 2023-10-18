const Contato=require('../models/contato_model')

exports.index=async (req,res)=>{
    const contatos= await Contato.buscaContatos()
    res.render('index',{contatos})
}


