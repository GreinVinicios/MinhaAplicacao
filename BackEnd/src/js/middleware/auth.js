const authContig = require("../../config/auth.json");
const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  //const authHeader = req.headers.authorization;
  
  //var authHeader = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVlNGM2YmY4NWI3MWJjMTBhMGZiZTRkNSIsImlhdCI6MTU4MjU4NDI5MywiZXhwIjoxNTgyNjc0MjkzfQ.2oprf3va05Pe2Rhg3dQ3DhLUQiDhgmpOoKN_SlIWov4'
  var vtoken = req.headers.authorization;
  
  if (vtoken == undefined) {
	  return next();
  }
  else {  
	  authHeader = vtoken;
	  const parts = authHeader.split(" ");
	  const [scheme, token] = parts;
	  //Validação inicial do token
	  if (!authHeader)
		return res
		  .status(403)
		  .send({ error: "O token de acesso não foi informado." });

	  //validação efetiva do token
	  jwt.verify(token, authContig.secret, (err, decoded) => {
		if (err) return res.status(403).send({ error: "Sessão expirada. Efetue o login novamente." });    

		req.userId = decoded.id;    //aqui recupera de dentro do token o id e outros dados incluídos na criação do mesmo

		return next();
	  });
  }
};
