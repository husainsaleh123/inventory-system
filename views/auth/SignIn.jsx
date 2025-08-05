const React = require('react');
const Layout = require('../layouts/Layout');

function SignIn(props) {
    return (
        <Layout>
            <h1>🔐 Sign In</h1>
            <h2>Welcome Back!</h2>

            <form action="/users/login" method="POST">  {/* Make sure form points to /auth/login */}
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
                        🔐 Sign In
                    </button>
                </div>
            </form>

            <div>
                <p>Don't have an account? <a href="/users">Sign up here</a></p>
            </div>
        </Layout>
    );
}

module.exports = SignIn;
