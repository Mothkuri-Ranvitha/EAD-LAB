import React, { useState } from 'react';
import './App.css';

function App() {
  const [password, setPassword] = useState('');
  const [strength, setStrength] = useState('');

  const checkStrength = (value) => {
    setPassword(value);
    if (value.length < 6) setStrength('Weak');
    else if (value.match(/[A-Z]/) && value.match(/[0-9]/) && value.match(/[^A-Za-z0-9]/))
      setStrength('Strong');
    else setStrength('Medium');
  };

  return (
    <div className="App">
      <h1>Password Strength Checker</h1>
      <input
        type="password"
        placeholder="Enter password"
        value={password}
        onChange={(e) => checkStrength(e.target.value)}
      />
      <p>Strength: {strength}</p>
    </div>
  );
}

export default App;
