const React = require("react");
const Layout = require("../layouts/Layout");

function Index(props) {
    const orders = props.orders || [];
    const token = props.token;

    return (
        <Layout token={token}>
            <div>
                <h1 style={{ textAlign: 'center', color: 'seagreen' }}>All orders</h1>

                <div className="d-flex justify-content-between align-items-center mb-3">
                    <h2>Your order Collection</h2>
                    <a href={`/orders/new?token=${token}`} className="btn btn-success">
                        ➕ Add New order
                    </a>
                </div>

                {orders.length === 0 ? (
                    <p>No orders yet! Add your first order to get started.</p>
                ) : (
                    <ul className="order-list">
                        {orders.map((order) => (
                            <li key={order._id} className="order-item">

                                {/* Order Info */}
                                <div>
                                    <a href={`/orders/${order._id}?token=${token}`}>
                                        <h3>Order details</h3>
                                    </a>
                                    <p><strong>Product:</strong> {order.productName}</p>
                                    <p><strong>Supplier:</strong> {order.supplierName}</p>
                                    <p><strong>Link:</strong> {order.link}</p>
                                    <p><strong>Status:</strong> {order.status}</p>
                                    <p><strong>Date:</strong> {new Date(order.date).toLocaleDateString()}</p>
                                    <p><strong>Quantity:</strong> {order.quantity}</p>
                                    <p><strong>Total:</strong> {order.total}</p>
                                </div>

                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </Layout>
    );
}

module.exports = Index;
