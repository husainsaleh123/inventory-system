const React = require('react')


function Layout(props){
     const token = props.token;
     const hideLayout = props.hideLayout;

 return(
    <html>
        <head>
            <title>{!props.product?.name ? 'Dar Al Tawawish' : `${props.product.name} - Dar Al Tawaweesh`}</title>
            <link rel="stylesheet" href="/styles.css" />
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        </head>
        <body>
            {!hideLayout && (
            <header className="navbar">
                    <div className="navbar-left">
                        <span className="logo">💎 Dar Altawawish</span>
                        <a className="nav-link" href={`/products?token=${props.token}`}>Products</a>
                        <a className="nav-link" href={`/suppliers?token=${props.token}`}>Suppliers</a>
                        <a className="nav-link" href={`/orders?token=${props.token}`}>Orders</a>
                    </div>
                    <div className="navbar-right">
                        <a className="nav-link logout" href="/users/login">Logout</a>
                    </div>
                </header>
             )}

            <div>
                {props.children}
            </div>

            {!hideLayout && (
                    <footer>
                        <p>Dar Al Tawawish 2025 (c) All copyrights reserved.</p>
                    </footer>
                )}
        </body>
    </html>
 )
}

module.exports = Layout