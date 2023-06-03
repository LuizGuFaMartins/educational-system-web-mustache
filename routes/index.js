var express = require("express");
var Users = require("../model/Users");
var router = express.Router();

router.get("/", function (req, res) {
  res.render("home", {
    logoPath: "/images/logo-horizontal-removebg-preview.png",
  });
});

router.get("/novo", function (req, res) {
  res.render("new-user", {});
});

router.post("/create", function (req, res) {
  Users.new({
    ...req.body,
  });

  res.redirect("/");
});

router.post("/login", function (req, res) {
  const { email, senha } = req.body;
  let user = Users.getElementByEmail(email);
  if (user && senha === user.senha) {
    console.log("\n\nUSER: ", user);

    req.session.isUserLogged = true;
    res.cookie("nome", user.nome, { expires: new Date(Date.now() + 10000) });
    res.redirect("/books");
  } else {
    res.render("error", {
      message: "ERROR - 400 - BAD REQUEST",
      error: {
        stack:
          "Erro: O usuário informado não existe em nossa base de dados. Por favor verifique se as credenciais digitadas estão corretas ou crie uma nova conta.",
      },
    });
  }
});

router.get("/intranet", function (req, res, next) {
  if (req.session.isUserLogged) {
    res.render("logged", { nome: req.cookies.nome });
  } else {
    res.render("error", {
      message: "ERROR - 401 - UNAUTHORIZED",
      error: {
        stack: "Erro: Você não tem permissão para acessar essa página.",
      },
    });
  }
});

router.get("/loggout", function (req, res, next) {
  req.session.isUserLogged = false;
  res.redirect("/");
});

module.exports = router;
