import { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import './Styles/Register.css'; // make sure this contains the signup-container styles

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:8080/api/auth/register', {
        name,
        email,
        password,
      });
      navigate('/login');
    } catch (err) {
      console.error(err);
      setError('Registration failed. Please try again.');
    }
  };

  return (
    <div className="signup-container">
      <div className="signup-left">
        <div className="signup-left-text">
          <h1>Welcome to Do-Do!</h1>
          <p>Create your account and start chatting in a beautiful, seamless way.</p>
        </div>
      </div>

      <div className="signup-right">
        <div className="signup-card">
          <h2>Create Account</h2>

          {error && <div className="signup-error">{error}</div>}

          <form onSubmit={handleRegister}>
            <div className="signup-input-group">
              <label htmlFor="name">Name</label>
              <input
                type="text"
                id="name"
                placeholder="Enter your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>

            <div className="signup-input-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="signup-input-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <button type="submit" className="signup-btn">Register</button>
          </form>

          <div className="signup-footer">
            Already have an account?{' '}
            <Link to="/login" className="signup-link">Login</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
