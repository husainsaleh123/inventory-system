const React = require("react");
const Layout = require('../layouts/Layout')

function Show(props) {
    // Destructure the order data passed from the server
    const { _id, image, productName, supplierName, link, status, date, quantity, total } = props.order;
    const token = props.token;
    
    return (
        <Layout token={props.token}>
        <div>
            <h1>Order Details</h1>
                {/* Displays the product image if available */}
                <p><strong>Image:</strong></p>
                {image ? (
                    <img src={`/uploads/${image}`} alt={productName} style={{ width: '200px', height: 'auto' }} />
                ) : (
                    <img src="/uploads/default-image.jpg" alt="Default" style={{ width: '200px', height: 'auto' }} />
                )}
                <p><strong>Product:</strong> {productName}</p>
                <p><strong>Supplier:</strong> {supplierName}</p>
                <p><strong>Link:</strong> {link}</p>
                <p><strong>Status:</strong> {status}</p>
               <p><strong>Date:</strong> {new Date(date).toLocaleDateString()}</p>
                <p><strong>Quantity:</strong> {quantity}</p>
                <p><strong>Total:</strong> {total}</p>
            <br />

            <div className="d-flex gap-2">
                    <a href={`/orders?token=${props.token}`} className="btn btn-secondary">
                        ← 📃 All orders
                    </a>
                    <a href={`/orders/${_id}/edit?token=${token}`} className="btn btn-primary">
                        ✏️ Edit order
                    </a>
                   <form action={`/orders/${_id}?_method=DELETE&token=${token}`} method="POST">
                        <button type="submit" className="btn btn-primary">
                        🗑️ Delete order
                        </button>
                    </form>
                </div>
        </div>
        </Layout>
    )
}

module.exports = Show;
