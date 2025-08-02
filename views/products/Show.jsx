const React = require("react");

function Show(props) {
    // Destructure props to get the product details
    const { _id, name, price, stock, supplier, country, available } = props.product;

    return (
        <div>
            <h1>Product Details</h1>
            <p><strong>Name:</strong> {name}</p>
            <p><strong>Price:</strong> {price}</p>
            <p><strong>Stock:</strong> {stock}</p>
            <p><strong>Supplier:</strong> {supplier}</p>
            <p><strong>Country:</strong> {country}</p>
            <p><strong>Available:</strong> {available ? "Yes" : "No"}</p>
        </div>
    );
}

module.exports = Show;
