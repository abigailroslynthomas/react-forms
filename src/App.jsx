import React, { useState } from 'react';
import './index.css';  // For styling

function App() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [token, setToken] = useState(null);
  const [error, setError] = useState('');

  // Handle the form submission for signup
  const handleSignup = async (e) => {
    e.preventDefault();
    
    setError(''); // Clear any previous errors

    try {
      const response = await fetch('https://fsa-jwt-practice.herokuapp.com/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });

      if (!response.ok) {
        throw new Error('Signup failed. Please try again.');
      }

      const data = await response.json();
      setToken(data.token); // Save the token
      alert('Signup successful! Token saved.');
    } catch (err) {
      setError(err.message);
    }
  };

  // Authenticates by stored token
  const handleAuthenticate = async () => {
    if (!token) {
      setError('No token found. Please sign up first.');
      return;
    }

    try {
      const response = await fetch('https://fsa-jwt-practice.herokuapp.com/authenticate', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}` 
        },
      });

      if (!response.ok) {
        throw new Error('Authentication failed. Token may be invalid.');
      }

      alert('Authentication successful!');
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="App">
      <title>React Forms</title>
      <h1>Signup & Authenticate</h1>
      
      <form onSubmit={handleSignup}>
        <div>
          <label>Username:</label>
          <input 
            type="text" 
            /* The styles from App.css will change the look of all these inputs */ 
            className="form-control" 
            value={username} 
            onChange={(e) => setUsername(e.target.value)} 
          />
        </div>

        <div>
          <label>Password:</label>
          <input 
            type="password" 
            className="form-control" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
          />
        </div>
        
        <div>
          <input type="submit" value="Signup" />
        </div>

        {error && <div style={{ color: 'red' }}>{error}</div>}
      </form>

      <button onClick={handleAuthenticate}>Authenticate</button>
    </div>
  );
}

export default App;