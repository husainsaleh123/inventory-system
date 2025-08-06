const React = require("react");
const Layout = require('../layouts/Layout')

function Show(props) {
    const { _id, name, price, stock, supplier, available, image } = props.product;
    const token = props.token; 

    return (
        <Layout token={token}>
            <div className="show-product-card">
                <div className="show-product-image-container">
                    <img
                        src={image ? `/uploads/${image}` : "/uploads/default-image.jpg"}
                        alt={name}
                        className="show-product-image"
                    />
                </div>

                <div className="show-product-info">
                    <h2 className="show-product-name">{name}</h2>
                    <ul className="show-product-details">
                        <li><span className="label">Price:</span> {price} BD</li>
                        <li><span className="label">Stock:</span> {stock}</li>
                        <li><span className="label">Supplier:</span> {supplier?.name || 'No Supplier'}</li>
                        <li><span className="label">Available:</span> {available ? "Yes" : "No"}</li>
                    </ul>
                </div>

                {/* Buttons container placed below image and details */}
                <div className="show-product-buttons">
                    <a href={`/products?token=${token}`} className="btn btn-secondary">
                        ← 📃 All Products
                    </a>
                    <a href={`/products/${_id}/edit?token=${token}`} className="btn btn-primary">
                        ✏️ Edit Product
                    </a>
                    <form action={`/products/${_id}?_method=DELETE&token=${token}`} method="POST">
                        <button type="submit" className="btn btn-danger">
                            🗑️ Delete Product
                        </button>
                    </form>
                </div>
            </div>
        </Layout>
    )
}

module.exports = Show;
