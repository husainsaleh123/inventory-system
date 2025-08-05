const React = require("react");

function Edit(props) {
    // Destructure the props to access product data
    const { _id, image, name, price, unit, stock, country, supplier, available } = props.product;
    const token = props.token;

    return (
        <div>
            <h1>Edit Product</h1>
            <a href={`/products/${_id}`}>Go back to Index Page</a>
            <form action={`/products/${_id}?_method=PUT&token=${token}`} method="POST" encType="multipart/form-data">
            
                {/* Image upload functionality */}
                <p>
                    Image: <input type="file" name="image" accept="image/*" /><br />
                    {/* Displays current image if available */}
                    {image && <img src={`/uploads/${image}`} alt="Product" style={{ width: '100px' }} />}
                </p>
                <p>
                    Name: <input type="text" name="name" defaultValue={name} /><br />
                </p>
                <p>
                    Price: <input type="number" name="price" defaultValue={price} step="0.01" /><br />
                </p>
                <p>
                    Unit: <input type="text" name="unit" defaultValue={unit} /><br />
                </p>
                <p>
                    Stock: <input type="number" name="stock" defaultValue={stock} /><br />
                </p>
                <p>
                    Supplier: <input type="text" name="supplier" defaultValue={supplier} /><br />
                </p>
                <p>
                    Country: <input type="text" name="country" defaultValue={country} /><br />
                </p>
                <p>
                    Available:
                    {available ? (
                        <input type="checkbox" name="available" defaultChecked />
                    ) : (
                        <input type="checkbox" name="available" />
                    )}
                    <br />
                </p>

                <input type="submit" value="Update Product" />
            </form>
        </div>
    );
}

module.exports = Edit;
