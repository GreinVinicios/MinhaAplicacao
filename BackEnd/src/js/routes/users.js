const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/auth.js");
const User = require("../../models/User");

router.use(authMiddleware);
router.get("/", (req, res) => {
  res.send(req.userId);
});

//Filtra usuário
router.get("/user/filter", async (req, res) => { 
  const user = await User.find( { name: new RegExp('^' + req.query.name, 'i')}, function(err, document) {
    if (err)
      return res.status(400).send({ error: "Falha na localização do registro" });
  });
  res.send({ user });
});

//Rota para criação de usuário
router.post("/user", async (req, res) => {
  const { email } = req.body;
  try {
    //Validação do e-mail repetido
    if (await User.findOne({ email }))
      return res.status(400).send({ error: "Este e-mail já está cadastrado" });

    const user = await User.create(req.body);

    //retira o password do retorno
    user.password = undefined;

    res.send({ user });
  } catch (err) {
    return res.status(400).send({ error: "Falha ao gravar usuário" });
  }
});

//Lista de usuarios
router.get("/users", async (req, res) => {
  const user = await User.find(); //.limit(10);
  res.send({ user });
});

//Detalhe do usuário
router.get("/user/:user_id", async (req, res) => {
  const id = req.params.user_id;
  const user = await User.findOne({_id: id});
  res.send({ user });
});

//Editar o usuário
router.patch("/user/:user_id", async (req, res) => {
  const { email } = req.body;
  if (await User.findOne({ email }))
      return res.status(400).send({ error: "Este e-mail já está cadastrado" });

  await User.findOneAndUpdate(
    { _id: req.params.user_id },
    { $set: req.body },
    { new: true }
  )
    .then(docs => {
      if (!docs)
        return res.status(400).send({ error: "Falha ao gravar a alteração no usuário" });
    })
    .catch(err => {
      return res.status(400).send({ error: err });
    });

  const { id } = req.params.user_id;
  const user = await User.findOne(id);
  res.send({ user });
});

//Deleta usuário
router.delete("/user/:user_id", async (req, res) => {
  const del = await User.findByIdAndRemove(
    req.params.user_id,
    (err, result) => {
      if (err) return res.send(500, err);
    }
  );

  const user = await User.find(); //.limit(10);
  res.send({ user });
});

module.exports = app => app.use("/me", router);