const Supplier = require('../../models/supplier'); 
const RESOURCE_PATH = '/products';

const productViews = {
    signUp(req, res, next) {
        res.render('/auth/SignUp');
    },

    signIn(req, res, next) {
        res.render('/auth/SignIn');
    },

    // Render the list of all products
    index(req, res, next) {
        res.render("products/Index", res.locals.data); 
    },

    // Render the page for creating a new product WITH supplier list
    async newView(req, res, next) {
        try {
            const suppliers = await Supplier.find({}, 'name'); // fetch supplier names only
            res.render("products/New", {
                ...res.locals.data,
                suppliers,
                token: req.query.token || req.headers.authorization?.split(" ")[1]
            });
        } catch (error) {
            res.status(400).send({ message: error.message });
        }
    },

    // Render the page to edit a product
    edit(req, res, next) {
        res.render("products/Edit", res.locals.data);
    },

    // Render the page to show product details
    show(req, res, next) {
        res.render("products/Show", res.locals.data);
    },

    // Redirect to product list after create/delete
    redirectHome(req, res, next) {
        if (res.locals.data.token) {
            res.redirect(`${RESOURCE_PATH}?token=${res.locals.data.token}`);
        } else {
            res.redirect(RESOURCE_PATH);
        }
    },

    // Redirect to show page after update
    redirectShow(req, res, next) {
        if (res.locals.data.token) {
            res.redirect(`${RESOURCE_PATH}/${req.params.id}?token=${res.locals.data.token}`);
        } else {
            res.redirect(`${RESOURCE_PATH}/${req.params.id}`);
        }
    }
};

module.exports = productViews;
