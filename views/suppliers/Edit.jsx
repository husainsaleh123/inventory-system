const React = require("react");
const Layout = require('../layouts/Layout');

function Edit(props) {
    const { _id, image, name, address, phone, email } = props.supplier;
    const token = props.token;

    return (
        <div>
            <Layout token={token}>
                <h1>✏️ Edit {name}</h1>
                <a href={`/suppliers/${_id}`}>Go back to Index Page</a>

                <form action={`/suppliers/${_id}?_method=PUT&token=${token}`} method="POST" encType="multipart/form-data">
                    {/* Logo upload */}
                    <p>
                        Logo: <input type="file" name="image" accept="image/*" /><br />
                        {/* Use correct variable: logo */}
                       {image && (
                            <img src={`/uploads/${image}`} alt="supplier" style={{ width: '100px' }} />
                        )}
                    </p>

                    <p>
                        Name: <input type="text" name="name" defaultValue={name} /><br />
                    </p>
                    <p>
                        Address: <input type="text" name="address" defaultValue={address} /><br />
                    </p>
                    <p>
                        Phone: <input type="text" name="phone" defaultValue={phone} /><br />
                    </p>
                    <p>
                        Email: <input type="email" name="email" defaultValue={email} /><br />
                    </p>

                    <div className="d-flex gap-2">
                        <button type="submit" className="btn btn-primary">
                            💾 Update Supplier
                        </button>
                        <a href={`/suppliers/${_id}?token=${token}`} className="btn btn-secondary">
                            ← Back to {name}
                        </a>
                    </div>
                </form>
            </Layout>
        </div>
    );
}

module.exports = Edit;