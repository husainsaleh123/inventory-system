const React = require("react");
const Layout = require('../layouts/Layout');

function Show(props) {
    const { _id, image, name, address, phone, email } = props.supplier;
    const token = props.token;

    return (
        <Layout token={token}>
            <div className="new-product-container">
                <h1>📦 {name} Details</h1>

                <div style={{ marginBottom: "1.5rem" }}>
                    <p><strong>Logo:</strong></p>
                    <img
                        src={image ? `/uploads/${image}` : "/uploads/default-image.jpg"}
                        alt={name}
                        style={{
                            width: '200px',
                            height: 'auto',
                            borderRadius: '8px',
                            boxShadow: '0 0 8px rgba(0,0,0,0.1)'
                        }}
                    />
                </div>

                <ul className="product-details">
                    <li><span className="label">Name:</span> {name}</li>
                    <li><span className="label">Address:</span> {address}</li>
                    <li><span className="label">Phone:</span> {phone}</li>
                    <li><span className="label">Email:</span> {email}</li>
                </ul>

               <div className="form-buttons">
                <a href={`/suppliers?token=${token}`} className="btn btn-secondary">
                    ← 📃 All Suppliers
                </a>
                <a href={`/suppliers/${_id}/edit?token=${token}`} className="btn btn-primary">
                    ✏️ Edit Supplier
                </a>
                <form action={`/suppliers/${_id}?_method=DELETE&token=${token}`} method="POST" style={{ display: 'inline' }}>
                    <button type="submit" className="btn btn-danger">
                        🗑️ Delete Supplier
                    </button>
                </form>
            </div>
            </div>
        </Layout>
    );
}

module.exports = Show;
