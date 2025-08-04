const viewController = {
  // Render the SignUp page
  signUp(req, res, next) {
    res.render('auth/SignUp');  // Renders the SignUp view
  },

  // Render the SignIn page
  signIn(req, res, next) {
    res.render('auth/SignIn');  // Renders the SignIn view
  },

  // API Auth route, sends back user data and token (useful for APIs)
  apiAuth(req, res, next) {
    res.json({ user: req.user, token: res.locals.data.token });  // Sends user and token as JSON
  },

  // Redirect to login page after successful sign up
  redirectToLogin(req, res, next) {
    res.redirect('/users/login');  // After successful signup, redirect to login
  },

  // Optional: Redirect to the homepage or dashboard if logged in
  redirectHome(req, res, next) {
    res.redirect('/products');  // Redirect to the products page or homepage after login
  }
};

module.exports = viewController;
