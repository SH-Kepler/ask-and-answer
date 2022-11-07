const express = require('express');
const app = express();
const bodyParser = require('body-parser');

app.set('view engine', 'ejs');
app.use(express.static('public'));

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.render('index');
});

app.get('/ask', (req, res) => {
  res.render('ask');
});

app.post('/savequestion', (req, res) => {
  const title = req.body.title;
  const description = req.body.description;
  res.send(`Formulário recebido! Título: ${title} Descrição: ${description}`);
});

app.listen(8080, () => {console.log('App rodando!');});
