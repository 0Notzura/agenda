exports.MiddlewareGlobal=(req,res,next)=>{
    res.locals.errors=req.flash('errors')
    res.locals.success=req.flash('success')
    res.locals.user=req.session.user
    next()
}
exports.checkCSRF=(err,req,res,next)=>{
    if(err && err.code==='EBADCSRFTOKEN'){
        return res.render('404')
    }
}
exports.csrfMiddleware=(req,res,next)=>{
    res.locals.csrfToken=req.csrfToken()
    next()
}
exports.loginRequired=(req,res,next)=>{
    if(!req.session.user){
        req.flash('errors','voce precisa fazer login')
        req.session.save(()=>res.redirect('/'))
        return
    }
    next()
}
