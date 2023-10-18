const Login = require('../models/login_model')

exports.index=(req,res)=>{
    if(req.session.user) return res.render('Logado')
    res.render('login')
}
exports.register=async (req,res)=>{
    try{
        const login= new Login(req.body)
 
    await login.register()

    if(login.errors.length>0){
        req.flash('errors',login.errors)
        req.session.save(()=>{
            return res.redirect('/login')
        })
        return
    }
    req.flash('success',"Usuario criado com sucesso")
        req.session.save(()=>{
            return res.redirect('/login')
        })

    }
    catch(e){
        res.render('404')
        console.log(e)
        return
    }
    
}
exports.login=async (req,res)=>{
    try{
        const login= new Login(req.body)
 
    await login.login()

    if(login.errors.length>0){
        req.flash('errors',login.errors)
        req.session.save(()=>{
            return res.redirect('/login')
        })
        return
    }

    req.flash('success',"Usuario logado com sucesso")
    req.session.user=login.user
    req.session.save(()=>{
        return res.redirect('/login')
    })

    }
    catch(e){
        res.render('404')
        console.log(e)
        return
    }
    
}

exports.logout=function(req,res){
    req.session.destroy()
    res.redirect('/')
}
