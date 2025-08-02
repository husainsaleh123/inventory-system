const productViews = {
    index(req, res, next) {
        res.render("products/Index", res.locals.data); // Render all products
    },
    newView(req, res, next) {
        res.render("products/New", res.locals.data);  // Render the New product form
    },
    edit(req, res, next) {
        res.render("products/Edit", res.locals.data);  // Render the Edit product form
    },
    show(req, res, next) {
        res.render("products/Show", res.locals.data);  // Render the Show product page
    },
    redirectHome(req, res, next) {
        res.redirect("/products");  // Redirect to the products index page after action
    },
    redirectShow(req, res, next) {
        res.redirect(`/products/${req.params.id}`);  // Redirect to the Show product page after update
    }
};

module.exports = productViews;
