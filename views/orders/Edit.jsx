const React = require("react");
const Layout = require('../layouts/Layout');

function Edit(props) {
    const { _id, image, productName, supplierName, link, status, date, quantity, total } = props.order;
    const token = props.token;

    return (
        <div>
            <Layout token={token}>
                <h1>✏️ Edit order </h1>
                <a href={`/orders/${_id}`}>Go back to Index Page</a>

                <form action={`/orders/${_id}?_method=PUT&token=${token}`} method="POST">
                <p>
                    Image: <input type="file" name="image" accept="image/*" /><br />
                    {/* Displays current image if available */}
                    {image && <img src={`/uploads/${image}`} alt="Product" style={{ width: '100px' }} />}
                </p>
                <p> Product: <input type="text" name="productName" defaultValue={productName} /><br/></p>
                <p> Supplier: <input type="text" name="supplierName" defaultValue={supplierName} /><br /></p>
                <p> Order link: <input type="text" name="link" defaultValue={link} /><br /></p>
                <p> Status: <input type="text" name="status" defaultValue={status} /><br /> </p>
                <p> Date: <input type="date" name="date" defaultValue={date ? new Date(date).toISOString().split('T')[0] : ''} /><br /></p>
                <p> Quantity: <input type="Number" name="quantity" defaultValue={quantity} /><br /></p>
                <p> Total: <input type="Number" name="total" defaultValue={total} /><br /> </p>

                    <div className="d-flex gap-2">
                        <button type="submit" className="btn btn-primary">
                            💾 Update Order
                        </button>
                        <a href={`/orders/${_id}?token=${token}`} className="btn btn-secondary">
                            ← Back to orders
                        </a>
                    </div>
                </form>
            </Layout>
        </div>
    );
}

module.exports = Edit;