function checkAuth(req, res, next) {
  if (req.session?.AdminID) {
    next()
  } else {
    res.redirect('/admin')
  }
};

module.exports = checkAuth;
