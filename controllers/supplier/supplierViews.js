const RESOURCE_PATH = '/suppliers'
const supplierViews = {
    signUp(req, res, next){
        res.render('/auth/SignUp')
    },
    signIn(req, res, next){
        res.render('/auth/SignIn')
    },
    // Render the list of all suppliers
    index(req, res, next) {
        res.render("suppliers/Index", res.locals.data); // Render the suppliers list page
    },

    // Render the page for creating a new product
    newView(req, res, next) {
        res.render("suppliers/New", res.locals.data); // Render the new suppliers form
    },

    // Render the page to edit a product
    edit(req, res, next) {
        res.render("suppliers/Edit", res.locals.data); // Render the edit suppliers form
    },

    // Render the page to show product details
    show(req, res, next) {
        res.render("suppliers/Show", res.locals.data); // Render the suppliers details page
    },

    // Redirect to the suppliers list page after an action (e.g., after creating a suppliers)
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

module.exports = supplierViews;
