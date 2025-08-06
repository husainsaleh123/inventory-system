const React = require('react');
const Layout = require('../layouts/Layout');

function SignUp(props) {
    return (
        <Layout hideLayout={true}>
            <div className="modal-backdrop">
                <div className="modal">
                    <h1>📝 Sign Up</h1>
                    <h2 className="text-center mb-3">Be part of Dar Altawawish's family!</h2>

                    <form action="/users" method="POST">
                        <div className="form-group">
                            <label htmlFor="name">Full Name:</label>
                            <input 
                                type="text" 
                                id="name"
                                name="name" 
                                placeholder="Enter your full name..."
                                required 
                            />
                        </div>

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
                                📝 Create Account
                            </button>
                        </div>
                    </form>

                    <div className="text-center mt-3">
                        <p>Already have an account? <a href="/users/login">Sign in here</a></p>
                    </div>
                </div>
            </div>
        </Layout>
    );
}

module.exports = SignUp;
