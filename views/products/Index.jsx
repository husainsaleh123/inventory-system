const React = require("react");

function Index(props) {
    const products = props.products;
    return (
        <div>
            <h1>Products Page</h1>
            <a href="/products/new">Add New Product</a>

            <ul>
                {products.map(product => {
                    return (
                        <li key={product._id}>
                        {/* Display product image if available */}
                        {product.image ? (
                            <img src={`/uploads/${product.image}`} alt={product.name} style={{ width: '100px', height: 'auto' }} />
                        ) : (
                            <img src="/uploads/default-image.jpg" alt="Default" style={{ width: '100px', height: 'auto' }} />
                        )}

                            <a href={`/products/${product._id}`}>
                                <h3>{product.name}</h3>
                            </a>
                            <p>Price: {product.price}</p>
                            <p>Unit: {product.unit}</p>
                            <p>Stock: {product.stock}</p>
                            <p>Supplier: {product.supplier}</p>
                            <p>Country: {product.country}</p>
                            <p>Available: {product.available ? "Is available" : "Is not available"}</p>
                        </li>
                    );
                })}
            </ul>
        </div>
    );
}

module.exports = Index;
