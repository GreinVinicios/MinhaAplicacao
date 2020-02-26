//Controller para conexão com o banco de dados
const mongoose = require("mongoose");
const uri =
  "mongodb+srv://dbUser:y3v1TtoMK5Z81fiD@cluster0-qtz8m.mongodb.net/MyApp?retryWrites=true&w=majority";

mongoose.connect(uri, { useNewUrlParser: true });

mongoose.Promise = global.Promise;

module.exports = mongoose;
