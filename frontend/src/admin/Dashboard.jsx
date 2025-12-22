import React, { useEffect, useState } from 'react';
import { get, del, BaseUrl } from '../services/EndPoint';
import { Link, useNavigate } from 'react-router-dom';
import { FaUsers, FaBlog, FaComments, FaChartLine, FaUserEdit, FaTrash, FaEye, FaCalendarAlt, FaArrowUp, FaArrowDown, FaHome, FaExclamationTriangle, FaCheck, FaTimes } from 'react-icons/fa';
import ConfirmModal from './ConfirmModal';
import SuccessToast from './SuccessToast';
import './Dashboard.css';

export default function Dashboard() {
  const [posts, setPosts] = useState([]);
  const [users, setUsers] = useState([]);
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('overview');
  const [recentPosts, setRecentPosts] = useState([]);
  const [recentUsers, setRecentUsers] = useState([]);
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalPosts: 0,
    totalComments: 0,
    todayPosts: 0,
    activeUsers: 0
  });

  const [modalConfig, setModalConfig] = useState({
    isOpen: false,
    title: '',
    message: '',
    type: 'danger',
    onConfirm: null,
    confirmText: 'Delete'
  });

  const [toast, setToast] = useState({
    show: false,
    message: '',
    type: 'success' // success, error, warning
  });

  const navigate = useNavigate();

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true);
        const response = await get('/dashboard');
        const data = response.data;
        
        if (!data.success) {
          showToast(data.message || 'Failed to load dashboard data', 'error');
          return;
        }
        
        setPosts(data.posts || []);
        setUsers(data.user || []);
        setComments(data.comments || []);
        
        const sortedPosts = [...(data.posts || [])].sort((a, b) => 
          new Date(b.createdAt) - new Date(a.createdAt)
        ).slice(0, 3);
        
        const sortedUsers = [...(data.user || [])].sort((a, b) => 
          new Date(b.createdAt) - new Date(a.createdAt)
        ).slice(0, 3);
        
        setRecentPosts(sortedPosts);
        setRecentUsers(sortedUsers);
        
        const today = new Date().toDateString();
        const todayPosts = (data.posts || []).filter(post => 
          new Date(post.createdAt).toDateString() === today
        ).length;
        
        const activeUsers = (data.user || []).filter(user => 
          user.lastLogin && new Date(user.lastLogin) > new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)
        ).length;
        
        setStats({
          totalUsers: data.user?.length || 0,
          totalPosts: data.posts?.length || 0,
          totalComments: data.comments?.length || 0,
          todayPosts,
          activeUsers
        });
        
        showToast('Dashboard loaded successfully!', 'success');
        
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
        showToast('Failed to load dashboard data', 'error');
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  const showToast = (message, type = 'success') => {
    setToast({
      show: true,
      message,
      type
    });
  };

  const showDeleteUserModal = (userId, userName) => {
    setModalConfig({
      isOpen: true,
      title: 'Delete User',
      message: `Are you sure you want to delete user: ${userName}? This action cannot be undone.`,
      type: 'danger',
      confirmText: 'Delete User',
      onConfirm: () => {
        handleDeleteUser(userId, userName);
        setModalConfig(prev => ({ ...prev, isOpen: false }));
      }
    });
  };

  const showDeletePostModal = (postId, postTitle) => {
    setModalConfig({
      isOpen: true,
      title: 'Delete Post',
      message: `Are you sure you want to delete post: "${postTitle}"? This action cannot be undone.`,
      type: 'danger',
      confirmText: 'Delete Post',
      onConfirm: () => {
        handleDeletePost(postId, postTitle);
        setModalConfig(prev => ({ ...prev, isOpen: false }));
      }
    });
  };

  const showDeleteCommentModal = (commentId) => {
    setModalConfig({
      isOpen: true,
      title: 'Delete Comment',
      message: 'Are you sure you want to delete this comment? This action cannot be undone.',
      type: 'warning',
      confirmText: 'Delete Comment',
      onConfirm: () => {
        handleDeleteComment(commentId);
        setModalConfig(prev => ({ ...prev, isOpen: false }));
      }
    });
  };

  const closeModal = () => {
    setModalConfig(prev => ({ ...prev, isOpen: false }));
  };

  const handleDeleteUser = async (userId, userName) => {
    try {
      const response = await del(`/dashboard/deleteuser/${userId}`);
      if (response.data.success) {
        showToast('User deleted successfully!', 'success');
        
        const updatedUsers = users.filter(user => user._id !== userId);
        setUsers(updatedUsers);
        
        const updatedRecentUsers = recentUsers.filter(user => user._id !== userId);
        setRecentUsers(updatedRecentUsers);
        
        setStats(prev => ({
          ...prev,
          totalUsers: prev.totalUsers - 1
        }));
      }
    } catch (error) {
      console.error('Error deleting user:', error);
      showToast(error.response?.data?.message || 'Failed to delete user', 'error');
    }
  };

  const handleDeletePost = async (postId, postTitle) => {
    try {
      const response = await del(`/blog/delete/${postId}`);
      if (response.data.success) {
        showToast('Post deleted successfully!', 'success');
        
        const updatedPosts = posts.filter(post => post._id !== postId);
        setPosts(updatedPosts);
        
        const updatedRecentPosts = recentPosts.filter(post => post._id !== postId);
        setRecentPosts(updatedRecentPosts);
        
        const today = new Date().toDateString();
        const isTodayPost = posts.find(p => p._id === postId)?.createdAt && 
          new Date(posts.find(p => p._id === postId).createdAt).toDateString() === today;
        
        setStats(prev => ({
          ...prev,
          totalPosts: prev.totalPosts - 1,
          todayPosts: isTodayPost ? prev.todayPosts - 1 : prev.todayPosts
        }));
      }
    } catch (error) {
      console.error('Error deleting post:', error);
      showToast(error.response?.data?.message || 'Failed to delete post', 'error');
    }
  };

  const handleDeleteComment = async (commentId) => {
    try {
      const response = await del(`/comments/delete/${commentId}`);
      if (response.data.success) {
        showToast('Comment deleted successfully!', 'success');
        
        const updatedComments = comments.filter(comment => comment._id !== commentId);
        setComments(updatedComments);
        
        setStats(prev => ({
          ...prev,
          totalComments: prev.totalComments - 1
        }));
      }
    } catch (error) {
      console.error('Error deleting comment:', error);
      showToast(error.response?.data?.message || 'Failed to delete comment', 'error');
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const getImageUrl = (imagePath) => {
    if (!imagePath) return null;
    return `${BaseUrl}/images/${imagePath}`;
  };

  const calculatePercentage = (current, previous) => {
    if (previous === 0) return 100;
    return ((current - previous) / previous * 100).toFixed(1);
  };

  if (loading) {
    return (
      <div className="dashboard-loading">
        <div className="loading-spinner"></div>
        <p>Loading Dashboard...</p>
      </div>
    );
  }

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <div className="header-content">
          <h1>
            <FaChartLine className="header-icon" />
            Admin Dashboard
          </h1>
          <p className="header-subtitle">Welcome to the admin control panel</p>
        </div>
      </div>

      <div className="stats-grid">
        <div className="stat-card stat-card-primary">
          <div className="stat-header">
            <div className="stat-title">
              <FaUsers className="stat-icon-small" />
              Total Users
            </div>
          </div>
          <div className="stat-number">{stats.totalUsers}</div>
          <div className="stat-subtext">
            <span className="stat-trend trend-up">
              <FaArrowUp className="trend-icon" /> {stats.activeUsers} active
            </span>
          </div>
        </div>

        <div className="stat-card stat-card-success">
          <div className="stat-header">
            <div className="stat-title">
              <FaBlog className="stat-icon-small" />
              Total Posts
            </div>
          </div>
          <div className="stat-number">{stats.totalPosts}</div>
          <div className="stat-subtext">
            <span className="stat-trend trend-up">
              <FaCalendarAlt className="trend-icon" /> {stats.todayPosts} today
            </span>
          </div>
        </div>

        <div className="stat-card stat-card-info">
          <div className="stat-header">
            <div className="stat-title">
              <FaComments className="stat-icon-small" />
              Total Comments
            </div>
          </div>
          <div className="stat-number">{stats.totalComments}</div>
          <div className="stat-subtext">
            <span className="stat-trend trend-up">
              <FaComments className="trend-icon" /> Recent
            </span>
          </div>
        </div>

        <div className="stat-card stat-card-warning">
          <div className="stat-header">
            <div className="stat-title">
              <FaChartLine className="stat-icon-small" />
              Activity
            </div>
          </div>
          <div className="stat-number">{recentPosts.length}</div>
          <div className="stat-subtext">
            <span className="stat-trend trend-up">
              <FaChartLine className="trend-icon" /> Recent posts
            </span>
          </div>
        </div>
      </div>

      <div className="tabs-container">
        <div className="tab-nav">
          <button 
            className={`tab-btn ${activeTab === 'overview' ? 'active' : ''}`}
            onClick={() => setActiveTab('overview')}
          >
            <FaHome className="tab-icon" />
            Overview
          </button>
          <button 
            className={`tab-btn ${activeTab === 'users' ? 'active' : ''}`}
            onClick={() => setActiveTab('users')}
          >
            <FaUsers className="tab-icon" />
            Users ({users.length})
          </button>
          <button 
            className={`tab-btn ${activeTab === 'posts' ? 'active' : ''}`}
            onClick={() => setActiveTab('posts')}
          >
            <FaBlog className="tab-icon" />
            Posts ({posts.length})
          </button>
          <button 
            className={`tab-btn ${activeTab === 'comments' ? 'active' : ''}`}
            onClick={() => setActiveTab('comments')}
          >
            <FaComments className="tab-icon" />
            Comments ({comments.length})
          </button>
        </div>
      </div>

      <div className="tab-content">
        {activeTab === 'overview' && (
          <div className="overview-content">
            <div className="overview-grid">
              <div className="overview-section">
                <div className="section-header">
                  <h3>
                    <FaBlog className="section-icon" />
                    Recent Posts
                  </h3>
                  <Link to="/blogs" className="view-all-btn">
                    View All
                  </Link>
                </div>
                <div className="table-container">
                  <table className="dashboard-table">
                    <thead>
                      <tr>
                        <th>Title</th>
                        <th>Category</th>
                        <th>Date</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {recentPosts.map(post => (
                        <tr key={post._id}>
                          <td className="post-title">
                            {post.title}
                          </td>
                          <td>
                            <span className="badge badge-info">{post.category || 'Uncategorized'}</span>
                          </td>
                          <td>{formatDate(post.createdAt)}</td>
                          <td>
                            <div className="action-btns">
                              <Link 
                                to={`/post/${post._id}`} 
                                className="btn-icon btn-view"
                                title="View"
                              >
                                <FaEye />
                              </Link>
                              <button 
                                className="btn-icon btn-delete"
                                onClick={() => showDeletePostModal(post._id, post.title)}
                                title="Delete"
                              >
                                <FaTrash />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                      {recentPosts.length === 0 && (
                        <tr>
                          <td colSpan="4" className="text-center text-muted py-3">
                            No recent posts found
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>

              <div className="overview-section">
                <div className="section-header">
                  <h3>
                    <FaUsers className="section-icon" />
                    Recent Users
                  </h3>
                </div>
                <div className="table-container">
                  <table className="dashboard-table">
                    <thead>
                      <tr>
                        <th>User</th>
                        <th>Email</th>
                        <th>Role</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {recentUsers.map(user => (
                        <tr key={user._id}>
                          <td>
                            <div className="user-info">
                              {user.profile && user.profile !== 'default.jpg' ? (
                                <img 
                                  src={getImageUrl(user.profile)}
                                  alt={user.Fullname}
                                  className="avatar"
                                  onError={(e) => {
                                    e.target.onerror = null;
                                    e.target.src = 'https://via.placeholder.com/40';
                                  }}
                                />
                              ) : (
                                <div className="avatar-placeholder">
                                  {user.Fullname?.charAt(0).toUpperCase() || 'U'}
                                </div>
                              )}
                              <span className="user-name">{user.Fullname}</span>
                            </div>
                          </td>
                          <td>{user.email}</td>
                          <td>
                            <span className={`badge ${user.role === 'admin' ? 'badge-danger' : 'badge-secondary'}`}>
                              {user.role}
                            </span>
                          </td>
                          <td>
                            <div className="action-btns">
                              <Link 
                                to={`/profile/${user._id}`} 
                                className="btn-icon btn-view"
                                title="View Profile"
                              >
                                <FaEye />
                              </Link>
                              <button 
                                className="btn-icon btn-delete"
                                onClick={() => showDeleteUserModal(user._id, user.Fullname)}
                                title="Delete User"
                              >
                                <FaTrash />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                      {recentUsers.length === 0 && (
                        <tr>
                          <td colSpan="4" className="text-center text-muted py-3">
                            No recent users found
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'users' && (
          <div className="users-content">
            <div className="section-header">
              <h3>All Users ({users.length})</h3>
            </div>
            <div className="table-container">
              <table className="dashboard-table">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Profile</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Role</th>
                    <th>Joined</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((user, index) => (
                    <tr key={user._id}>
                      <td>{index + 1}</td>
                      <td>
                        {user.profile && user.profile !== 'default.jpg' ? (
                          <img 
                            src={getImageUrl(user.profile)}
                            alt={user.Fullname}
                            className="avatar"
                            onError={(e) => {
                              e.target.onerror = null;
                              e.target.src = 'https://via.placeholder.com/40';
                            }}
                          />
                        ) : (
                          <div className="avatar-placeholder">
                            {user.Fullname?.charAt(0).toUpperCase() || 'U'}
                          </div>
                        )}
                      </td>
                      <td>{user.Fullname}</td>
                      <td>{user.email}</td>
                      <td>
                        <span className={`badge ${user.role === 'admin' ? 'badge-danger' : 'badge-success'}`}>
                          {user.role}
                        </span>
                      </td>
                      <td>{formatDate(user.createdAt)}</td>
                      <td>
                        <div className="action-btns">
                          <Link 
                            to={`/profile/${user._id}`} 
                            className="btn-icon btn-view"
                            title="View Profile"
                          >
                            <FaEye />
                          </Link>
                          <button 
                            className="btn-icon btn-edit"
                            title="Edit User"
                            onClick={() => navigate(`/profile/edit/${user._id}`)}
                          >
                            <FaUserEdit />
                          </button>
                          {user.role !== 'admin' && (
                            <button 
                              className="btn-icon btn-delete"
                              onClick={() => showDeleteUserModal(user._id, user.Fullname)}
                              title="Delete User"
                            >
                              <FaTrash />
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                  {users.length === 0 && (
                    <tr>
                      <td colSpan="7" className="text-center text-muted py-4">
                        No users found
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === 'posts' && (
          <div className="posts-content">
            <div className="section-header">
              <h3>All Posts ({posts.length})</h3>
              <Link to="/dashboard/addpost" className="btn btn-primary">
                <FaBlog className="me-2" />
                Add New Post
              </Link>
            </div>
            <div className="table-container">
              <table className="dashboard-table">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Image</th>
                    <th>Title</th>
                    <th>Category</th>
                    <th>Author</th>
                    <th>Created</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {posts.map((post, index) => (
                    <tr key={post._id}>
                      <td>{index + 1}</td>
                      <td>
                        {post.image && (
                          <img 
                            src={getImageUrl(post.image)}
                            alt={post.title}
                            className="post-image"
                            onError={(e) => {
                              e.target.onerror = null;
                              e.target.src = 'https://via.placeholder.com/60';
                            }}
                          />
                        )}
                      </td>
                      <td className="post-title">
                        {post.title}
                      </td>
                      <td>
                        <span className="badge badge-info">
                          {post.category || 'Uncategorized'}
                        </span>
                      </td>
                      <td>
                        {post.author?.Fullname || 'Unknown'}
                      </td>
                      <td>{formatDate(post.createdAt)}</td>
                      <td>
                        <div className="action-btns">
                          <Link 
                            to={`/blog/${post._id}`} 
                            className="btn-icon btn-view"
                            title="View"
                          >
                            <FaEye />
                          </Link>
                          <button 
                            className="btn-icon btn-edit"
                            title="Edit"
                            onClick={() => navigate(`/dashboard/editpost/${post._id}`)}
                          >
                            <FaUserEdit />
                          </button>
                          <button 
                            className="btn-icon btn-delete"
                            onClick={() => showDeletePostModal(post._id, post.title)}
                            title="Delete"
                          >
                            <FaTrash />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                  {posts.length === 0 && (
                    <tr>
                      <td colSpan="7" className="text-center text-muted py-4">
                        No posts found
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === 'comments' && (
          <div className="comments-content">
            <div className="section-header">
              <h3>Recent Comments ({comments.length})</h3>
            </div>
            {comments.length > 0 ? (
              <div className="table-container">
                <table className="dashboard-table">
                  <thead>
                    <tr>
                      <th>Comment</th>
                      <th>Post</th>
                      <th>User</th>
                      <th>Date</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {comments.map(comment => (
                      <tr key={comment._id}>
                        <td className="comment-text">
                          {comment.comments}
                        </td>
                        <td>
                          {comment.postid?.title || 'Unknown Post'}
                        </td>
                        <td>
                          {comment.userid?.Fullname || 'Unknown User'}
                        </td>
                        <td>{formatDate(comment.createdAt)}</td>
                        <td>
                          <button 
                            className="btn-icon btn-delete"
                            onClick={() => showDeleteCommentModal(comment._id)}
                            title="Delete"
                          >
                            <FaTrash />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="empty-state">
                <FaComments className="empty-icon" />
                <h4>No Comments Yet</h4>
                <p>There are no comments to display</p>
              </div>
            )}
          </div>
        )}
      </div>

      <ConfirmModal
        isOpen={modalConfig.isOpen}
        onClose={closeModal}
        onConfirm={modalConfig.onConfirm}
        title={modalConfig.title}
        message={modalConfig.message}
        type={modalConfig.type}
        confirmText={modalConfig.confirmText}
      />

      {toast.show && (
        <SuccessToast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast({ show: false, message: '', type: 'success' })}
        />
      )}
    </div>
  );
}