const React = require("react");
const Layout = require("../layouts/Layout");

function Edit(props) {
  const { _id, image, productName, supplierName, link, status, date, quantity, total } = props.order;
  const token = props.token;

  return (
    <Layout token={token}>
      <div className="new-product-container">
        <h1>✏️ Edit Order</h1>

        <form
          action={`/orders/${_id}?_method=PUT&token=${token}`}
          method="POST"
          encType="multipart/form-data"
          className="new-product-form"
        >
          {/* Image Preview */}
          {image && (
            <label>
              Product Image:
              <img
                src={`/uploads/${image}`}
                alt="Product"
                style={{ width: '120px', marginTop: '0.5rem', borderRadius: '5px' }}
              />
            </label>
          )}

          {/* Product Name (read-only) */}
          <label>
            Product:
            <input type="text" name="productName" value={productName} readOnly required />
          </label>

          {/* Supplier Name (read-only) */}
          <label>
            Supplier:
            <input type="text" name="supplierName" value={supplierName} readOnly required />
          </label>

          {/* Order Link */}
          <label>
            Order Link:
            <input type="text" name="link" defaultValue={link} required />
          </label>

          {/* Status */}
          <label>
            Status:
            <select name="status" defaultValue={status} required>
              <option value="">-- Select Status --</option>
              <option value="Preparing">Preparing</option>
              <option value="Shipped">Shipped</option>
              <option value="Delivered">Delivered</option>
              <option value="Received">Received</option>
            </select>
          </label>

          {/* Date */}
          <label>
            Date:
            <input
              type="date"
              name="date"
              defaultValue={date ? new Date(date).toISOString().split("T")[0] : ""}
              required
            />
          </label>

          {/* Quantity */}
          <label>
            Quantity:
            <input type="number" name="quantity" defaultValue={quantity} required />
          </label>

          {/* Total (read-only) */}
          <label>
            Total:
            <input type="number" name="total" value={total} readOnly />
          </label>

          {/* Buttons */}
          <div className="form-buttons">
            <button type="submit" className="btn btn-primary">💾 Update Order</button>
            <a href={`/orders?token=${token}`} className="btn btn-secondary">← All Orders</a>
          </div>
        </form>
      </div>
    </Layout>
  );
}

module.exports = Edit;
