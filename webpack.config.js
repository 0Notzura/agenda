const path = require('path');

module.exports={
    mode:'production',//o webpack tenta encurtar ao maximo o codigo(quebra de linha, espaço, nomes, ...)
    entry:'./frontend/main.js',//arquivo de entrada
    output:{
        path:path.resolve(__dirname,'public','assets','js'),//caminho do arquivo de saida
        filename:'bundle.js'//nome do arquivo
    },
    module:{
        //regras de tratamento
        rules:[
        {//obj responsavel pelo tratamento do script
            exclude:/node_modules/,//exclui dos testes tudo do node_modules
            test:/\.js$/,//faz o teste no arquivos ,js
            use:{//indica qual sera o loader
                loader:'babel-loader',
                options:{
                    presets:['@babel/env']
                }
            }
        },
        {
            test:/\.css/,
            use:["style-loader",'css-loader']
        }
        ]
    },
    devtool:'source-map'//cira um segundo arquivo que faz o mapeamento do bundle para os originais e permite ver o arquivo original no navegador


}