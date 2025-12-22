import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { post } from '../services/EndPoint';
import toast from 'react-hot-toast';


export default function Register({ onClose, isOpen }) {
  const navigate = useNavigate();
  const [value, setValue] = useState({
    fullName: "",
    email: "",
    password: "",
    image: null,
  });

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setValue({ ...value, image: file });
  };

  const handleImageClick = () => {
    document.getElementById('image').click();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('FullName', value.fullName);
    formData.append('email', value.email);
    formData.append('password', value.password);
    formData.append('profile', value.image);

    try {
      const response = await post('/auth/register', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      const data = response.data;
      if (data.success) {
        toast.success(data.message);
        if (onClose) onClose();
        navigate('/login');
      }
    } catch (error) {
      if (error.response?.data?.message) {
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
          <h2 className="register-title">Join Us Today</h2>
          <p>Create your account</p>
          
          <form onSubmit={handleSubmit} className="auth-form">
            <div className="image-upload">
              <label htmlFor="image" className="image-label">
                <img
                  src={value.image ? URL.createObjectURL(value.image) : 'https://ui-avatars.com/api/?name=' + value.fullName + '&background=667eea&color=fff&size=150'}
                  alt="avatar"
                  className="preview-image"
                  onClick={handleImageClick}
                />
              </label>
              <input
                type="file"
                className="d-none"
                id="image"
                accept="image/*"
                onChange={handleImageChange}
              />
            </div>

            <div className="form-group">
              <label htmlFor="fullName">Full Name</label>
              <input
                type="text"
                id="fullName"
                placeholder="Enter your name"
                required
                value={value.fullName}
                onChange={(e) => setValue({ ...value, fullName: e.target.value })}
              />
            </div>

            <div className="form-group">
              <label htmlFor="email">Email Address</label>
              <input
                type="email"
                id="email"
                placeholder="Enter your email"
                required
                value={value.email}
                onChange={(e) => setValue({ ...value, email: e.target.value })}
              />
            </div>

            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                placeholder="••••••••"
                required
                value={value.password}
                onChange={(e) => setValue({ ...value, password: e.target.value })}
              />
            </div>

            <button type="submit" className="register-button">Sign Up</button>
          </form>
          
          <p className="login-text">
            Already have an account? <Link to="/login" onClick={onClose}>Sign in</Link>
          </p>
        </div>
      </div>
    </div>
  );
}