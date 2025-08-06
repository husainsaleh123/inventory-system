const React = require("react");
const Layout = require("../layouts/Layout");

function New(props) {
    const { name = "", price = "", stock = "", supplier = "", available = false } = props;
    const token = props.token;

    return (
        <Layout token={token}>
            <div className="new-product-container">
                <h1>New Product</h1>
                <form
                    action={`/products?token=${token}`}
                    method="POST"
                    encType="multipart/form-data"
                    className="new-product-form"
                >
                    <label>
                        Image:
                        <input type="file" name="image" accept="image/*" />
                    </label>

                    <label>
                        Product Name:
                        <input type="text" name="name" defaultValue={name} required />
                    </label>

                    <label>
                        Price:
                        <input type="number" name="price" defaultValue={price} min="0" step="0.01" required />
                    </label>

                    <label>
                        Stock:
                        <input type="number" name="stock" defaultValue={stock} required />
                    </label>

                    <label>
                        Supplier:
                        <select
                            name="supplierName"
                            required
                            onChange={(e) => {
                                if (e.target.value === "add-new") {
                                    window.location.href = `/suppliers/new?token=${token}`;
                                }
                            }}
                            defaultValue={supplier || ""}
                        >
                            <option value="">-- Select a supplier --</option>
                            {props.suppliers?.map((supplier, idx) => (
                                <option key={idx} value={supplier.name}>
                                    {supplier.name}
                                </option>
                            ))}
                            <option value="add-new">➕ Add New Supplier</option>
                        </select>
                    </label>

                    <label className="checkbox-label">
                        Available:
                        <input type="checkbox" name="available" defaultChecked={available} />
                    </label>

                    <div className="form-buttons">
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
    );
}

module.exports = New;
