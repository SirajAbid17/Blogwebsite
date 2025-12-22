import React, { useState } from 'react';
import { post } from '../services/EndPoint';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import AdminLayout from './AdminLayout'; 
import './AddPost.css'; 

export default function AddPost() {
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState(null);
  const [category, setCategory] = useState('');
  const [loading, setLoading] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
    
      if (file.size > 5 * 1024 * 1024) {
        toast.error("Image size should be less than 5MB");
        return;
      }
      
    
      const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp'];
      if (!validTypes.includes(file.type)) {
        toast.error("Please select a valid image (JPG, PNG, GIF, WebP)");
        return;
      }
      
      setImage(file);
      
     
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
   
    if (!title.trim()) {
      toast.error("Please enter a title");
      return;
    }
    
    if (!description.trim()) {
      toast.error("Please enter content");
      return;
    }
    
    if (!image) {
      toast.error("Please select an image");
      return;
    }

    setLoading(true);

    try {
      const formData = new FormData();
      formData.append('profile', image);
      formData.append('title', title.trim());
      formData.append('description', description.trim());
      
      if (category && category.trim()) {
        formData.append('category', category.trim());
      }

      const response = await post('/blog/create', formData, {
          headers: {
              'Content-Type': 'multipart/form-data'
          },
          withCredentials: true
      });

      if (response.data.success) {
        toast.success(response.data.message || "Post created successfully!");
        
       
        setTitle('');
        setDescription('');
        setCategory('');
        setImage(null);
        setImagePreview(null);
        
        
        setTimeout(() => {
          navigate('/blogs');
        }, 1500);
      } else {
        toast.error(response.data.message || "Post creation failed");
      }

    } catch (error) {
      console.error('Error:', error);
      if (error.response?.data?.message) {
        toast.error(error.response.data.message);
      } else if (error.response?.status === 413) {
        toast.error("File size too large. Please use a smaller image.");
      } else {
        toast.error("Failed to create post. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleClearForm = () => {
    if (title || description || category || imagePreview) {
      setTitle('');
      setDescription('');
      setCategory('');
      setImage(null);
      setImagePreview(null);
      toast.success('Form cleared');
    }
  };

  return (
    <AdminLayout>
      <div className="add-post-page">
        <main className="add-post-main">
          <div className="form-card">
            <div className="form-header">
              <h3 className="form-title">
                <i className="bi bi-plus-circle me-2"></i> New Post Details
              </h3>
              <p className="form-subtitle">
                Fill in all required fields to publish your post
              </p>
            </div>
            
         
            <div className="form-body">
              <form onSubmit={handleSubmit} encType="multipart/form-data">
              
                <div className="form-group">
                  <label className="form-label">
                    <i className="bi bi-type me-2"></i> Post Title *
                  </label>
                  <input 
                    type="text" 
                    className="form-control" 
                    placeholder="Enter a compelling title..." 
                    value={title} 
                    onChange={(e) => setTitle(e.target.value)} 
                    required 
                    maxLength={100} 
                  />
                  <div className="character-count">
                    {title.length}/100 characters
                  </div>
                </div>
                
             
                <div className="form-group">
                  <label className="form-label">
                    <i className="bi bi-image me-2"></i> Featured Image *
                  </label>
                  <div className="image-upload-area">
                    {imagePreview ? (
                      <div className="image-preview-container">
                        <img src={imagePreview} alt="Preview" className="image-preview" />
                        <button 
                          type="button" 
                          className="remove-image-btn"
                          onClick={() => {
                            setImage(null);
                            setImagePreview(null);
                          }}
                        >
                          <i className="bi bi-x-lg"></i>
                        </button>
                      </div>
                    ) : (
                      <label className="upload-placeholder">
                        <i className="bi bi-cloud-arrow-up upload-icon"></i>
                        <span className="upload-text">Click to upload image</span>
                        <input 
                          type="file" 
                          className="file-input" 
                          onChange={handleImageChange} 
                          accept="image/*" 
                          required 
                        />
                      </label>
                    )}
                  </div>
                </div>
                
              
                <div className="form-group">
                  <label className="form-label">
                    <i className="bi bi-tags me-2"></i> Suggested Categories
                  </label>
                  <div className="tag-list">
                    {['Technology', 'Programming', 'Web Development', 'Design', 'Tutorial', 'Tips'].map(tag => (
                      <span 
                        key={tag} 
                        className={`category-tag ${category === tag ? 'active' : ''}`}
                        onClick={() => setCategory(tag)}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
             
                <div className="form-group">
                  <label className="form-label">
                    <i className="bi bi-tag me-2"></i> Category
                  </label>
                  <input 
                    type="text" 
                    className="form-control" 
                    placeholder="e.g., Technology, Programming, Tutorial" 
                    value={category} 
                    onChange={(e) => setCategory(e.target.value)} 
                    maxLength={50} 
                  />
                  <div className="form-hint">
                    Optional - Helps readers find your content
                  </div>
                </div>
                
             
                <div className="form-group">
                  <label className="form-label">
                    <i className="bi bi-text-paragraph me-2"></i> Content 
                  </label>
                  
                  <textarea 
                    className="form-control content-textarea" 
                    rows="10" 
                    placeholder="Write your amazing content here..." 
                    value={description} 
                    onChange={(e) => setDescription(e.target.value)} 
                    required 
                    minLength={50}
                  ></textarea>
                  <div className="content-info">
                    <div className="character-count">
                      {description.length} characters
                    </div>
                    <div className="form-hint">
                      Minimum 50 characters required
                    </div>
                  </div>
                </div>
                
             
                <div className="form-actions">
                  <button 
                    type="submit" 
                    className="submit-btn" 
                    disabled={loading}
                  >
                    {loading ? (
                      <>
                        <span className="spinner-border spinner-border-sm me-2"></span>
                        Publishing...
                      </>
                    ) : (
                      <>
                        <i className="bi bi-send me-2"></i>
                        Publish Post
                      </>
                    )}
                  </button>
                  <div className="secondary-actions">
                    <button 
                      type="button" 
                      className="clear-btn"
                      onClick={handleClearForm}
                      disabled={loading}
                    >
                      <i className="bi bi-x-circle me-2"></i>
                      Clear Form
                    </button>
                    <button 
                      type="button" 
                      className="preview-btn"
                      onClick={() => {
                        if (title && description) {
                          toast.success("Preview feature coming soon!");
                        } else {
                          toast.error("Please fill in title and content first");
                        }
                      }}
                      disabled={loading}
                    >
                      <i className="bi bi-eye me-2"></i>
                      Preview
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </main>
      </div>
    </AdminLayout>
  );
}