import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SignupService from '../services/SignupService';

function Signup({ setIsLoginOpen }) {
  const [username, setUsername] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState(null); 
  
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault(); 
    setError(null);
    
    if (password !== confirmPassword) {
      setError("Passwords do not match!");
      return;
    }

    try {
      await SignupService.signup({ 
        username, 
        email, 
        name, 
        password 
      });
      
      navigate('/');
      setIsLoginOpen(true);
      
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="container d-flex justify-content-center align-items-center" style={{ minHeight: '80vh', padding: '2rem 0' }}>
      <div className="card shadow p-4" style={{ width: '100%', maxWidth: '400px' }}>
        <h2 className="text-center mb-4">Create an Account</h2>
        
        {error && <div className="alert alert-danger">{error}</div>}
        
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Username</label>
            <input 
              type="text" 
              className="form-control" 
              placeholder="Choose a username"
              value={username}
              onChange={(event) => setUsername(event.target.value)}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Full Name</label>
            <input 
              type="text" 
              className="form-control" 
              placeholder="John Doe"
              value={name}
              onChange={(event) => setName(event.target.value)}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Email address</label>
            <input 
              type="email" 
              className="form-control" 
              placeholder="name@example.com"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              required
            />
          </div>
          
          <div className="mb-3">
            <label className="form-label">Password</label>
            <input 
              type="password" 
              className="form-control" 
              placeholder="Create a password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              required
              minLength="3" 
            />
          </div>

          <div className="mb-4">
            <label className="form-label">Confirm Password</label>
            <input 
              type="password" 
              className="form-control" 
              placeholder="Confirm your password"
              value={confirmPassword}
              onChange={(event) => setConfirmPassword(event.target.value)}
              required
            />
          </div>
          
          <button type="submit" className="btn btn-primary w-100 mb-3">
            Sign Up
          </button>
          
          <div className="text-center mt-3">
            <span className="text-muted">Already have an account? </span>
            <button 
              type="button" 
              className="btn btn-link text-decoration-none p-0 align-baseline" 
              onClick={() => setIsLoginOpen(true)}
            >
              Log in
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Signup