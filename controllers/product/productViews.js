const productViews = {
    index(req, res, next) {
        res.render("products/Index", res.locals.data); // Corrected path (no ./)
    },
    newView(req, res, next) {
        res.render("products/New", res.locals.data); // Corrected path (no ./)
    },
    edit(req, res, next) {
        res.render("products/Edit", res.locals.data); // Corrected path (no ./)
    },
    show(req, res, next) {
        res.render("products/Show", res.locals.data); // Corrected path (no ./)
    },
    redirectHome(req, res, next) {
        res.redirect("/products");
    },
    redirectShow(req, res, next) {
        res.redirect(`/products/${req.params.id}`);
    }
};

module.exports = productViews;