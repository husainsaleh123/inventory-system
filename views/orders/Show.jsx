const React = require("react");
const Layout = require("../layouts/Layout");

function Show(props) {
  const { _id, image, productName, supplierName, link, status, date, quantity, total } = props.order;
  const token = props.token;

  return (
    <Layout token={token}>
      <div className="new-product-container">
        <h1>📦 {productName} Order Details</h1>

        <div style={{ marginBottom: "1.5rem" }}>
          <p><strong>Product Image:</strong></p>
          <img
            src={image ? `/uploads/${image}` : "/uploads/default-image.jpg"}
            alt={productName}
            style={{
              width: '200px',
              height: 'auto',
              borderRadius: '8px',
              boxShadow: '0 0 8px rgba(0,0,0,0.1)'
            }}
          />
        </div>

        <ul className="product-details">
          <li><span className="label">Product:</span> {productName}</li>
          <li><span className="label">Supplier:</span> {supplierName}</li>
          <li><span className="label">Link:</span> {link}</li>
          <li><span className="label">Status:</span> {status}</li>
          <li><span className="label">Date:</span> {new Date(date).toLocaleDateString()}</li>
          <li><span className="label">Quantity:</span> {quantity}</li>
          <li><span className="label">Total:</span> {total} BD</li>
        </ul>

        <div className="form-buttons">
          <a href={`/orders?token=${token}`} className="btn btn-secondary">
            ← 📃 All Orders
          </a>
          <a href={`/orders/${_id}/edit?token=${token}`} className="btn btn-primary">
            ✏️ Edit Order
          </a>
          <form
            action={`/orders/${_id}?_method=DELETE&token=${token}`}
            method="POST"
            style={{ display: "inline" }}
          >
            <button type="submit" className="btn btn-danger">
              🗑️ Delete Order
            </button>
          </form>
        </div>
      </div>
    </Layout>
  );
}

module.exports = Show;
