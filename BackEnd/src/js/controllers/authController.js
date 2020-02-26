const express = require("express");
const User = require("../../models/User");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const authConfig = require("../../config/auth.json");

function generateToken(params = {}) {
  return jwt.sign(params, authConfig.secret, {
    expiresIn: 300 //5 minutos
  }); 
}

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email }).select("+password");

  if (!user)
    return res.status(400).send({ error: "E-mail ou senha inválidos." });

  if (!(await bcrypt.compare(password, user.password)))
    return res.status(400).send({ error: "E-mail ou senha inválidos." });

  user.password = undefined;

  res.send({ user, token: generateToken({ id: user.id, email: user.email, senha: user.password }) });
});

//recebe o parâmetro app
//coloca o auth como prefixo em todas as rotas daqui
module.exports = app => app.use("/auth", router);
