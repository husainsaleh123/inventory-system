const React = require("react");
const Layout = require("../layouts/Layout");

function New(props) {
    const { name = "", address = "", phone = "", email = "" } = props;
    const token = props.token;

    return (
        <Layout token={token}>
            <div className="new-product-container">
                <h1>New Supplier</h1>
                <form action={`/suppliers?token=${token}`} method="POST" encType="multipart/form-data" className="new-product-form">
                    <label>
                        Logo:
                        <input type="file" name="image" accept="image/*" />
                    </label>

                    <label>
                        Supplier Name:
                        <input type="text" name="name" defaultValue={name} required />
                    </label>

                    <label>
                        Address:
                        <input type="text" name="address" defaultValue={address} required />
                    </label>

                    <label>
                        Phone:
                        <input type="text" name="phone" defaultValue={phone} required />
                    </label>

                    <label>
                        Email:
                        <input type="email" name="email" defaultValue={email} required />
                    </label>

                    <div className="form-buttons">
                        <button type="submit" className="btn btn-primary">
                            ➕ Add Supplier
                        </button>
                        <a href={`/suppliers?token=${token}`} className="btn btn-secondary">
                            ← Back to All Suppliers
                        </a>
                    </div>
                </form>
            </div>
        </Layout>
    );
}

module.exports = New;
