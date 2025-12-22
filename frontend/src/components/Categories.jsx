import React, { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { get } from '../services/EndPoint';
import Navbar from './Navbar';
import Footer from './Footer';
import './Catagory.css'; 

export default function Categories() {
  const [posts, setPosts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const categoriesRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchPosts();
  }, []);

  useEffect(() => {
    checkScrollButtons();
  }, [categories]);

  const fetchPosts = async () => {
    try {
      setLoading(true);
      const res = await get('/blog/showall');
      const allPosts = res?.data?.posts || [];
      setPosts(allPosts);
      
      const uniqueCategories = ['All', ...new Set(allPosts.map(p => p.category).filter(Boolean))];
      setCategories(uniqueCategories);
    } catch (error) {
      console.error('Failed to load posts', error);
    } finally {
      setLoading(false);
    }
  };

  const checkScrollButtons = () => {
    const container = categoriesRef.current;
    if (container) {
      setCanScrollLeft(container.scrollLeft > 0);
      setCanScrollRight(
        container.scrollLeft < container.scrollWidth - container.clientWidth - 1
      );
    }
  };

  const scrollCategories = (direction) => {
    const container = categoriesRef.current;
    if (container) {
      const scrollAmount = 300;
      container.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
      
      setTimeout(checkScrollButtons, 300);
    }
  };

  const filteredPosts = posts.filter(post => {
    const matchesCategory = selectedCategory === 'All' || post.category === selectedCategory;
    const matchesSearch = 
      post.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.description?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.category?.toLowerCase().includes(searchQuery.toLowerCase());
    
    return matchesCategory && matchesSearch;
  });

  const getCategoryCount = (category) => {
    if (category === 'All') return posts.length;
    return posts.filter(p => p.category === category).length;
  };

  return (
    <>
      <Navbar />
      <div className="categories-container">
        <div className="content-wrapper">
        
          <div className="hero-section">
            <h1 className="hero-title">Explore Categories</h1>
            <p className="hero-subtitle">
              Discover content organized by topics that interest you
            </p>
          </div>

         
          <div className="search-container">
            <input
              type="text"
              placeholder="Search posts by title, content, or category..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="search-input"
            />
            <div className="search-icon">Search</div>
          </div>

        
          <div className="categories-scroll-container">
            {canScrollLeft && (
              <button
                onClick={() => scrollCategories('left')}
                className="scroll-button scroll-left"
              >
                ←
              </button>
            )}

            <div
              ref={categoriesRef}
              onScroll={checkScrollButtons}
              className="categories-list"
            >
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`category-btn ${selectedCategory === cat ? 'active' : ''}`}
                >
                  {cat}
                  <span className={`category-count ${selectedCategory === cat ? 'active' : ''}`}>
                    {getCategoryCount(cat)}
                  </span>
                </button>
              ))}
            </div>

            {canScrollRight && (
              <button
                onClick={() => scrollCategories('right')}
                className="scroll-button scroll-right"
              >
                →
              </button>
            )}
          </div>

     
          <div className="results-info">
            {searchQuery && (
              <p>
                Found <strong>{filteredPosts.length}</strong> results for "{searchQuery}"
              </p>
            )}
            {!searchQuery && selectedCategory !== 'All' && (
              <p>
                Showing <strong>{filteredPosts.length}</strong> posts in {selectedCategory}
              </p>
            )}
          </div>

         
          {loading && (
            <div className="loading-container">
              <div className="loading-spinner" />
              <p className="loading-text">Loading posts...</p>
            </div>
          )}

   
          {!loading && filteredPosts.length === 0 && (
            <div className="no-posts-container">
              <div className="no-posts-icon">📭</div>
              <h3 className="no-posts-title">No posts found</h3>
              <p className="no-posts-text">
                {searchQuery 
                  ? `No results matching "${searchQuery}"`
                  : `No posts in ${selectedCategory} category yet`
                }
              </p>
              {(searchQuery || selectedCategory !== 'All') && (
                <button
                  onClick={() => {
                    setSearchQuery('');
                    setSelectedCategory('All');
                  }}
                  className="clear-filters-btn"
                >
                  Clear Filters
                </button>
              )}
            </div>
          )}

    
          {!loading && filteredPosts.length > 0 && (
            <div className="posts-grid">
              {filteredPosts.map((post) => (
                <div
                  key={post._id}
                  className="post-card"
                  onClick={() => navigate(`/post/${post._id}`)}
                >
               
                  <div className="post-image-container">
                    <img
                      src={`http://localhost:5000/images/${post.image}`}
                      alt={post.title}
                      className="post-image"
                      onError={(e) => e.target.src = 'https://images.unsplash.com/photo-1555066931-4365d14bab8c'}
                    />
                   
                    <div className="category-badge">
                      {post.category || 'Uncategorized'}
                    </div>
                  </div>

                
                  <div className="post-content">
                    <h3 className="post-title">{post.title}</h3>
                    <p className="post-description">{post.description}</p>

                   
                    <div className="post-meta">
                      <span className="post-date">
                        {new Date(post.createdAt).toLocaleDateString('en-US', {
                          month: 'short',
                          day: 'numeric',
                          year: 'numeric'
                        })}
                      </span>
                      <span className="read-more">Read More →</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
}