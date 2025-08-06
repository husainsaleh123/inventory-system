const React = require("react");
const Layout = require("../layouts/Layout"); // make sure this import is correct!

function New(props) {
    // Access data passed via props (from the controller)
    const { name = "", price = "", stock = "", supplier = "", available = false } = props;
    const token = props.token;

    return (
        <Layout token={token}>
        <div>
            <h1>New Product</h1>
            <a href={`/products?token=${props.token}`}>Go back to Index Page</a>
            <form action={`/products?token=${props.token}`} method="POST" encType="multipart/form-data">
                <p>
                    Image: <input type="file" name="image" accept="image/*" /><br /> {/* Enables image image upload */}
                </p>
                <p>Product Name: <input type="text" name="name" defaultValue={name} /><br /></p>
                <p>Price: <input type="number" name="price" defaultValue={price} min="0" step="0.05" /><br /></p>
                <p>Stock: <input type="number" name="stock" defaultValue={stock} /><br /></p>
                <p><strong>Supplier:</strong></p>
                <select
                    name="supplierName"
                    required
                    onChange={(e) => {
                        if (e.target.value === 'add-new') {
                            window.location.href = `/suppliers/new?token=${props.token}`;
                        }
                    }}
                >
                    <option value="">-- Select a supplier --</option>
                    {props.suppliers?.map((supplier, idx) => (
                        <option key={idx} value={supplier.name}>
                            {supplier.name}
                        </option>
                    ))}
                    <option value="add-new">➕ Add New Supplier</option>
                </select>
                <p>Available:
                    {available ? (
                        <input type="checkbox" name="available" defaultChecked />
                    ) : (
                        <input type="checkbox" name="available" />
                    )}
                    <br />
                </p>

                <div className="d-flex gap-2">
                    <button type="submit" className="btn btn-primary">
                        ➕ Add Product
                    </button>
                    <a href={`/products?token=${token}`} className="btn btn-secondary">
                        ← Back to All Products
                    </a>
                </div>

            </form>
        </div>
        </Layout>
    )
}

module.exports = New;