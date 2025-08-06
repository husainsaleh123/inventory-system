const React = require('react');
const Layout = require('../layouts/Layout');

function SignIn(props) {
    return (
        <Layout hideLayout={true}>
            <div className="modal-backdrop">
                <div className="modal">
                    <h1>🔐 Sign In</h1>
                    <h2 className="text-center mb-3">Welcome Back to Dar Altawawish!</h2>

                    <form action="/users/login" method="POST">  
                        <div className="form-group">
                            <label htmlFor="email">Email:</label>
                            <input 
                                type="email" 
                                id="email"
                                name="email" 
                                placeholder="Enter your email..."
                                required 
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="password">Password:</label>
                            <input 
                                type="password" 
                                id="password"
                                name="password" 
                                placeholder="Enter your password..."
                                required 
                            />
                        </div>

                        <div className="d-flex gap-2">
                            <button type="submit" className="btn btn-primary">
                                🔐 Sign In
                            </button>
                        </div>
                    </form>

                    <div className="text-center mt-3">
                        <p>Don't have an account? <a href="/users">Sign up here</a></p>
                    </div>
                </div>
            </div>
        </Layout>
    );
}

module.exports = SignIn;
