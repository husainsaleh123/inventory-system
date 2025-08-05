const React = require('react')

function Layout(props){
 return(
    <html>
        <head>
            <title>{!props.product?.name ? 'Dar Al Tawawish' : `${props.product.name} - Dar Al Tawaweesh`}</title>
            <link rel="stylesheet" href="/styles.css" />
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        </head>
        <body>
            <div>
                {props.children}
            </div>
        </body>
    </html>
 )
}

module.exports = Layout