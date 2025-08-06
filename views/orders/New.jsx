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
      <div>
        <h1 style={{ color: 'green', textAlign: 'center' }}>New Order</h1>
        <a href={`/orders?token=${token}`}>← Back to Orders</a>

        <form action={`/orders?token=${token}`} method="POST" encType="multipart/form-data">
          {/* Image Preview + Hidden Input */}
          {productImage && (
            <div>
              <strong>Product Image:</strong><br />
              <img src={`/uploads/${productImage}`} alt="Selected" style={{ width: '150px' }} />
              <input type="hidden" name="image" value={productImage} />
            </div>
          )}

          {/* Product Name + ID */}
          <p>
            <strong>Product:</strong>
            <input
              type="text"
              name="productName"
              value={productName}
              readOnly
              className="form-control"
            />
            <input type="hidden" name="productId" value={productId} />
          </p>

          {/* Supplier Name (read-only) */}
          <p>
            <strong>Supplier Name:</strong>
            <input
              type="text"
              name="supplierName"
              value={supplierName}
              readOnly
              className="form-control"
            />
          </p>

          {/* Link */}
          <p>
            Link:
            <input type="text" name="link" className="form-control" required />
          </p>

         {/* Status */}
            <p>
            Status:
            <select name="status" className="form-control" required>
                <option value="">-- Select Status --</option>
                <option value="Preparing">Preparing</option>
                <option value="Shipped">Shipped</option>
                <option value="Delivered">Delivered</option>
                <option value="Received">Received</option>
            </select>
            </p>

          {/* Date */}
          <p>
            Date:
            <input type="date" name="date" className="form-control" required />
          </p>

          {/* Quantity (used by backend to auto-calculate total) */}
          <p>
            Quantity:
            <input type="number" name="quantity" className="form-control" required />
          </p>

          {/* Removed "Total" field – calculated in backend */}

          <button type="submit" className="btn btn-success">
            ➕ Add Order
          </button>
        </form>
      </div>
    </Layout>
  );
}

module.exports = New;
