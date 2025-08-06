const React = require("react");
const Layout = require("../layouts/Layout");

function New(props) {
  const {
    token,
    productId = "",
    productName = "",
    productImage = "",
    productPrice = "",
    supplierName = "",
  } = props;

  return (
    <Layout token={token}>
      <div className="new-product-container">
        <h1>New Order</h1>

        <form
          action={`/orders?token=${token}`}
          method="POST"
          encType="multipart/form-data"
          className="new-product-form"
        >
          {productImage && (
            <label>
              Product Image:
              <img
                src={`/uploads/${productImage}`}
                alt="Selected"
                style={{ width: '150px', marginTop: '0.5rem', borderRadius: '5px' }}
              />
              <input type="hidden" name="image" value={productImage} />
            </label>
          )}

          <label>
            Product:
            <input
              type="text"
              name="productName"
              value={productName}
              readOnly
              required
            />
            <input type="hidden" name="productId" value={productId} />
          </label>

          <label>
            Supplier Name:
            <input
              type="text"
              name="supplierName"
              value={supplierName}
              readOnly
              required
            />
          </label>

          <label>
            Link:
            <input type="text" name="link" required />
          </label>

          <label>
            Status:
            <select name="status" required>
              <option value="">-- Select Status --</option>
              <option value="Preparing">Preparing</option>
              <option value="Shipped">Shipped</option>
              <option value="Delivered">Delivered</option>
              <option value="Received">Received</option>
            </select>
          </label>

          <label>
            Date:
            <input type="date" name="date" required />
          </label>

          <label>
            Quantity:
            <input type="number" name="quantity" required />
          </label>

          <div className="form-buttons">
            <button type="submit" className="btn btn-primary">
              ➕ Add Order
            </button>
            <a href={`/orders?token=${token}`} className="btn btn-secondary">
              ← Back to Orders
            </a>
          </div>
        </form>
      </div>
    </Layout>
  );
}

module.exports = New;
