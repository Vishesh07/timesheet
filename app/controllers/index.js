exports.render = function (req, res) {
  res.render("index", {
        title : "Hello",
        user : JSON.stringify(req.user)
    }
    )
};
