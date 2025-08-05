const React = require("react");

function New(props) {
    // Access data passed via props (from the controller)
    const { name = "", price = "", unit = "", stock = "", supplier = "", country = "", available = false } = props;

    return (
        <div>
            <h1>New Product</h1>
            <a href={`/products?token=${props.token}`}>Go back to Index Page</a>
            <form action={`/products?token=${props.token}`} method="POST" encType="multipart/form-data">
                <p>
                    Image: <input type="file" name="image" accept="image/*" /><br /> {/* Enables image image upload */}
                </p>
                <p>Name: <input type="text" name="name" defaultValue={name} /><br /></p>
                <p>Price: <input type="number" name="price" defaultValue={price} min="0" step="0.05" /><br /></p>
                <p>Unit: <input type="text" name="unit" defaultValue={unit} /><br /></p> {/* Fixed defaultValue */}
                <p>Stock: <input type="number" name="stock" defaultValue={stock} /><br /></p>
                <p>Supplier: <input type="text" name="supplier" defaultValue={supplier} /><br /></p>
                <p>Country: <input type="text" name="country" defaultValue={country} /><br /></p>
                <p>Available:
                    {available ? (
                        <input type="checkbox" name="available" defaultChecked />
                    ) : (
                        <input type="checkbox" name="available" />
                    )}
                    <br />
                </p>
                <input type="submit" value="Add Product" />
            </form>
        </div>
    );
}

module.exports = New;
