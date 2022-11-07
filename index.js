const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const connection = require('./database/database');
const Pergunta = require('./database/Asks');

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
  Pergunta.findOne({
    where: {id}
  }).then((pergunta) => {
    if(pergunta != undefined) {
      res.render('question');
    } else {
      res.redirect('/');
    };
  });
});

app.listen(8080, () => {console.log('App rodando!');});
