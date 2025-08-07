const React = require("react");
const Layout = require('../layouts/Layout');

function Index(props) {
    const { products } = props;
    const token = props.token;

    return (
        <Layout token={token}>
            <div className="product-grid-wrapper">
                {/* Heading and Add Product button row */}
                <div className="product-grid-header">
                    <h1 className="product-grid-title">View our product collection</h1>
                    <a href={`/products/new?token=${token}`} className="btn btn-primary" id="product-add-btn">
                        + Add New Product
                    </a>
                </div>

                {products.length === 0 ? (
                    <p>No products yet! Add your first products to get started.</p>
                ) : (
                <div className="product-grid">
                    {products.map(product => (
                        <div key={product._id} className="product-card horizontal-card">
                            <div className="product-image-container">
                                <img
                                    src={product.image ? `/uploads/${product.image}` : "/uploads/default-image.jpg"}
                                    alt={product.name}
                                    className="product-image"
                                />
                            </div>

                            <div className="product-info">
                                <h2 className="product-name">{product.name}</h2>
                                <ul className="product-details">
                                    <li><span className="label">Price:</span> {product.price} BD</li>
                                    <li><span className="label">Stock:</span> {product.stock}
                                    {product.stock < 10 && ( <span className="low-stock-alert">Warning: Low stock level!</span> )}</li>
                                    <li><span className="label">Supplier:</span> {product.supplier?.name || 'No Supplier'}</li>
                                    <li><span className="label">Available:</span> {product.available ? "Yes" : "No"}</li>
                                </ul>

                                <div className="product-actions d-flex gap-2 mt-2">
                                    <a
                                        href={`/orders/new?productId=${product._id}&token=${token}`}
                                        className="btn btn-primary"
                                    >
                                        🛒 Order
                                    </a>
                                    <a
                                        href={`/products/${product._id}?token=${token}`}
                                        className="btn btn-secondary"
                                    >
                                        📄 View Details
                                    </a>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                )}
            </div>
        </Layout>
    );
}

module.exports = Index;
