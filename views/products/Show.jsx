const React = require("react");
const Layout = require('../layouts/Layout')

function Show(props) {
    const { _id, name, price, stock, supplier, available, image } = props.product;
    const token = props.token; 

    return (
        <Layout token={props.token}>
        <div>
            <h1>{props.product.name} Details</h1>
            {/* Displays the product image if available */}
            <p><strong>Image:</strong></p>
            {image ? (
                <img src={`/uploads/${image}`} alt={name} style={{ width: '200px', height: 'auto' }} />
            ) : (
                <img src="/uploads/default-image.jpg" alt="Default" style={{ width: '200px', height: 'auto' }} />
            )}

            <p><strong>Name:</strong> {name}</p>
            <p><strong>Price:</strong> {price}</p>
            <p><strong>Stock:</strong> {stock}</p>
            <p><strong>Supplier:</strong> {supplier?.name || 'No Supplier'}</p>
            <p><strong>Available:</strong> {available ? "Yes" : "No"}</p>

            <br />

            <div className="d-flex gap-2">
                    <a href={`/products?token=${props.token}`} className="btn btn-secondary">
                        ← 📃 All Products
                    </a>
                    <a href={`/products/${_id}/edit?token=${token}`} className="btn btn-primary">
                        ✏️ Edit Product
                    </a>
                   <form action={`/products/${_id}?_method=DELETE&token=${token}`} method="POST">
                        <button type="submit" className="btn btn-primary">
                        🗑️ Delete Product
                        </button>
                    </form>
                </div>
        </div>
        </Layout>
    )
}

module.exports = Show;