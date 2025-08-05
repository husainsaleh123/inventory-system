const React = require("react");

function Show(props) {
    // Destructure the product data passed from the server
    const { _id, name, price, unit, stock, supplier, country, available, image } = props.product;
    const token = props.token; 
    
    return (
        <div>
            <h1>Product Details</h1>
            {/* Displays the product image if available */}
             <a href={`/products?token=${token}`}>Go back to Index Page</a>
            <p><strong>Image:</strong></p>
            {image ? (
                <img src={`/uploads/${image}`} alt={name} style={{ width: '200px', height: 'auto' }} />
            ) : (
                <img src="/uploads/default-image.jpg" alt="Default" style={{ width: '200px', height: 'auto' }} />
            )}
            
            <p><strong>Name:</strong> {name}</p>
            <p><strong>Price:</strong> {price}</p>
            <p><strong>Unit:</strong> {unit}</p>
            <p><strong>Stock:</strong> {stock}</p>
            <p><strong>Supplier:</strong> {supplier}</p>
            <p><strong>Country:</strong> {country}</p>
            <p><strong>Available:</strong> {available ? "Yes" : "No"}</p>

            <br />
            {/* Edit Button - Links to the Edit page */}
            <a href={`/products/${_id}/edit?token=${token}`}>
                <button>Edit Product</button>
            </a>
            
            {/* Delete Button - Submits a form to delete the product */}
            <form action={`/products/${_id}?_method=DELETE&token=${token}`} method="POST">
                <button type="submit">Delete Product</button>
            </form>
        </div>
    );
}

module.exports = Show;
