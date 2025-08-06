const RESOURCE_PATH = '/orders'
const orderViews = {
    signUp(req, res, next){
        res.render('/auth/SignUp')
    },
    signIn(req, res, next){
        res.render('/auth/SignIn')
    },
    // Render the list of all orders
    index(req, res, next) {
        res.render("orders/Index", res.locals.data); // Render the orders list page
    },

    // Render the page for creating a new product
    newView(req, res, next) {
        res.render("orders/New", res.locals.data); // Render the new orders form
    },

    // Render the page to edit a product
    edit(req, res, next) {
        res.render("orders/Edit", res.locals.data); // Render the edit orders form
    },

    // Render the page to show product details
    show(req, res, next) {
        res.render("orders/Show", res.locals.data); // Render the orders details page
    },

    // Redirect to the orders list page after an action (e.g., after creating a orders)
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

module.exports = orderViews;
