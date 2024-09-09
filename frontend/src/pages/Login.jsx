import React from 'react'
import Form from '../components/Form'
import { Link } from 'react-router-dom'

function Login() {
    return (
        <div>
            <Form route='/api/token/' method='login' />
            <p>
                Don't have an account? <Link to="/register">Register</Link>
                <br />
                <br />
                <Link to="/">Or continue as Guest</Link>
            </p>
        </div>
    );
}

export default Login;