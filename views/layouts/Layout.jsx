const React = require('react');

function Layout(props) {
    const token = props.token;
    const hideLayout = props.hideLayout;

    return (
        <html>
            <head>
                <title>
                    {!props.product?.name
                        ? 'Dar Al Tawawish'
                        : `${props.product.name} - Dar Al Tawaweesh`}
                </title>
                <link rel="stylesheet" href="/styles.css" />
                <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/7.0.0/css/all.min.css" integrity="sha512-DxV+EoADOkOygM4IR9yXP8Sb2qwgidEmeqAEmDKIOfPRQZOWbXCzLC6vjbZyy0vPisbH2SyW27+ddLVCN+OMzQ==" crossOrigin="anonymous" referrerPolicy="no-referrer" />
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            </head>

            <body>
                <div className="page">
                    {!hideLayout && (
                        <header className="navbar">
                            <div className="navbar-left">
                                <img src="/images/logo.png" alt="Dar Al Tawawish Logo" className="logo-image"/>
                                <a className="nav-link" href={`/products?token=${token}`}>Products</a>
                                <a className="nav-link" href={`/suppliers?token=${token}`}>Suppliers</a>
                                {/* <a className="nav-link" href={`/orders?token=${token}`}>Orders</a> */}
                            </div>
                            <div className="navbar-right">
                                 <a href={`/orders?token=${token}`} className="cart-icon" aria-label="Orders" title="Orders">
                                    <i className="fas fa-shopping-cart"></i>
                                 </a>
                                <a className="nav-link logout" href="/users/login">Logout</a>
                            </div>
                        </header>
                    )}

                    <div className="content">
                        {props.children}
                    </div>

                    {!hideLayout && (
                        <footer>
                            <p>Dar Al Tawawish 2025 (c) All copyrights reserved.</p>
                        </footer>
                    )}
                </div>
            </body>
        </html>
    );
}

module.exports = Layout;
