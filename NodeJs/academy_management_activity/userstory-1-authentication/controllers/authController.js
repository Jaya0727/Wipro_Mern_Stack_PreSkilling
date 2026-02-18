exports.login = async (req, res) => {
  const user = await User.findOne({ where: req.body });
  if (!user) return res.send("Invalid Credentials");
  req.session.user = user;
  res.redirect("/dashboard");
};
