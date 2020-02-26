//Modelo para collection 'user'
const mongoose = require("../js/database.js");

//pacote para deixar a senha em formato hash
const bcrypt = require('bcryptjs');

//definição dos campos da 'user'
const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    require: true
  },
  telefone: {
    type: String    
  },
  operadora: {
    type: Object
  },
  cpf: {
    type: String
  },
  nomeFantasia: {
    type: String
  },
  cnpj: {
    type: String
  },
  razaoSocial: {
    type: String
  },
  tipo: {
    type: String
  },
  email: {
    type: String,
    unique: true, //deverá ser único
    require: true,
    lowercase: true
  },
  password: {
    type: String,
    require: true,
    select: false //não retornar na listagem
  },
  dataCriacao: {
    type: Date,
    default: Date.now() //data da criação
  }
});

//antes de salvar, deixa a senha como hash
UserSchema.pre('save', async function(next){
  const hash = await bcrypt.hash(this.password, 10); //10 =nºde vezes feito o hash
  this.password = hash;

  next();
})

const User = mongoose.model("User", UserSchema);

module.exports = User;
