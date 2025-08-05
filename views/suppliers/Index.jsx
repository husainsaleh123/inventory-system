const React = require("react");
const Layout = require("../layouts/Layout");

function Index(props) {
    const suppliers = props.suppliers || [];
    const token = props.token;

    return (
        <Layout token={token}>
            <div>
                <h1 style={{ textAlign: 'center', color: 'seagreen' }}>All suppliers</h1>

                <div className="d-flex justify-content-between align-items-center mb-3">
                    <h2>Your supplier Collection</h2>
                    <a href={`/suppliers/new?token=${token}`} className="btn btn-success">
                        ➕ Add New Supplier
                    </a>
                </div>

                {suppliers.length === 0 ? (
                    <p>No suppliers yet! Add your first supplier to get started.</p>
                ) : (
                    <ul className="supplier-list">
                        {suppliers.map((supplier) => (
                            <li key={supplier._id} className="supplier-item">
                                {/* Supplier Image */}
                                <img
                                    src={`/uploads/${supplier.image || 'default-image.jpg'}`}
                                    alt={supplier.name}
                                    style={{ width: '100px', height: 'auto' }}
                                />

                                {/* Supplier Info */}
                                <div>
                                    <a href={`/suppliers/${supplier._id}?token=${token}`}>
                                        <h3>{supplier.name}</h3>
                                    </a>
                                    <p><strong>Address:</strong> {supplier.address}</p>
                                    <p><strong>Phone:</strong> {supplier.phone}</p>
                                    <p><strong>Email:</strong> {supplier.email}</p>
                                </div>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </Layout>
    );
}

module.exports = Index;
