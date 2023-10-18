require('dotenv').config()

const express=require('express');
const app=express();
const routes=require("./routes")
const path=require('path')
const session=require('express-session')
const MongoStore=require('connect-mongo')
const flash=require('connect-flash')
const helmet=require('helmet')
const csurf=require('csurf')
const {checkCSRF,csrfMiddleware, MiddlewareGlobal}=require('./src/middlewares/middleware')

const mongoose= require('mongoose')

mongoose.connect(process.env.CONNECTIONSTRING,{useNewUrlParser: true, useUnifiedTopology: true})
.then(()=>{
    console.log('conectado')
    app.emit('pronto')
})
.catch(()=>{
    console.log('deu erro na conexão')
})



app.use(express.urlencoded({extended:true}))//serve para tratar o que veio no body passando pra obj

app.use(express.static(path.resolve(__dirname,'public')))//ta roteando os arquivos do public diretamente no site
app.use(helmet())
const sessionOpt=session({
    secret:'4m32r4ç;wqfmkbçrkçebm63',
    store: MongoStore.create({ mongoUrl: process.env.CONNECTIONSTRING }),
    resave:false,
    saveUninitialized:false,
    cookie:{
        maxAge:1000*60*60*24*7,
        httpOnly:true
    }
})
app.use(sessionOpt)
app.use(flash())

app.set('views',path.resolve(__dirname,'src','views'));
app.set('view engine','ejs')

app.use(csurf())

app.use(MiddlewareGlobal)
app.use(csrfMiddleware)
app.use(checkCSRF)
app.use(routes)//passa a usar as rotas do routes

app.on('pronto',()=>{
    app.listen(3000,()=>{
        console.log('servidor rodando na 3000')
    })
})

