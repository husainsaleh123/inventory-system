const productViews = {
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
    redirectHome(req, res, next) {
        res.redirect("/products"); // Redirect to the product list page
    },

    // Redirect to the product details page after an action (e.g., after editing a product)
    redirectShow(req, res, next) {
        res.redirect(`/products/${req.params.id}`); // Redirect to the individual product details page
    }
};

module.exports = productViews;
