function checkAuth(req, res, next) {
  if (req.session?.AdminID) {
    next()
  } else {
    res.redirect('/')
  }
};

module.exports = checkAuth;
