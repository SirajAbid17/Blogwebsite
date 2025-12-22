import React, { useEffect, useState, useCallback } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import Navbar from './Navbar'
import Footer from './Footer'
import { BaseUrl, get } from '../services/EndPoint'
import { useSelector, useDispatch } from 'react-redux'
import { setUser } from '../reduex/AuthSlice'
import './Profile.css'
import toast from 'react-hot-toast'
import { 
  FaEdit, FaCamera, FaCalendarAlt, FaEnvelope, FaUserTag, 
  FaSignOutAlt, FaBook, FaPen, FaTrash, FaComment,
  FaThumbsUp, FaEye, FaChartBar, FaComments, FaUsers
} from 'react-icons/fa'

export default function Profile() {
  const { id } = useParams()
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const currentUser = useSelector((state) => state.auth.user)
  
  const targetUserId = id || (currentUser ? currentUser._id : null)
  
  const [user, setUser] = useState(null)
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [activeTab, setActiveTab] = useState('posts')
  const [stats, setStats] = useState({
    totalPosts: 0,
  })

  const [editMode, setEditMode] = useState(false)
  const [editData, setEditData] = useState({
    Fullname: '',
    email: '',
    bio: '',
    profileImage: null,
    previewImage: null
  })

 
  const isCurrentUser = currentUser && user && currentUser._id === user._id

 
  const getImageUrl = useCallback((imageName, userName) => {
    if (!imageName || imageName === 'default.jpg') {
      return `https://ui-avatars.com/api/?name=${userName || 'User'}&background=667eea&color=fff&size=200&bold=true&font-size=0.8`
    }
    
    if (imageName.startsWith('http')) {
      return imageName
    }
    
    return `${BaseUrl}/images/${imageName}`
  }, [])


  

  
  useEffect(() => {
    if (targetUserId) {
      fetchUserProfile()
    } else {
      setLoading(false)
      setError('Please login to view your profile')
    }
  }, [targetUserId])

  const fetchUserProfile = async () => {
    try {
      setLoading(true)
      setError(null)

     
      const userResponse = await get(`/auth/user/${targetUserId}`)
      
      if (userResponse.data.success) {
        const fetchedUser = userResponse.data.user
        setUser(fetchedUser)
        
        setEditData({
          Fullname: fetchedUser.Fullname || '',
          email: fetchedUser.email || '',
          bio: fetchedUser.bio || '',
          profileImage: null,
          previewImage: null
        })
        
        
        await Promise.all([
          fetchUserPosts(fetchedUser._id),
        
        ])
      } else {
        throw new Error(userResponse.data.message || 'User not found')
      }

    } catch (error) {
      console.error('Profile fetch error:', error)
      setError(error.message || 'Failed to load user profile.')
    } finally {
      setLoading(false)
    }
  }

  const fetchUserPosts = async (userId) => {
    try {
      const allPostsResponse = await get('/blog/showall')
      
      if (allPostsResponse.data?.posts) {
        const allPosts = allPostsResponse.data.posts
        const userPosts = allPosts.filter(post => 
          post.author && post.author._id === userId
        )
        setPosts(userPosts)
        
       
     
        setStats(prev => ({
          ...prev,
          totalPosts: userPosts.length,
         
         
        }))
      }
    } catch (postsError) {
      console.error('Failed to fetch posts:', postsError)
    }
  }

  const handleEditToggle = () => {
    setEditMode(!editMode)
    if (!editMode && user) {
      setEditData({
        Fullname: user.Fullname || '',
        email: user.email || '',
        bio: user.bio || '',
        profileImage: null,
        previewImage: null
      })
    }
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setEditData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleImageChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      if (file.size > 2 * 1024 * 1024) {
        toast.error('Image size should be less than 2MB')
        return
      }
      
      const reader = new FileReader()
      reader.onloadend = () => {
        setEditData(prev => ({
          ...prev,
          profileImage: file,
          previewImage: reader.result
        }))
      }
      reader.readAsDataURL(file)
    }
  }

  const handleProfileUpdate = async (e) => {
    e.preventDefault()
    try {
      const formData = new FormData()
      formData.append('Fullname', editData.Fullname)
      formData.append('email', editData.email)
      formData.append('bio', editData.bio)
      
      if (editData.profileImage) {
        formData.append('profile', editData.profileImage)
      }

      const response = await fetch(`${BaseUrl}/auth/update/${user._id}`, {
        method: 'PUT',
        body: formData,
        credentials: 'include'
      })

      const data = await response.json()
      
      if (data.success) {
        toast.success('Profile updated successfully!')
        setUser(data.user)
        if (currentUser._id === user._id) {
          dispatch(setUser(data.user))
        }
        setEditMode(false)
       
        fetchUserProfile()
      } else {
        toast.error(data.message || 'Failed to update profile')
      }
    } catch (error) {
      console.error('Update error:', error)
      toast.error('Failed to update profile')
    }
  }

  const handleDeletePost = async (postId) => {
    if (window.confirm('Are you sure you want to delete this post?')) {
      try {
        const response = await fetch(`${BaseUrl}/blog/delete/${postId}`, {
          method: 'DELETE',
          credentials: 'include'
        })
        
        const data = await response.json()
        
        if (data.success) {
          toast.success('Post deleted successfully')
         
          await fetchUserProfile()
        } else {
          toast.error(data.message || 'Failed to delete post')
        }
      } catch (error) {
        console.error('Delete error:', error)
        toast.error('Failed to delete post')
      }
    }
  }

  const formatDate = (dateString) => {
    if (!dateString) return 'Unknown'
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }


  const getPostImageUrl = (imageName) => {
    if (!imageName) {
      return 'https://via.placeholder.com/400x250/667eea/ffffff?text=Blog+Post'
    }
    return `${BaseUrl}/images/${imageName}`
  }


  if (loading) {
    return (
      <div className="profile-container">
        <Navbar />
        <div className="profile-loading">
          <div className="spinner-border text-primary" role="status" style={{width: '3rem', height: '3rem'}}>
            <span className="visually-hidden">Loading...</span>
          </div>
          <h4 className="mt-4 text-white">Loading Profile...</h4>
          <p className="text-muted">Please wait while we fetch your data</p>
        </div>
        <Footer />
      </div>
    )
  }

 
  if (error && !user) {
    return (
      <div className="profile-container">
        <Navbar />
        <div className="profile-error">
          <div className="error-icon">
            <i className="fas fa-exclamation-triangle"></i>
          </div>
          <h3 className="mb-3">Profile Error</h3>
          <p className="text-muted mb-4">{error}</p>
          <div className="d-flex justify-content-center gap-2">
            {!currentUser ? (
              <button 
                className="btn btn-primary"
                onClick={() => navigate('/login')}
              >
                <FaSignOutAlt className="me-2" /> Login
              </button>
            ) : (
              <button 
                className="btn btn-primary"
                onClick={() => navigate('/profile')}
              >
                <FaUserTag className="me-2" /> Your Profile
              </button>
            )}
            <button 
              className="btn btn-outline-primary"
              onClick={() => navigate('/')}
            >
              Home
            </button>
          </div>
        </div>
        <Footer />
      </div>
    )
  }


  if (!user) {
    return (
      <div className="profile-container">
        <Navbar />
        <div className="profile-not-found">
          <div className="not-found-icon">
            <i className="fas fa-user-slash"></i>
          </div>
          <h3 className="mb-3">User Not Found</h3>
          <p className="text-muted mb-4">The profile you're looking for doesn't exist.</p>
          <div className="d-flex justify-content-center gap-2">
            {currentUser && (
              <button 
                className="btn btn-primary"
                onClick={() => navigate('/profile')}
              >
                Your Profile
              </button>
            )}
            <button 
              className="btn btn-outline-primary"
              onClick={() => navigate('/')}
            >
              Go Home
            </button>
          </div>
        </div>
        <Footer />
      </div>
    )
  }

  return (
    <div className="profile-container">
      <Navbar />

      <div className="profile-header">
        <div className="container">
          <div className="row align-items-center">
           
            <div className="col-md-3 text-center">
              <div className="profile-image-container">
                <div className="profile-image-wrapper">
                  <img
                    src={editData.previewImage || getImageUrl(user.profile, user.Fullname)}
                    alt={user.Fullname}
                    className="profile-image profile-image-updating"
                    onError={(e) => {
                      e.target.src = `https://ui-avatars.com/api/?name=${user.Fullname || 'User'}&background=667eea&color=fff&size=200&bold=true`
                    }}
                  />
                  {isCurrentUser && (
                    <label className="image-upload-overlay">
                      <FaCamera className="camera-icon" />
                      <input
                        type="file"
                        className="d-none"
                        accept="image/*"
                        onChange={handleImageChange}
                      />
                    </label>
                  )}
                </div>
              </div>
              
              {isCurrentUser && (
                <div className="mt-3">
                  <button 
                    className="btn btn-gradient editpr"
                    onClick={handleEditToggle}
                  >
                    <FaEdit className="me-2" />
                    {editMode ? 'Cancel Edit' : 'Edit Profile'}
                  </button>
                </div>
              )}
            </div>

            <div className="col-md-9">
              <div className="profile-info">
                <div className="d-flex justify-content-between align-items-start">
                  <div>
                    <h1 className="profile-name">
                      {user.Fullname}
                     
                    </h1>
                    <p className="profile-email">
                      <FaEnvelope className="me-2" />
                      {user.email}
                    </p>
                    <p className="profile-role">
                      <FaUserTag className="me-2" />
                      {isCurrentUser ? 'Your Profile' : 'Blogger'} • Member since {formatDate(user.createdAt)}
                    </p>
                    
                    {user.bio && (
                      <div className="profile-bio mt-3">
                        <p className="mb-0">{user.bio}</p>
                      </div>
                    )}
                  </div>
                </div>

              
                <div className="profile-stats-grid">
                  <div className="stat-row">
                    <div className="stat-number">{stats.totalPosts}</div>
                    <div className="stat-label">
                      <FaBook className="me-2" /> Posts
                    </div>
                  </div>
               
                  
               
                
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

    
      {editMode && isCurrentUser && (
        <div className="profile-edit-form-container">
          <div className="container">
            <div className="profile-edit-form">
              <div className="form-header">
                <h4><FaEdit className="me-2" /> Edit Profile</h4>
                <p>Update your personal information</p>
              </div>
              
              <form onSubmit={handleProfileUpdate}>
                <div className="row">
                  <div className="col-md-6 mb-3">
                    <label className="form-label">Full Name</label>
                    <input
                      type="text"
                      name="Fullname"
                      className="form-control form-control-profile"
                      value={editData.Fullname}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  
                  <div className="col-md-6 mb-3">
                    <label className="form-label">Email Address</label>
                    <input
                      type="email"
                      name="email"
                      className="form-control form-control-profile"
                      value={editData.email}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  
                  <div className="col-12 mb-4">
                    <label className="form-label">Bio</label>
                    <textarea
                      name="bio"
                      className="form-control form-control-profile"
                      rows="4"
                      value={editData.bio}
                      onChange={handleInputChange}
                      placeholder="Tell us about yourself..."
                      maxLength="200"
                    />
                    <div className="form-text">
                      {editData.bio.length}/200 characters
                    </div>
                  </div>
                  
                  <div className="col-12">
                    <div className="d-flex gap-2">
                      <button 
                        type="submit" 
                        className="btn btn-gradient"
                      >
                        <FaEdit className="me-2" /> Save Changes
                      </button>
                      <button 
                        type="button" 
                        className="btn btn-outline-light"
                        onClick={handleEditToggle}
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

     
      <div className="profile-tabs">
        <div className="container">
          <nav>
            <div className="nav nav-tabs" id="profile-tab">
              <button
                className={`nav-link ${activeTab === 'posts' ? 'active' : ''}`}
                onClick={() => setActiveTab('posts')}
              >
                <FaBook className="me-2" /> Posts ({posts.length})
              </button>
             
              <button
                className={`nav-link ${activeTab === 'about' ? 'active' : ''}`}
                onClick={() => setActiveTab('about')}
              >
                <FaUserTag className="me-2" /> About
              </button>
            </div>
          </nav>
        </div>
      </div>


      <div className="profile-content">
        <div className="container">
         
          {activeTab === 'posts' && (
            <div className="tab-pane fade show active">
              {isCurrentUser && posts.length === 0 && (
                <div className="empty-state">
                  <div className="empty-icon">
                    <FaPen />
                  </div>
                  <h4>No Posts Yet</h4>
                  <p className="text-muted mb-4">Start sharing your thoughts with the world</p>
                  {user.role === 'admin' && (
                    <button 
                      className="btn btn-gradient"
                      onClick={() => navigate('/create-post')}
                    >
                      <FaPen className="me-2" /> Create Your First Post
                    </button>
                  )}
                </div>
              )}

              {!isCurrentUser && posts.length === 0 && (
                <div className="empty-state">
                  <div className="empty-icon">
                    <FaBook />
                  </div>
                  <h4>No Posts Available</h4>
                  <p className="text-muted">This user hasn't published any posts yet</p>
                </div>
              )}

              {posts.length > 0 && (
                <>
                  <div className="row mb-4">
                    {posts.map(post => (
                      <div className="col-md-4 mb-4" key={post._id}>
                        <div className="profile-post-card">
                          <div className="post-image-container">
                            <img
                              src={getPostImageUrl(post.image)}
                              alt={post.title}
                              className="post-image"
                              onError={(e) => {
                                e.target.src = 'https://via.placeholder.com/400x250/667eea/ffffff?text=Blog+Post'
                              }}
                            />
                            <span className="post-category">
                              {post.category || 'General'}
                            </span>
                            {isCurrentUser && (
                              <div className="post-admin-actions">
                                <button 
                                  className="btn btn-sm btn-danger"
                                  onClick={() => handleDeletePost(post._id)}
                                  title="Delete Post"
                                >
                                  <FaTrash />
                                </button>
                              </div>
                            )}
                          </div>
                          <div className="post-content">
                            <h5 className="post-title">
                              <Link to={`/post/${post._id}`}>
                                {post.title}
                              </Link>
                            </h5>
                            <p className="post-description">
                              {post.description?.substring(0, 100)}...
                            </p>
                            
                           
                            
                            <div className="post-actions">
                              <Link 
                                to={`/post/${post._id}`}
                                className="btn btn-sm btn-gradient"
                              >
                                Read More
                              </Link>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </>
              )}
            </div>
          )}

      
          
          {activeTab === 'about' && (
            <div className="tab-pane fade show active">
              <div className="row">
                <div className="col-lg-8">
                  <div className="about-section">
                    <h4>About {user.Fullname}</h4>
                    {user.bio ? (
                      <div className="user-bio">
                        <p>{user.bio}</p>
                      </div>
                    ) : (
                      <div className="no-bio">
                        <p className="text-muted">
                          <i>
                            {isCurrentUser 
                              ? 'No bio added yet. Add a bio to tell others about yourself!' 
                              : 'This user hasn\'t added a bio yet.'}
                          </i>
                        </p>
                        {isCurrentUser && (
                          <button 
                            className="btn btn-sm btn-gradient"
                            onClick={handleEditToggle}
                          >
                            <FaEdit className="me-2" /> Add Bio
                          </button>
                        )}
                      </div>
                    )}
                    
                    <div className="about-details mt-4">
                      <div className="detail-item">
                        <strong><FaEnvelope className="me-2" /> Email:</strong> 
                        <span className="ms-2">{user.email}</span>
                      </div>
                      <div className="detail-item">
                        <strong><FaUserTag className="me-2" /> Role:</strong> 
                        <span className={`role-badge ${user.role}`}>
                          {user.role === 'admin' ? 'Administrator' : 'Blogger'}
                        </span>
                      </div>
                      <div className="detail-item">
                        <strong><FaCalendarAlt className="me-2" /> Member Since:</strong> 
                        <span className="ms-2">{formatDate(user.createdAt)}</span>
                      </div>
                      <div className="detail-item">
                        <strong><FaChartBar className="me-2" /> Activity Stats:</strong>
                        <div className="d-flex flex-wrap gap-2 ms-2">
                          <span className="badge bg-primary">{stats.totalPosts} Posts</span>
                        
                         
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                
              </div>
            </div>
          )}
        </div>
      </div>

      <Footer />
    </div>
  )
}