import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [regNo, setRegNo] = useState('');
  const [branch, setBranch] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);  
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { register } = useAuth();

  const handleSubmit = async (e) => {
  e.preventDefault();

  setError(null);

  if (
    !name.trim() ||
    !email.trim() ||
    !regNo.trim() ||
    !branch
  ) {
    setError("Please fill all fields.");
    return;
  }

  if (password.length < 8) {
    setError("Password must be at least 8 characters.");
    return;
  }

  if (password !== confirmPassword) {
    setError("Passwords do not match.");
    return;
  }

  setLoading(true);

  const payload = {
    name: name.trim(),
    email: email.trim(),
    regNo: regNo.trim(),
    branch,
    password,
  };

  const data = await register(payload);

  setLoading(false);

  if (data && data.token) {
    navigate("/dashboard");
  } else {
    setError(data?.message || "Registration failed.");
  }
};

  return (
    <div className="register-page glassmorphism">
      <h2 className="title">Register</h2>
      <form onSubmit={handleSubmit} className="form">
        <input
          type="text"
          placeholder="Full Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          className="input"
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="input"
        />
        <input
          type="text"
          placeholder="Registration Number"
          value={regNo}
          onChange={(e) => setRegNo(e.target.value)}
          required
          className="input"
        />
        <select
          value={branch}
          onChange={(e) => setBranch(e.target.value)}
          required
          className="input"
        >
          <option value="">Select Branch</option>
          <option value="CSE">Computer Science</option>
          <option value="IT">Information Technology</option>
          <option value="ECE">Electronics & Communication</option>
          <option value="EEE">Electrical Engineering</option>
          <option value="ME">Mechanical Engineering</option>
          <option value="CE">Civil Engineering</option>
        </select>

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="input"
        />
        <input
          type="password"
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
          className="input"
        />
        <button type="submit" className="btn-primary">Register</button>
        {error && <p className="error">{error}</p>}
      </form>
      <p>
        Already have an account? <Link to="/login">Login</Link>
      </p>
    </div>
  );
};

export default Register;
