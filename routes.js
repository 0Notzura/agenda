const express=require('express')
const route=express.Router()
const homeController=require('./src/controllers/home_controller')
const loginController = require('./src/controllers/login_controller');
const contatoController = require('./src/controllers/contato_controller');
const { loginRequired } = require('./src/middlewares/middleware');


route.get('/',homeController.index)

route.get('/login',loginController.index)
route.post('/login/register',loginController.register)
route.post('/login/login',loginController.login)
route.get('/login/logout',loginController.logout)


route.get('/contato',loginRequired,contatoController.index)
route.post('/contato/register',loginRequired,contatoController.register)
route.get('/contato/index/:id',loginRequired,contatoController.editId)
route.post('/contato/edit/:id',loginRequired,contatoController.edit)
route.get('/contato/delete/:id',loginRequired,contatoController.delete)

module.exports=route