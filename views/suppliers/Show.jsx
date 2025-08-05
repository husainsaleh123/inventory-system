const React = require("react");
const Layout = require('../layouts/Layout')

function Show(props) {
    // Destructure the supplier data passed from the server
    const { _id, image, name, address, phone, email } = props.supplier;
    const token = props.token;

    
    return (
        <Layout token={props.token}>
        <div>
            <h1>{props.supplier.name} Details</h1>
            {/* Displays the supplier image if available */}
            <p><strong>Logo:</strong></p>
            {image ? (
            <img src={`/uploads/${image}`} alt={name} style={{ width: '200px', height: 'auto' }} />
            ) : (
            <img src="/uploads/default-image.jpg" alt="Default" style={{ width: '200px', height: 'auto' }} />
            )}
            
            <p><strong>Name:</strong> {name}</p>
            <p><strong>Address:</strong> {address}</p>
            <p><strong>Phone:</strong> {phone}</p>
            <p><strong>Email:</strong> {email}</p>

            <br />

            <div className="d-flex gap-2">
                    <a href={`/suppliers?token=${props.token}`} className="btn btn-secondary">
                        ← 📃 All suppliers
                    </a>
                    <a href={`/suppliers/${_id}/edit?token=${token}`} className="btn btn-primary">
                        ✏️ Edit supplier
                    </a>
                   <form action={`/suppliers/${_id}?_method=DELETE&token=${token}`} method="POST">
                        <button type="submit" className="btn btn-primary">
                        🗑️ Delete supplier
                        </button>
                    </form>
                </div>
        </div>
        </Layout>
    )
}

module.exports = Show;
