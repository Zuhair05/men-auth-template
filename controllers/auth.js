const home = (req, res) => {
  res.send('Welcome to the Home Page');
}

const showSignup = (req, res) => {
  res.render('auth/sign-up.ejs');
};

module.exports = {
  home,
  showSignup,
};