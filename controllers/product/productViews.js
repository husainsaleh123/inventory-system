const RESOURCE_PATH = '/products'
const productViews = {
    signUp(req, res, next){
        res.render('/auth/SignUp')
    },
    signIn(req, res, next){
        res.render('/auth/SignIn')
    },
    // Render the list of all products
    index(req, res, next) {
        res.render("products/Index", res.locals.data); // Render the product list page
    },

    // Render the page for creating a new product
    newView(req, res, next) {
        res.render("products/New", res.locals.data); // Render the new product form
    },

    // Render the page to edit a product
    edit(req, res, next) {
        res.render("products/Edit", res.locals.data); // Render the edit product form
    },

    // Render the page to show product details
    show(req, res, next) {
        res.render("products/Show", res.locals.data); // Render the product details page
    },

    // Redirect to the product list page after an action (e.g., after creating a product)
    redirectHome(req, res, next){
        if(res.locals.data.token){
        res.redirect(`${RESOURCE_PATH}?token=${res.locals.data.token}`)
        }else {
        res.redirect(RESOURCE_PATH)
        } 
    },

    // Redirect to the product details page after an action (e.g., after editing a product)
    redirectShow(req, res, next){
        if(res.locals.data.token){
        res.redirect(`${RESOURCE_PATH}/${req.params.id}?token=${res.locals.data.token}`)
        }else {
        res.redirect(`${RESOURCE_PATH}/${req.params.id}`)
        } 
    }
};

module.exports = productViews;
