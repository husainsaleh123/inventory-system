const React = require("react");
const Layout = require('../layouts/Layout');

function Edit(props) {
    const { _id, image, name, address, phone, email } = props.supplier;
    const token = props.token;

    return (
        <Layout token={token}>
            <div className="new-product-container">
                <h1>✏️ Edit Supplier</h1>
                <form
                    action={`/suppliers/${_id}?_method=PUT&token=${token}`}
                    method="POST"
                    encType="multipart/form-data"
                    className="new-product-form"
                >
                    <label>
                        Logo:
                        <input type="file" name="image" accept="image/*" />
                        {image && (
                            <img
                                src={`/uploads/${image}`}
                                alt="supplier"
                                style={{ marginTop: "0.5rem", width: "100px", borderRadius: "5px" }}
                            />
                        )}
                    </label>

                    <label>
                        Name:
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
                            💾 Update Supplier
                        </button>
                        <a href={`/suppliers/${_id}?token=${token}`} className="btn btn-secondary">
                            ← Back to {name}
                        </a>
                    </div>
                </form>
            </div>
        </Layout>
    );
}

module.exports = Edit;
