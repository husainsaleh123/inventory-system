const React = require("react");
const Layout = require("../layouts/Layout"); // make sure this import is correct!

function New(props) {
    // Access data passed via props (from the controller)
    const {productName = "", supplierName = "", link = "", status = "", date = "", quantity = "", total = ""} = props;
    const token = props.token;
    
    return (
        <Layout token={props.token}>
        <div>
            <h1>New Order</h1>
            <a href={`/orders?token=${props.token}`}>Go back to Index Page</a>
            <form action={`/orders?token=${props.token}`} method="POST">
                    <p>Product: <input type="text" name="productName" defaultValue={productName} required /></p>
                    <p>Supplier: <input type="text" name="supplierName" defaultValue={supplierName} required /></p>
                    <p>Link: <input type="text" name="link" defaultValue={link} required /></p>
                    <p>Status: <input type="text" name="status" defaultValue={status} required /></p>
                    <p> Date: <input type="date" name="date" defaultValue={date ? new Date(date).toISOString().split('T')[0] : ''} required /><br /></p>
                    <p>Quantity: <input type="number" name="quantity" defaultValue={quantity} required /></p>
                    <p>Total: <input type="number" name="total" defaultValue={total} required /></p>

               
                <div className="d-flex gap-2">
                    <button type="submit" className="btn btn-primary">
                        ➕ Add order
                    </button>
                    <a href={`/orders?token=${token}`} className="btn btn-secondary">
                        ← Back to All orders
                    </a>
                </div>
                

                {/* <input type="submit" value="Add order" /> */}
            </form>
        </div>
        </Layout>
    )
}

module.exports = New;
