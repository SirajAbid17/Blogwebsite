import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import toast from 'react-hot-toast';
import { BaseUrl, post, get } from '../services/EndPoint';
import { removeUser } from '../reduex/AuthSlice';

export default function Navbar() {
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [userProfile, setUserProfile] = useState(null);

  useEffect(() => {
    if (user && user._id) {
      fetchUserProfile(user._id);
    }
  }, [user]);

  const fetchUserProfile = async (userId) => {
    try {
      const response = await get(`/auth/user/${userId}`);
      if (response.data.success) {
        setUserProfile(response.data.user);
      }
    } catch (error) {
      console.error('Error fetching user profile:', error);
    }
  };
  

 
  const getAvatarLetter = () => {
    if (userProfile?.Fullname) {
      return userProfile.Fullname.charAt(0).toUpperCase();
    } else if (user?.fullName) {
      return user.fullName.charAt(0).toUpperCase();
    } else if (user?.email) {
      return user.email.charAt(0).toUpperCase();
    }
    return 'U';
  };

 
  const getAvatarColor = () => {
    const email = userProfile?.email || user?.email;
    if (email) {
      const colors = [
        '#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FFEAA7',
        '#DDA0DD', '#98D8C8', '#F7DC6F', '#BB8FCE', '#85C1E9'
      ];
      const hash = email.split('').reduce((acc, char) => {
        return char.charCodeAt(0) + ((acc << 5) - acc);
      }, 0);
      return colors[Math.abs(hash) % colors.length];
    }
    return '#7f5af0';
  };

  const handleLogout = async () => {
    try {
      const res = await post('/auth/logout');
      if (res.status === 200) {
        dispatch(removeUser());
        localStorage.removeItem('user');
        localStorage.removeItem('token');
        setUserProfile(null);
        toast.success(res.data.message || 'Logged out successfully');
        navigate('/');
      }
    } catch (err) {
      console.error(err);
      toast.error('Logout failed');
    }
  };

  const getUserName = () => {
    if (userProfile?.Fullname) return userProfile.Fullname;
    if (user?.fullName) return user.fullName;
    if (user?.Fullname) return user.Fullname;
    return 'User';
  };

  // Get user email to display
  const getUserEmail = () => {
    return userProfile?.email || user?.email || 'email@example.com';
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark ghh sticky-top shadow-sm" 
         style={{ zIndex: 1050 }}>
      <div className="container-fluid px-3 px-lg-4">
        
        <Link className="navbar-brand fw-bold fs-3 d-flex align-items-center" to="/">
          <span className="me-1" style={{ color: '#7f5af0' }}>SK</span>
          <span>Coder</span>
        </Link>

     
        <button
          className="navbar-toggler border-0"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#blogNavbar"
          aria-controls="blogNavbar"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="blogNavbar">
        
          <ul className="navbar-nav mx-lg-auto mb-3 mb-lg-0 gap-lg-3 text-center text-lg-start">
            <li className="nav-item">
              <Link className="nav-link px-3" to="/">Home</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link px-3" to="/blogs">Blogs</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link px-3" to="/categories">Categories</Link>
            </li>
            {user && (
              <li className="nav-item">
                <Link className="nav-link px-3 fw-semibold text-warning" to="/contact">
                  Contact Us
                </Link>
              </li>
            )}
          </ul>

        
          <div className="d-flex align-items-center gap-3 flex-column flex-lg-row">
           
            {!user ? (
              <Link to="/" className="w-100 w-lg-auto">
                <button  className="btn btn-primary rounded-pill px-4 w-100">
                  Sign In
                </button>
              </Link>
            ) : (
              <div className="d-flex align-items-center gap-3">
              
                <div className="d-none d-lg-block text-end">
                  <div className="text-light fw-medium">Welcome,{getUserName()}</div>
               
                </div>
                
                
                <div className="dropdown">
                  <button
                    className="btn p-0 border-0 bg-transparent"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                   
                    <div
                      className="rounded-circle overflow-hidden border border-2 border-primary d-flex align-items-center justify-content-center"
                      style={{ 
                        width: 45, 
                        height: 45,
                        backgroundColor: getAvatarColor(),
                        color: 'white',
                        fontSize: '1.2rem',
                        fontWeight: 'bold'
                      }}
                    >
                      {userProfile?.profile || user?.profile ? (
                        <img
                          src={`${BaseUrl}/images/${userProfile?.profile || user?.profile}`}
                          alt="profile"
                          className="w-100 h-100"
                          style={{ objectFit: 'cover' }}
                          onError={(e) => {
                            e.target.style.display = 'none';
                            e.target.parentElement.style.display = 'flex';
                            e.target.parentElement.textContent = getAvatarLetter();
                          }}
                        />
                      ) : (
                        <span>{getAvatarLetter()}</span>
                      )}
                    </div>
                  </button>

                
                  <ul className="dropdown-menu dropdown-menu-end dropdown-menu-dark shadow mt-3 fd">
                    <li>
                      <div className="px-3 py-2 d-flex align-items-center">
                      
                        <div
                          className="rounded-circle overflow-hidden border border-2 border-primary d-flex align-items-center justify-content-center me-3"
                          style={{ 
                            width: 45, 
                            height: 45,
                            backgroundColor: getAvatarColor(),
                            color: 'white',
                            fontSize: '1.2rem',
                            fontWeight: 'bold'
                          }}
                        >
                          {userProfile?.profile || user?.profile ? (
                            <img
                              src={`${BaseUrl}/images/${userProfile?.profile || user?.profile}`}
                              alt="profile"
                              className="w-100 h-100"
                              style={{ objectFit: 'cover' }}
                              onError={(e) => {
                                e.target.style.display = 'none';
                                e.target.parentElement.textContent = getAvatarLetter();
                              }}
                            />
                          ) : (
                            <span>{getAvatarLetter()}</span>
                          )}
                        </div>
                        <div>
                       
                          <div className="d-flex align-items-center gap-2 bg-light rounded-pill px-3 py-1 shadow-sm">
                            <i className="fas fa-envelope text-primary"></i>
                            <span className="text-dark fw-medium">{getUserEmail()}</span>
                          </div>
                        </div>
                      </div>
                    </li>
                    <li><hr className="dropdown-divider" /></li>
                    
                    {user.role === 'admin' && (
                      <li>
                        <Link className="dropdown-item" to="/dashboard">
                          <i className="fas fa-tachometer-alt me-2"></i>
                          Dashboard
                        </Link>
                      </li>
                    )}
                    
                    <li>
                      <Link className="dropdown-item" to={`/profile/${user._id}`}>
                        <i className="fas fa-user me-2"></i>
                        Profile
                      </Link>
                    </li>
                    
                    <li><hr className="dropdown-divider" /></li>
                    
                    <li>
                      <button
                        className="dropdown-item text-danger"
                        onClick={handleLogout}
                      >
                        <i className="fas fa-sign-out-alt me-2"></i>
                        Sign Out
                      </button>
                    </li>
                  </ul>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}