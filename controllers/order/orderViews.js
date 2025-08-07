const Product = require('../../models/product');
const Supplier = require('../../models/supplier');

const RESOURCE_PATH = '/orders';

const orderViews = {
    signUp(req, res, next) {
        res.render('/auth/SignUp');
    },

    signIn(req, res, next) {
        res.render('/auth/SignIn');
    },

    // Render the list of all orders
    index(req, res, next) {
        res.render("orders/Index", res.locals.data);
    },

    // Updated: Renders the page for creating a new order, and passes product/supplier info if productId is provided
    async newView(req, res, next) {
        const token = req.query.token;
        let productData = {};

        if (req.query.productId) {
            try {
                const product = await Product.findById(req.query.productId).populate('supplier');
                if (product) {
                    productData = {
                        productId: product._id,
                        productName: product.name,
                        productImage: product.image,
                        productPrice: product.price,
                        supplierName: product.supplier?.name || ""
                    };
                }
            } catch (error) {
                console.error("Error fetching product info:", error.message);
            }
        }

        res.render("orders/New", {
            ...res.locals.data,
            token,
            ...productData
        });
    },

    // Render the page to edit a product
    edit(req, res, next) {
        res.render("orders/Edit", res.locals.data);
    },

    // Render the page to show product details
    show(req, res, next) {
        res.render("orders/Show", res.locals.data);
    },

    // Redirect to the orders list page after an action
    redirectHome(req, res, next) {
        if (res.locals.data.token) {
            res.redirect(`${RESOURCE_PATH}?token=${res.locals.data.token}`);
        } else {
            res.redirect(RESOURCE_PATH);
        }
    },

    // Redirect to the order details page after an action
    redirectShow(req, res, next) {
        if (res.locals.data.token) {
            res.redirect(`${RESOURCE_PATH}/${req.params.id}?token=${res.locals.data.token}`);
        } else {
            res.redirect(`${RESOURCE_PATH}/${req.params.id}`);
        }
    }
};

module.exports = orderViews;
