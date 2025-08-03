
const supplierViews = {
    index(req, res, next) {
        res.render("suppliers/Index", res.locals.data); // Render all suppliers
    },
    newView(req, res, next) {
        res.render("suppliers/New", res.locals.data);  // Render the New supplier form
    },
    edit(req, res, next) {
        res.render("suppliers/Edit", res.locals.data);  // Render the Edit supplier form
    },
    show(req, res, next) {
        res.render("suppliers/Show", res.locals.data);  // Render the Show supplier page
    },
    redirectHome(req, res, next) {
        res.redirect("/suppliers");  // Redirect to the supplier index page after action
    },
    redirectShow(req, res, next) {
        res.redirect(`/suppliers/${req.params.id}`);  // Redirect to the Show supplier page after update
    }
};

module.exports = supplierViews;

