import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { post } from '../services/EndPoint';
import { useDispatch } from 'react-redux';
import toast from 'react-hot-toast';
import { setUser } from '../reduex/AuthSlice';


export default function Login({ onClose, isOpen }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
   
  const [value, setValue] = useState({
    email: "",
    password: ""
  });

  const handleChange = (e) => {
    setValue({
      ...value,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    try {
      const request = await post('/auth/login', value);
      const response = request.data;
      console.log("login success", response);
      if (request.status === 200) {
        dispatch(setUser(response.user));
        if (onClose) onClose();
        navigate('/');
        toast.success(response.message);
      }
    } catch (error) {
      console.error("login error", error);
      if (error.response && error.response.data && error.response.data.message) {
        toast.error(error.response.data.message);
      } else {
        toast.error("An unexpected error occurred. Please try again.");
      }
    }
  };

  if (!isOpen) return null;

  return (
    <div className="auth-overlay">
      <div className="auth-container">
        <div className="auth-card">
          {onClose && (
            <button className="close-btn" onClick={onClose}>
              ×
            </button>
          )}
          <h2 className="login-title">Welcome Back</h2>
          <p>Sign in to your account</p>
          
          <form onSubmit={handleSubmit} className="auth-form">
            <div className="input-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                name="email"
                id="email"
                value={value.email}
                onChange={handleChange}
                placeholder="Enter your email"
                required
              />
            </div>
            <div className="input-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                name="password"
                id="password"
                value={value.password}
                onChange={handleChange}
                placeholder="Enter your password"
                required
              />
            </div>
            <button type="submit" className="login-btn">Sign in</button>
            <p className="login-link">
              Don't have an account? <Link to="/register" onClick={onClose}>Sign up</Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}