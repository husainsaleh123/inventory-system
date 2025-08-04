const React = require('react');
const Layout = require('../layouts/Layout');

function SignUp(props) {
    return (
        <Layout>
            <h1>📝 Sign Up</h1>
            <h2>Join The Greatest Of All Time!</h2>

            {/* Render error messages if available */}
            {props.error && <div className="alert alert-danger">{props.error}</div>}

            <form action="/users" method="POST"> {/* Ensure this is the correct route */}
                <div>
                    <label htmlFor="name">Full Name:</label>
                    <input 
                        type="text" 
                        id="name"
                        name="name" 
                        placeholder="Enter your full name..."
                        required 
                    />
                </div>

                <div>
                    <label htmlFor="email">Email:</label>
                    <input 
                        type="email" 
                        id="email"
                        name="email" 
                        placeholder="Enter your email..."
                        required 
                    />
                </div>

                <div>
                    <label htmlFor="password">Password:</label>
                    <input 
                        type="password" 
                        id="password"
                        name="password" 
                        placeholder="Enter your password..."
                        required 
                    />
                </div>

                <div>
                    <button type="submit" className="btn btn-primary">
                        📝 Create Account
                    </button>
                </div>
            </form>

            <div>
                <p>Already have an account? <a href="/users/login">Sign in here</a></p>
            </div>
        </Layout>
    );
}

module.exports = SignUp;
