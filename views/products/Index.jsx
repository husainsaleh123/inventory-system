const React = require("react");
const Layout = require("../layouts/Layout"); // make sure this import is correct!

function Index(props) {
    const products = props.products || [];
    const token = props.token;

    return (
        <Layout>
            <div>
                <h1>Products Page</h1>
                <a href={`/products/new?token=${token}`}>Add New Product</a>

                {products.length === 0 ? (
                    <p>No products yet! Add your first product to get started.</p>
                ) : (
                    <ul>
                        {products.map(product => (
                            <li key={product._id}>
                                {/* Display product image if available */}
                                {product.image ? (
                                    <img
                                        src={`/uploads/${product.image}`}
                                        alt={product.name}
                                        style={{ width: '100px', height: 'auto' }}
                                    />
                                ) : (
                                    <img
                                        src="/uploads/default-image.jpg"
                                        alt="Default"
                                        style={{ width: '100px', height: 'auto' }}
                                    />
                                )}

                                <a href={`/products/${product._id}?token=${token}`}>
                                    <h3>{product.name}</h3>
                                </a>
                                <p>Price: {product.price}</p>
                                <p>Unit: {product.unit}</p>
                                <p>Stock: {product.stock}</p>
                                <p>Supplier: {product.supplier}</p>
                                <p>Country: {product.country}</p>
                                <p>Available: {product.available ? "Is available" : "Is not available"}</p>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </Layout>
    );
}

module.exports = Index;
