const React = require("react");
const Layout = require('../layouts/Layout');

function Edit(props) {
  const { _id, image, productName, supplierName, link, status, date, quantity, total } = props.order;
  const token = props.token;

  return (
    <Layout token={token}>
      <div>
        <h1>✏️ Edit Order</h1>

        <form action={`/orders/${_id}?_method=PUT&token=${token}`} method="POST" encType="multipart/form-data">
          {/* Image */}
          <p>
            <strong>Image:</strong><br />
            {image && (
              <div>
                <img src={`/uploads/${image}`} alt="Product" style={{ width: '100px', marginTop: '10px' }} />
              </div>
            )}
          </p>

          {/* Product Name (readonly) */}
          <p>
            <strong>Product:</strong><br />
            <input type="text" name="productName" value={productName} readOnly className="form-control" />
          </p>

          {/* Supplier Name (readonly) */}
          <p>
            <strong>Supplier:</strong><br />
            <input type="text" name="supplierName" value={supplierName} readOnly className="form-control" />
          </p>

          {/* Order Link */}
          <p>
            <strong>Order Link:</strong><br />
            <input type="text" name="link" defaultValue={link} required className="form-control" />
          </p>

`        {/* Status */}
         <p>
            <strong>Status:</strong><br />
            <select name="status" required className="form-control" defaultValue={status}>
            <option value="">-- Select Status --</option>
            <option value="Preparing">Preparing</option>
            <option value="Shipped">Shipped</option>
            <option value="Delivered">Delivered</option>
            <option value="Received">Received</option>
        </select>
        </p>

          {/* Date */}
          <p>
            <strong>Date:</strong><br />
            <input
              type="date"
              name="date"
              defaultValue={date ? new Date(date).toISOString().split('T')[0] : ''}
              required
              className="form-control"
            />
          </p>

          {/* Quantity */}
          <p>
            <strong>Quantity:</strong><br />
            <input type="number" name="quantity" defaultValue={quantity} required className="form-control" />
          </p>

          {/* Total (read-only) */}
          <p>
            <strong>Total:</strong><br />
            <input type="number" name="total" value={total} readOnly className="form-control" />
          </p>

          {/* Submit */}
          <div className="d-flex gap-2 mt-3">
            <button type="submit" className="btn btn-primary">💾 Update Order</button>
            <a href={`/orders?token=${token}`} className="btn btn-secondary">← All Orders</a>
          </div>
        </form>
      </div>
    </Layout>
  );
}

module.exports = Edit;
