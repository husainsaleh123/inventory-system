const React = require("react");
const Layout = require("../layouts/Layout");

function Index(props) {
    const orders = props.orders || [];
    const token = props.token;

    return (
        <Layout token={token}>
            <div className="product-grid-wrapper">
                <div className="product-grid-header">
                    <h1 className="product-grid-title">All Orders</h1>
                    {/* Add Order button (optional for future) */}
                    {/* <a href={`/orders/new?token=${token}`} className="btn btn-primary">
                        ➕ Add New Order
                    </a> */}
                </div>

                {orders.length === 0 ? (
                    <p>No orders yet! Add your first order to get started.</p>
                ) : (
                    <div className="product-grid">
                        {orders.map((order) => (
                            <div key={order._id} className="product-card horizontal-card">
                                <div className="product-image-container">
                                    <img
                                        src={order.image ? `/uploads/${order.image}` : "/uploads/default-image.jpg"}
                                        alt={order.productName}
                                        className="product-image"
                                    />
                                </div>

                                <div className="product-info">
                                    <h2 className="product-name">{order.productName} Order</h2>
                                    <ul className="product-details">
                                        <li><span className="label">Product:</span> {order.productName}</li>
                                        <li><span className="label">Supplier:</span> {order.supplierName}</li>
                                        <li><span className="label">Link:</span> {order.link}</li>
                                        <li><span className="label">Status:</span> {order.status}</li>
                                        <li><span className="label">Date:</span> {new Date(order.date).toLocaleDateString()}</li>
                                        <li><span className="label">Quantity:</span> {order.quantity}</li>
                                        <li><span className="label">Total:</span> {order.total} BD</li>
                                    </ul>

                                    <div className="product-actions d-flex gap-2 mt-2">
                                        <a href={`/orders/${order._id}?token=${token}`} className="btn btn-secondary">
                                            👁️ View
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
