const React = require("react");
const Layout = require("../layouts/Layout");

function Edit(props) {
    const { _id, image, name, price, stock, supplier, available } = props.product;
    const token = props.token;
    const suppliers = props.suppliers || [];

    return (
        <Layout token={token}>
            <div className="new-product-container">
                <h1>✏️ Edit Product</h1>
                <form
                    action={`/products/${_id}?_method=PUT&token=${token}`}
                    method="POST"
                    encType="multipart/form-data"
                    className="new-product-form"
                >
                    <label>
                        Image:
                        <input type="file" name="image" accept="image/*" />
                        {image && (
                            <img
                                src={`/uploads/${image}`}
                                alt="Current Product"
                                style={{ marginTop: "0.5rem", width: "100px", borderRadius: "5px" }}
                            />
                        )}
                    </label>

                    <label>
                        Product Name:
                        <input type="text" name="name" defaultValue={name} required />
                    </label>

                    <label>
                        Price:
                        <input type="number" name="price" defaultValue={price} min="0" step="0.05" required />
                    </label>

                    <label>
                        Stock:
                        <input type="number" name="stock" defaultValue={stock} required />
                    </label>

                    <label>
                        Supplier:
                        <select
                            name="supplier"
                            required
                            defaultValue={supplier?._id || ""}
                            onChange={(e) => {
                                if (e.target.value === "new") {
                                    window.location.href = `/suppliers/new?token=${token}`;
                                }
                            }}
                        >
                            <option value="">-- Select a supplier --</option>
                            {suppliers.map((sup) => (
                                <option key={sup._id} value={sup._id}>
                                    {sup.name}
                                </option>
                            ))}
                            <option value="new">➕ Add New Supplier</option>
                        </select>
                    </label>

                    <label className="checkbox-label">
                        Available:
                        <input type="checkbox" name="available" defaultChecked={available} />
                    </label>

                    <div className="form-buttons">
                        <button type="submit" className="btn btn-primary">
                            💾 Update Product
                        </button>
                        <a href={`/products/${_id}?token=${token}`} className="btn btn-secondary">
                            ← Back to {name}
                        </a>
                    </div>
                </form>
            </div>
        </Layout>
    );
}

module.exports = Edit;
