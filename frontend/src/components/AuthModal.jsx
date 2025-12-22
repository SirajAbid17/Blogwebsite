import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { post, get } from '../services/EndPoint'
import { useDispatch, useSelector } from 'react-redux'
import toast from 'react-hot-toast'
import { setUser } from '../reduex/AuthSlice'

export default function AuthModal({ isOpen, onClose, defaultMode = 'login' }) {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const currentUser = useSelector((state) => state.auth.user)
  
  const [mode, setMode] = useState(defaultMode) 
  const [loading, setLoading] = useState(false)
  

  const [loginData, setLoginData] = useState({
    email: '',
    password: ''
  })

  const [registerData, setRegisterData] = useState({
    FullName: '',
    email: '',
    password: '',
    image: null,
    previewImage: null
  })

  
  const [userProfile, setUserProfile] = useState(null)


  useEffect(() => {
    if (currentUser && currentUser._id) {
      fetchUserProfile(currentUser._id)
    }
  }, [currentUser])

  const fetchUserProfile = async (userId) => {
    try {
      const response = await get(`/auth/user/${userId}`)
      if (response.data.success) {
        setUserProfile(response.data.user)
      }
    } catch (error) {
      console.error('Error fetching user profile:', error)
    }
  }

 
  const handleLoginChange = (e) => {
    setLoginData({
      ...loginData,
      [e.target.name]: e.target.value
    })
  }

  // Handle register input changes
  const handleRegisterChange = (e) => {
    setRegisterData({
      ...registerData,
      [e.target.name]: e.target.value
    })
  }


  const handleImageChange = (e) => {
    const file = e.target.files[0]
    if (file) {
  
      if (file.size > 5 * 1024 * 1024) {
        toast.error("Image size should be less than 5MB")
        return
      }
      
      
      const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp']
      if (!validTypes.includes(file.type)) {
        toast.error("Please select a valid image (JPG, PNG, GIF, WebP)")
        return
      }
      
      setRegisterData({ 
        ...registerData, 
        image: file,
        previewImage: URL.createObjectURL(file)
      })
    }
  }

  
  const triggerImageUpload = () => {
    document.getElementById('profileImageInput').click()
  }

 
  const handleLoginSubmit = async (e) => {
    e.preventDefault()
    
  
    if (!loginData.email.trim()) {
      toast.error("Please enter your email")
      return
    }
    
    if (!loginData.password) {
      toast.error("Please enter your password")
      return
    }
    
    setLoading(true)
    
    try {
      const response = await post('/auth/login', loginData)
      
      if (response.status === 200) {
        const userData = response.data.user
        dispatch(setUser(userData))
        
       
        localStorage.setItem('user', JSON.stringify({
          _id: userData._id,
          Fullname: userData.Fullname,
          email: userData.email,
          profile: userData.profile,
          role: userData.role
        }))
        
        
        if (response.data.token) {
          localStorage.setItem('token', response.data.token)
        }
        
        onClose() 
        navigate('/')
        toast.success(response.data.message || 'Login successful!')
    
        setLoginData({
          email: '',
          password: ''
        })
      }
    } catch (error) {
      console.error("Login error", error)
      if (error.response?.data?.message) {
        toast.error(error.response.data.message)
      } else if (error.response?.status === 401) {
        toast.error("Invalid email or password")
      } else if (error.response?.status === 404) {
        toast.error("User not found. Please register first.")
      } else {
        toast.error("Login failed. Please try again.")
      }
    } finally {
      setLoading(false)
    }
  }

 
  const handleRegisterSubmit = async (e) => {
    e.preventDefault()
    
   
    if (!registerData.fullName.trim()) {
      toast.error("Please enter your full name")
      return
    }
    
    if (!registerData.email.trim()) {
      toast.error("Please enter your email")
      return
    }
    
    if (!registerData.password) {
      toast.error("Please enter a password")
      return
    }
    
    if (registerData.password.length < 6) {
      toast.error("Password must be at least 6 characters")
      return
    }
    
    setLoading(true)
    
    const formData = new FormData()
    formData.append('FullName', registerData.fullName.trim())
    formData.append('email', registerData.email.trim())
    formData.append('password', registerData.password)
    if (registerData.image) {
      formData.append('profile', registerData.image)
    }

    try {
      const response = await post('/auth/register', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      
      if (response.data.success) {
        toast.success(response.data.message || 'Registration successful!')
        
        
        setMode('login')
        
        
        setRegisterData({
          fullName: '',
          email: '',
          password: '',
          image: null,
          previewImage: null
        })
        
        
        setLoginData({
          email: registerData.email,
          password: ''
        })
        
        
        document.getElementById('profileImageInput').value = ''
      }
    } catch (error) {
      if (error.response?.data?.message) {
        toast.error(error.response.data.message)
      } else if (error.response?.status === 400) {
        toast.error("User already exists. Please login.")
      } else if (error.response?.status === 413) {
        toast.error("Image file too large. Please use smaller image.")
      } else {
        toast.error("Registration failed. Please try again.")
      }
    } finally {
      setLoading(false)
    }
  }


  const toggleMode = () => {
    setMode(mode === 'login' ? 'register' : 'login')
  }

  const handleModalClose = () => {
    onClose()
  }

  
  if (!isOpen) return null

  return (
    <div className="auth-modal-overlay">
      <div className="auth-modal-container">
        <div className="auth-modal-main">
          
         
          <button 
            className="auth-modal-close" 
            onClick={handleModalClose}
            disabled={loading}
            aria-label="Close modal"
          >
            &times;
          </button>
          
      
          <div className="auth-modal-header">
            <div className="auth-logo">
              <span className="logo-text">SK</span>
              <span className="logo-text-alt">Coder</span>
            </div>
            
            <div className="auth-title-section">
              <h2 className="auth-modal-title">
                {mode === 'login' ? 'Welcome Back!' : 'Join Our Community'}
              </h2>
              <p className="auth-modal-subtitle">
                {mode === 'login' ? 'Sign in to access exclusive content' : 'Start your coding journey with us'}
              </p>
            </div>
            
            
            <div className="mode-toggle-container">
              <button 
                className={`mode-toggle-btn ${mode === 'login' ? 'active' : ''}`}
                onClick={() => setMode('login')}
                disabled={loading}
                type="button"
              >
                <i className="fas fa-sign-in-alt me-1"></i>
                Login
              </button>
              <button 
                className={`mode-toggle-btn ${mode === 'register' ? 'active' : ''}`}
                onClick={() => setMode('register')}
                disabled={loading}
                type="button"
              >
                <i className="fas fa-user-plus me-1"></i>
                Register
              </button>
            </div>
          </div>

       
          <div className="auth-modal-body">
            
         
            {mode === 'login' && (
              <form className="auth-form login-form" onSubmit={handleLoginSubmit}>
                <div className="input-group-small">
                  <div className="input-icon-small">
                    <i className="fas fa-envelope"></i>
                  </div>
                  <input
                    type="email"
                    name="email"
                    value={loginData.email}
                    onChange={handleLoginChange}
                    placeholder="Email"
                    required
                    disabled={loading}
                    className="form-input-small"
                    autoComplete="email"
                  />
                </div>

                <div className="input-group-small">
                  <div className="input-icon-small">
                    <i className="fas fa-lock"></i>
                  </div>
                  <input
                    type="password"
                    name="password"
                    value={loginData.password}
                    onChange={handleLoginChange}
                    placeholder="Password"
                    required
                    disabled={loading}
                    className="form-input-small"
                    autoComplete="current-password"
                  />
                </div>

                <button 
                  type="submit" 
                  className="submit-btn-small primary-btn"
                  disabled={loading}
                >
                  {loading ? (
                    <>
                      <span className="btn-spinner-small"></span>
                      Signing In...
                    </>
                  ) : (
                    <>
                      <i className="fas fa-sign-in-alt me-1"></i>
                      Sign In
                    </>
                  )}
                </button>
              </form>
            )}

         
            {mode === 'register' && (
              <form className="auth-form register-form" onSubmit={handleRegisterSubmit}>
               
                <div className="profile-upload-section-small">
                  <div 
                    className="profile-image-wrapper-small"
                    onClick={triggerImageUpload}
                    role="button"
                    tabIndex={0}
                    onKeyPress={(e) => e.key === 'Enter' && triggerImageUpload()}
                  >
                    <div className="profile-image-circle-small">
                      {registerData.previewImage ? (
                        <img
                          src={registerData.previewImage}
                          alt="Profile preview"
                          className="profile-image-small"
                          onError={(e) => {
                            e.target.src = `https://ui-avatars.com/api/?name=${registerData.fullName || 'U'}&background=667eea&color=fff&size=100`
                          }}
                        />
                      ) : (
                        <img
                          src={`https://ui-avatars.com/api/?name=${registerData.fullName || 'U'}&background=667eea&color=fff&size=100`}
                          alt="Default profile"
                          className="profile-image-small"
                        />
                      )}
                      <div className="profile-image-overlay-small">
                        <i className="fas fa-camera"></i>
                      </div>
                    </div>
                    <p className="profile-image-hint-small">Click to upload (Optional)</p>
                  </div>
                  <input
                    type="file"
                    id="profileImageInput"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="d-none"
                  />
                </div>

                <div className="input-group-small">
                  <div className="input-icon-small">
                    <i className="fas fa-user"></i>
                  </div>
                  <input
                    type="text"
                    name="fullName"
                    value={registerData.fullName}
                    onChange={handleRegisterChange}
                    placeholder="Full name"
                    required
                    disabled={loading}
                    className="form-input-small"
                    autoComplete="name"
                  />
                </div>

                <div className="input-group-small">
                  <div className="input-icon-small">
                    <i className="fas fa-envelope"></i>
                  </div>
                  <input
                    type="email"
                    name="email"
                    value={registerData.email}
                    onChange={handleRegisterChange}
                    placeholder="Email"
                    required
                    disabled={loading}
                    className="form-input-small"
                    autoComplete="email"
                  />
                </div>

                <div className="input-group-small">
                  <div className="input-icon-small">
                    <i className="fas fa-lock"></i>
                  </div>
                  <input
                    type="password"
                    name="password"
                    value={registerData.password}
                    onChange={handleRegisterChange}
                    placeholder="Password (min. 6 characters)"
                    required
                    disabled={loading}
                    className="form-input-small"
                    autoComplete="new-password"
                    minLength="6"
                  />
                </div>

                <button 
                  type="submit" 
                  className="submit-btn-small primary-btn"
                  disabled={loading}
                >
                  {loading ? (
                    <>
                      <span className="btn-spinner-small"></span>
                      Creating Account...
                    </>
                  ) : (
                    <>
                      <i className="fas fa-user-plus me-1"></i>
                      Create Account
                    </>
                  )}
                </button>
              </form>
            )}
          </div>

      
          <div className="auth-modal-footer-small">
            <p className="footer-text-small">
              {mode === 'login' ? "No account yet?" : "Already have an account?"}
              <button 
                className="switch-mode-btn-small"
                onClick={toggleMode}
                disabled={loading}
                type="button"
              >
                {mode === 'login' ? ' Sign Up' : ' Sign In'}
              </button>
            </p>
          </div>

       
          {currentUser && (
            <div className="current-user-info" style={{
              padding: '10px',
              marginTop: '15px',
              borderTop: '1px solid rgba(255,255,255,0.1)',
              fontSize: '12px',
              color: '#94a3b8'
            }}>
              <p style={{ margin: '5px 0' }}>
                <strong>Logged in as:</strong> {currentUser.Fullname || currentUser.fullName}
              </p>
              <p style={{ margin: '5px 0' }}>
                <strong>Email:</strong> {currentUser.email}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}