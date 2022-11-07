const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const connection = require('./database/database');
const Pergunta = require('./database/Asks');
const Resposta = require('./database/Resposta');

connection
  .authenticate()
  .then(() => {
    console.log('Conexão feita com o banco de dados!');
  })
  .catch((errorMsg) => {
    console.log(errorMsg);
  })

app.set('view engine', 'ejs');
app.use(express.static('public'));

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.get('/', (req, res) => {
  Pergunta.findAll({raw: true, order: [
    ['id', 'DESC']
  ]}).then((perguntas) => {
    res.render('index', {
      perguntas,
    });
  });
});

app.get('/ask', (req, res) => {
  res.render('ask');
});

app.post('/savequestion', (req, res) => {
  const title = req.body.title;
  const description = req.body.description;
  Pergunta.create({
    title,
    description
  }).then(() => {
    res.redirect('/');
  })
});

app.get('/ask/:id', (req, res) => {
  const id = req.params.id;
  const perguntaId = req.body.pergunta;
  Pergunta.findOne({
    where: {id}
  }).then((pergunta) => {
    if(pergunta != undefined) {
      Resposta.findAll({
        where: {perguntaId: pergunta.id}
      }).then((respostas) => {
        res.render('question', {
          pergunta,
          respostas
        });
      });
    } else {
      res.redirect('/');
    };
  });
});

app.post('/answer', (req, res) => {
  const body = req.body.corpo;
  const perguntaId = req.body.pergunta;
  Resposta.create({
    body,
    perguntaId
  }).then(() => {
    res.redirect(`/ask/${perguntaId}`);
  });
});

app.listen(8080, () => {console.log('App rodando!');});
