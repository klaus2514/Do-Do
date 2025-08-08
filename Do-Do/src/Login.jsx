import { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import './Styles/Login.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
  e.preventDefault();
  try {
    

    const res = await axios.post(
      'https://do-do.onrender.com/api/auth/login',
      { email, password },
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }

    );

    localStorage.setItem('token', res.data.token);
    navigate('/chat');
  } catch (err) {
    console.error(err);
    setError('Invalid email or password');
  }
};


  return (
    <div className="login-container">
      <div className="login-left">
        <div className="login-left-text">
          <h1>Welcome Back!</h1>
          <p>Log in to your Do-Do, Chat and continue your journey.</p>
        </div>
      </div>

      <div className="login-right">
        <div className="login-card">
          <h2>Login</h2>
          <form onSubmit={handleLogin}>
            <div className="login-input-group">
              <label>Email</label>
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="login-input-group">
              <label>Password</label>
              <input
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <button type="submit" className="login-btn">Login</button>


          </form>
          <div className="login-footer">
            Don't have an account?{" "}
            <Link to="/register" className="login-link">Sign up</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;