const express = require("express"); //framework para auxiliar rotas e requests
const bodyParser = require("body-parser"); //auxilia o node entender as requisições url em json
const jwt = require("jsonwebtoken");
const authConfig = require("./src/config/auth.json");         
var app = express();
app.set('port', (process.env.PORT || 3412));

app.use(bodyParser.json()); //entender quando receber requisições em json
app.use(bodyParser.urlencoded({ extended: false })); //para entender quando passar parametros via url

var operadoras = [
	{nome: "Oi", codigo: 14, categoria: "Celular"},
	{nome: "Vivo", codigo: 15, categoria: "Celular"},
	{nome: "Tim", codigo: 41, categoria: "Celular"},
	{nome: "GVT", codigo: 25, categoria: "Fixo"},
	{nome: "Embratel", codigo: 21, categoria: "Fixo"}
];

app.all('*', function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS, PATCH');
  res.header('Access-Control-Allow-Headers', '*');   
  next();
});

app.get('/operadoras', function(req, res) {
  res.json(operadoras);
});

//RenovaToken
function generateToken(params = {}) {
  return jwt.sign(params, authConfig.secret, {
    expiresIn: 86400 //1 dia
  }); 
}
app.post("/renew", async (req, res) => {
  const vToken = req.body.token;
  
  var vid;
  var vemail;
  var vsenha;
  const parts = vToken.split(" ");
  const [scheme, token] = parts;
  
  //Validação inicial do token
  if (!vToken)
	return res
	  .status(403)
	  .send({ error: "O token de acesso não foi informado." });

  //validação efetiva do token
  jwt.verify(token, authConfig.secret, (err, decoded) => {	  
	if (err) return res.status(403).send({ error: "Sessão expirada. Efetue o login novamente." });    

	vid = decoded.id;
	vemail = decoded.email;
	vsenha = decoded.senha;
	 
  });
  
  res.send({ token: generateToken({ id: vid, email: vemail, senha: vsenha }) });
});

//Referenciamento do authController
require("./src/js/controllers/authController")(app); //passa o app como parâmetro
require("./src/js/routes/users.js")(app); 

app.listen(app.get('port'), function() {
  console.log("server iniciado na porta "+app.get('port'));
});
