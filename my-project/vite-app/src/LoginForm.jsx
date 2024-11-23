import { useState } from 'react';
import axios from 'axios';
import validator from 'validator';
const API = import.meta.env.VITE_BACKEND_URL;
const LoginForm = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {

  console.log('Username:', username);
  console.log('Password:', password);
  
    e.preventDefault();
    // validator.js
    if (!username || !password) {
      return setError('Username and password are required');
    }

    if (!validator.isAlphanumeric(username)) {
      return setError('Username must be alphanumeric');
    }

    if (password.length < 6) {
      return setError('Password must be at least 6 characters');
    }

    try {
      const response = await axios.post(`${API}/api/auth/login`, { username, password });
      //console.log(response);
      console.log('Username:', username);
      console.log('Password:', password);

      const userId = response.data.userId;
      onLogin(userId);
      

    } catch (err) {
      console.error('Login error:', err);
      setError('Login failed',err);
    }
  };

  return (
    <div>
      <h2>Login</h2>
      {error && <div style={{ color: 'red' }}>{error}</div>}
      <form onSubmit={handleSubmit}>
        <div>
          <label> Username: </label>
          <input 
            type="text" 
            value={username} 
            onChange={(e) => setUsername(e.target.value)} 
            required 
          />
        </div>
        <div>
          <label>Password: </label>
          <input 
            type="password" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
            required 
          />
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default LoginForm;
