const React = require("react");
const Layout = require("../layouts/Layout"); // make sure this import is correct!

function New(props) {
    // Access data passed via props (from the controller)
    const { name = "", address = "", phone = "", email = ""} = props;
    const token = props.token;
    
    return (
        <Layout>
        <div>
            <h1>New Supplier</h1>
            <a href={`/suppliers?token=${props.token}`}>Go back to Index Page</a>
            <form action={`/suppliers?token=${props.token}`} method="POST" encType="multipart/form-data">
                <p>
                    Logo: <input type="file" name="image" accept="image/*" /><br /> {/* Enables image image upload */}
                </p>
                <p>Supplier Name: <input type="text" name="name" defaultValue={name} /><br /></p>
                <p>Address: <input type="text" name="address" defaultValue={address}/><br /></p>
                <p>Phone: <input type="number" name="phone" defaultValue={phone} /><br /></p> {/* Fixed defaultValue */}
                <p>Email: <input type="text" name="email" defaultValue={email} /><br /></p>
               
                <div className="d-flex gap-2">
                    <button type="submit" className="btn btn-primary">
                        ➕ Add supplier
                    </button>
                    <a href={`/suppliers?token=${token}`} className="btn btn-secondary">
                        ← Back to All suppliers
                    </a>
                </div>
                

                {/* <input type="submit" value="Add supplier" /> */}
            </form>
        </div>
        </Layout>
    )
}

module.exports = New;
