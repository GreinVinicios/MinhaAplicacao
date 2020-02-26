by Vinícios Grein

//Collections POSTMAN
https://www.getpostman.com/collections/d7e2c8be2fd7777bdb13

//Routes
//Login
Method: POST
<host_IP>:<host_port>/auth/login
Header
Content-Type: application/json
Body
{
	"email":"<e_mail@email.com>",
	"password":"<password>"
}
//************************************************************

//Create user
Method: POST
<host_IP>:<host_port>/me/user
Header
Content-Type: application/json
Authorization: Bearer <token>
Body #1
{
	"tipo": <"Pessoa Física">,
	"name": "<user_name>",
	"email": "<e_mail@email.com>",
	"cpf": "<cpf>",
	"password": "<password>",
	"telefone": "<phone_number>",
	"operadora": {
		"nome": "<name>",
		"codigo": <code>,
		"categoria": "<tipe>"
	}
}
Body #2
{
	"tipo": "Pessoa Jurídica",
	"nomeFantasia": "<user_name>",
	"email": "<e_mail@email.com>",
	"cnpj": "<cnpj>",
	"password": "<password>",
	"telefone": "<phone_number>",
	"razaoSocial": "<social_name>",		
	"operadora": {
		"nome": "<name>",
		"codigo": <code>,
		"categoria": "<tipe>"
	}
}
**"operadora":
	{nome: "Oi", codigo: 14, categoria: "Celular"},
	{nome: "Vivo", codigo: 15, categoria: "Celular"},
	{nome: "Tim", codigo: 41, categoria: "Celular"},
	{nome: "GVT", codigo: 25, categoria: "Fixo"},
	{nome: "Embratel", codigo: 21, categoria: "Fixo"}

//************************************************************

//List users
Method: GET
<host_IP>:<host_port>/me/users
Header
Content-Type: application/json
Authorization: Bearer <token>
Body: none
//************************************************************

//Select user
Method: GET
<host_IP>:<host_port>/me/user/<_id>
Authorization: Bearer <token>
Header
Content-Type: application/json
Authorization: Bearer <token>
Body: none
//************************************************************

//Update user
Method: PATCH
<host_IP>:<host_port>/me/user/<_id>
Authorization: Bearer <token>
Header
Content-Type: application/json
Authorization: Bearer <token>
Body #1
{
	"tipo": "Pessoa Física",
	"name": "<name>",
	"cpf": "<cpf>",
	"telefone": "<phone_-_number>",
	"operadora": {
		"nome": "Embratel",
		"codigo": 21,
		"categoria": "Fixo"
	}
}

Body #2
{
	"tipo": "Pessoa Jurídica",
	"name": "<name>",
	"cpf": "<cpf>",
	"telefone": "<phone_-_number>",
	"operadora": {
		"nome": "Embratel",
		"codigo": 21,
		"categoria": "Fixo"
	}
}
//************************************************************

//Delete user
Method: DELETE
<host_IP>:<host_port>/me/user/<_id>
Authorization: Bearer <token>
Header
Content-Type: application/json
Authorization: Bearer <token>
Body: none
//************************************************************

//Filter users
Method: GET
<host_IP>:<host_port>/me/user/filter?name=<search_text>
Params: name:<search_text>
Authorization: Bearer <token>
Header
Content-Type: application/json
Authorization: Bearer <token>
Body: none
//************************************************************