const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const connection = require("./database/database")
const Pergunta = require("./database/pergunta");
const Resposta =require("./database/Resposta");
//database

connection
    .authenticate()
    .then(() => {
        console.log("conexcao feita com o banco de dados")
    })
    .catch((msgErro)=>{
        console.log("msgErro")
    })

//estou dizendo para o express usar o ejs como rendelizador de html// todos arquivos html devem ser salvos numa pasta views e eles devem ser .ejs
app.set('view engine', 'ejs')
app.use(express.static('public'));

app.use(bodyParser.urlencoded({extended: false}));//isso é para pegar os dados que o usuario imputar na pagina
app.use(bodyParser.json());

//rotas
app.get("/",(req, res)=>{
    Pergunta.findAll({raw: true, order:[
        ['id','DESC']   //ASC significa crescente e DESC significa descrescente
    ]}).then(pergunta =>{
        res.render("index", {
            pergunta:pergunta
        })
    });
     //isso aqui é para exibir o hmtl, no caso .ejs
});

app.get("/perguntar",(req, res)=>{
    res.render("perguntar")
});


app.post("/salvarpergunta",(req, res)=>{
    var titulo = req.body.titulo;
    var descricao = req.body.descricao;
    Pergunta.create({
        titulo: titulo,
        descricao: descricao
    }).then(()=>{
        res.redirect("/")
    })
});

app.get("/pergunta/:id",(req, res)=>{
    var id = req.params.id;
    Pergunta.findOne({
        where: {id: id}
    }).then(pergunta =>{
        if(pergunta != undefined){
            Resposta.findAll({
                where:{perguntaId: pergunta.id},
                order: [
                    ['id', 'DESC']
                ]
            }).then(respostas =>{
                res.render("pergunta",{
                    pergunta:pergunta,
                    respostas:respostas
                });
            })
            
        }else{
            res.redirect("/")
        }
    })
});

app.post("/responder",(req,res)=>{
    var corpo = req.body.corpo;
    var perguntaId = req.body.pergunta;
    Resposta.create({
        corpo: corpo,
        perguntaId: perguntaId
    }).then(()=>{
        res.redirect("/pergunta/"+perguntaId);
    })
});


app.listen(8080,()=>{
    console.log("servidor rodando")
});
