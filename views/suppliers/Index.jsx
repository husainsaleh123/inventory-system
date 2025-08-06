const React = require("react");
const Layout = require("../layouts/Layout");

function Index(props) {
    const suppliers = props.suppliers || [];
    const token = props.token;

    return (
        <Layout token={token}>
            <div className="product-grid-wrapper">
                <div className="product-grid-header">
                    <h1 className="product-grid-title">Your Supplier Collection</h1>
                    <a href={`/suppliers/new?token=${token}`} className="btn btn-primary">
                        + Add New Supplier
                    </a>
                </div>

                {suppliers.length === 0 ? (
                    <p>No suppliers yet! Add your first supplier to get started.</p>
                ) : (
                    <div className="product-grid">
                        {suppliers.map((supplier) => (
                            <div key={supplier._id} className="product-card horizontal-card">
                                <div className="product-image-container">
                                    <img
                                        src={`/uploads/${supplier.image || 'default-image.jpg'}`}
                                        alt={supplier.name}
                                        className="product-image"
                                    />
                                </div>

                                <div className="product-info">
                                    <h2 className="product-name">{supplier.name}</h2>
                                    <ul className="product-details">
                                        <li><span className="label">Address:</span> {supplier.address}</li>
                                        <li><span className="label">Phone:</span> {supplier.phone}</li>
                                        <li><span className="label">Email:</span> {supplier.email}</li>
                                    </ul>

                                    <div className="product-actions d-flex gap-2 mt-2">
                                        <a href={`/suppliers/${supplier._id}?token=${token}`} className="btn btn-secondary">
                                            👁️ View
                                        </a>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </Layout>
    );
}

module.exports = Index;
