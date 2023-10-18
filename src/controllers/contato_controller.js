const Contato = require('../models/contato_model');

exports.index = (req, res) => {
    res.render('contatos', { contato: null })
}
exports.register = async (req, res) => {
    try {
        const contato = new Contato(req.body)
        await contato.register()
        if (contato.errors.length > 0) {
            req.flash('errors', contato.errors)
            req.session.save(() => res.redirect('/contato'))
            return
        }
        req.flash('success', 'Contato registrado com sucesso')
        console.log(res.locals)
        req.session.save(() => { return res.redirect(`/contato/index/${contato.contato._id}`) })//o primeiro contato é o criado nesse arquivo
    } catch (e) {
        console.log(e)
        return res.render('404')
    }


}
exports.editId = async (req, res) => {
    if (!req.params.id) return res.render('404');

    try {
        const contato = await Contato.buscaPorId(req.params.id);

        if (!contato) return res.render('404');

        res.render('contatos', { contato }); // Pass the 'contato' object to the template
    } catch (e) {
        console.log(e);
        return res.render('404');
    }
};
exports.edit = async (req, res) => {
    try {
        if (!req.params.id) return res.render('404');
        const contato = new Contato(req.body);
        await contato.edit(req.params.id)
        if (contato.errors.length > 0) {
            req.flash('errors', contato.errors)
            req.session.save(() => res.redirect(`/contato/index/${req.params.id}`))
            return
        }
        req.flash('success', 'Contato editado com sucesso')
        console.log(res.locals)
        req.session.save(() => { return res.redirect(`/contato/index/${contato.contato._id}`) })//o primeiro contato é o criado nesse arquivo
        return
    } catch (e) {
        console.log(e)
        res.render('404')
        return
    }
};
exports.delete = async (req, res) => {
    if (!req.params.id) return res.render('404');

    try {
        const contato = await Contato.delete(req.params.id);
        
        if (!contato) return res.render('404');

        req.flash('success', 'Contato apagado com sucesso')
        console.log(res.locals)
        req.session.save(() => { res.redirect(`back`) })//o primeiro contato é o criado nesse arquivo
        return    
    } catch (e) {
        console.log(e);
        return res.re('404');
    }
};