const React=require("react")
function Index (props){
    const products=props.products
    return(
        <div>


        <h1>Products page</h1>
        <a href="/products/new">Add new product</a>

        <ul>
            {
                products.map(product=>{
                    return(
                        <li>
                            <a href={`/products/${product._id}`}><h3>{product.name}</h3> </a>  
                            <p>Price: {product.price}</p>
                            <p>Unit: {product.unit}</p>
                            <p>Stock: {product.stock}</p>
                            <p>Supplier: {product.supplier}</p>
                            <p>Country: {product.country}</p>
                            <p>Available:{product.available?`is available`:`Is not available`}</p>
                        </li>
                    )
                })
            }
        </ul>

        </div>
    )
}

module.exports=Index
