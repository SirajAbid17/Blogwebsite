import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { BaseUrl, get } from "../services/EndPoint";

export default function RecentPost() {
  const [posts, setPosts] = useState([]);
  const [allPosts, setAllPosts] = useState([]); 
  const [expandedId, setExpandedId] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  
  const navigate = useNavigate();

  const toggleDescription = (id) => {
    setExpandedId(prev => (prev === id ? null : id));
  };

  const fetchPosts = async () => {
    try {
      setIsLoading(true);
      setError(null);
      
      const res = await get(`/blog/showall`);
      const allPostsData = res?.data?.posts || [];
      
   
      setAllPosts(allPostsData);
      
     
      const recentPosts = allPostsData.slice(0, 3);
      setPosts(recentPosts);
      
 
      console.log("Total posts from API:", allPostsData.length);
      console.log("Showing first 3 posts:", recentPosts.length);
      
    } catch (error) {
      console.error("Failed to load posts", error);
      setError("Failed to load posts. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const blogFeatures = [
    "Modern & user-friendly blogging platform",
    "Multiple blog categories supported",
    "Fully responsive design",
    "Like & share blog posts",
    "Image & rich text support",
    "Fast dynamic loading",
    "Secure authentication system",
  ];

  return (
    <> 
      <div className="container-fluid py-5 px-4 recent-bg">
       
        <div className="text-center mb-5">
          <h2 className="fw-bold display-5 text-white">Recent Posts</h2>
          <p style={{color:"grey"}}>Discover amazing articles and insights</p>
         
        </div>

        <div className="row g-4">
        
          <div className="col-lg-7 col-xl-6">
            {isLoading && posts.length === 0 ? (
              <div className="text-center py-5">
                <div className="spinner-border text-primary" role="status">
                  <span className="visually-hidden">Loading...</span>
                </div>
                <p className="text-light mt-3">Loading posts...</p>
              </div>
            ) : error && posts.length === 0 ? (
              <div className="alert alert-danger text-center">
                <i className="fas fa-exclamation-triangle me-2"></i>
                {error}
                <button 
                  className="btn btn-sm btn-outline-light ms-3"
                  onClick={fetchPosts}
                >
                  Retry
                </button>
              </div>
            ) : posts.length === 0 ? (
              <div className="alert alert-info text-center">
                <i className="fas fa-info-circle me-2"></i>
                No posts available. Check back later!
              </div>
            ) : (
              <>
                <div className="row g-4">
                  {posts.map((post, index) => {
                    const isExpanded = expandedId === post._id;
                    const description = post.description || "";
                    
                    return (
                      <div className="col-12" key={`${post._id}-${index}`}>
                        <div className="card post-card border-0 shadow-lg">
                          <div className="row g-0">
                           
                            <div className="col-md-5 position-relative">
                              <img
                                src={`${BaseUrl}/images/${post.image}`}
                                alt={post.title}
                                className="img-fluid post-image w-100 h-100 object-fit-cover"
                                style={{ minHeight: "250px" }}
                                onError={(e) => {
                                  e.target.src = "https://via.placeholder.com/400x250/2d3748/ffffff?text=No+Image";
                                }}
                              />
                              <span className="post-index position-absolute top-0 start-0 bg-black text-white px-3 py-1">
                                #{index + 1} 
                              </span>
                            </div>

                            <div className="col-md-7 bg-dark text-white">
                              <div className="card-body h-100 d-flex flex-column p-4">
                                <h5 className="fw-bold mb-3">{post.title || "Untitled Post"}</h5>

                                <span className="badge bg-info mb-3 align-self-start">
                                  {post.category || "General"}
                                </span>

                                <div className="flex-grow-1 mb-3">
                                  <p className="post-desc mb-0">
                                    {isExpanded || description.length <= 150
                                      ? description
                                      : description.slice(0, 150) + "..."}
                                  </p>
                               
                                </div>

                                <div className="d-flex gap-2">
                                  <button
                                    className="btn btn-bg-black flex-grow-1 py-2"
                                    onClick={() => navigate(`/post/${post._id}`)}
                                  >
                                    Read Full Article
                                  </button>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </>
            )}
          </div>

       
          <div className="col-lg-5 col-xl-6">
            <div className="sticky-top" style={{ top: "30px" }}>
              <div className="card feature-wrapper border-0 shadow-lg bg-dark">
                <div className="feature-header text-center bg-gradient-primary p-4 rounded-top">
                  <h3 className="fw-bold text-white mb-2">
                    <i className="fas fa-star me-2"></i>Premium Features
                  </h3>
                  <p className="text-light opacity-75 mb-0">
                    Everything you need for blogging
                  </p>
                </div>

                <div className="card-body p-4">
                  {blogFeatures.map((feature, i) => (
                    <div className="feature-card d-flex align-items-center mb-3 p-3 bg-dark-secondary rounded" key={i}>
                      <span className="bg-black text-white rounded-circle d-flex align-items-center justify-content-center me-3"
                            style={{ width: '30px', height: '30px', fontSize: '0.9rem' }}>
                        {i + 1}
                      </span>
                      <p className="text-light mb-0">{feature}</p>
                    </div>
                  ))}

                  <div className="mkk flex justify-center mt-1">
                    <button 
                      className="btn bg-black text-white px-6 py-2 rounded"
                      onClick={() => navigate("/create-post")}
                    >
                      Start Your Blog Journey
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

      
        <div style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          marginTop: "20px"
        }}>
          <Link style={{textDecoration:"none"}} to={'/blogs'}>
            <div style={{
              backgroundColor: "black",
              color: "white",
              padding: "12px 24px",
              borderRadius: "6px",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              gap: "8px"
            }}>
              <span>See All  Blogs</span>
              <i className="fas fa-arrow-right"></i>
            </div>
          </Link>
        </div>
      </div>

      <div className="container-fluid py-5" style={{backgroundColor: "#0E1428"}}>
        <div className="container">
          <div className="text-center mb-5">
            <h3 className="fw-bold text-white display-6 mb-3">
              <i className="fas fa-layer-group me-3" style={{color: "#00d4ff"}}></i>
              Explore Our Tech Stack
            </h3>
            <p className="text-light opacity-75 lead">
              Master modern technologies with our comprehensive guides
            </p>
          </div>
          
          <div className="row g-4 justify-content-center">
           
            <div className="col-lg-4 col-md-6">
              <div className="card tech-card border-0 shadow-lg"
                  style={{
                    backgroundColor: "#111",
                    borderTop: "4px solid #61DAFB",
                    transition: "all 0.4s ease",
                    overflow: "hidden"
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = "translateY(-10px)";
                    e.currentTarget.style.boxShadow = "0 15px 30px rgba(97, 218, 251, 0.2)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = "translateY(0)";
                    e.currentTarget.style.boxShadow = "0 5px 15px rgba(0,0,0,0.3)";
                  }}>
                <div className="card-body text-center p-4">
                  <h4 className="text-white fw-bold mb-3">MERN Stack</h4>
                  <p className="text-light opacity-75 mb-4">
                    Full-stack JavaScript solution for modern web applications
                  </p>
                  
                  <div className="d-flex flex-wrap justify-content-center gap-2 mb-4">
                    <span className="badge bg-dark text-white px-3 py-2">
                      <i className="fab fa-react me-1"></i> React
                    </span>
                    <span className="badge bg-dark text-white px-3 py-2">
                      <i className="fas fa-database me-1"></i> MongoDB
                    </span>
                    <span className="badge bg-dark text-white px-3 py-2">
                      <i className="fab fa-node-js me-1"></i> Node.js
                    </span>
                  </div>
                  
                  <button 
                    className="btn btn-lg w-100 rounded-pill fw-bold"
                    onClick={() => navigate("/tech-details/mern")}
                    style={{
                      backgroundColor: "#61DAFB",
                      color: "#000",
                      border: "none",
                      transition: "all 0.3s ease"
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = "#4FD1F7";
                      e.currentTarget.style.transform = "scale(1.05)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = "#61DAFB";
                      e.currentTarget.style.transform = "scale(1)";
                    }}
                  >
                    <i className="fas fa-code me-2"></i>
                    Learn MERN
                  </button>
                </div>
              </div>
            </div>

         
            <div className="col-lg-4 col-md-6">
              <div className="card tech-card border-0 shadow-lg"
                  style={{
                    backgroundColor: "#111",
                    borderTop: "4px solid #DD0031",
                    transition: "all 0.4s ease",
                    overflow: "hidden"
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = "translateY(-10px)";
                    e.currentTarget.style.boxShadow = "0 15px 30px rgba(221, 0, 49, 0.2)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = "translateY(0)";
                    e.currentTarget.style.boxShadow = "0 5px 15px rgba(0,0,0,0.3)";
                  }}>
                <div className="card-body text-center p-4">
                  <h4 className="text-white fw-bold mb-3">MEAN Stack</h4>
                  <p className="text-light opacity-75 mb-4">
                    TypeScript-based framework for enterprise-level applications
                  </p>
                  
                  <div className="d-flex flex-wrap justify-content-center gap-2 mb-4">
                    <span className="badge bg-dark text-white px-3 py-2">
                      <i className="fab fa-angular me-1"></i> Angular
                    </span>
                    <span className="badge bg-dark text-white px-3 py-2">
                      <i className="fab fa-js-square me-1"></i> TypeScript
                    </span>
                    <span className="badge bg-dark text-white px-3 py-2">
                      <i className="fas fa-server me-1"></i> Express
                    </span>
                  </div>
                  
                  <button 
                    className="btn btn-lg w-100 rounded-pill fw-bold"
                    onClick={() => navigate("/tech-details/mean")}
                    style={{
                      backgroundColor: "#DD0031",
                      color: "#fff",
                      border: "none",
                      transition: "all 0.3s ease"
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = "#C30026";
                      e.currentTarget.style.transform = "scale(1.05)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = "#DD0031";
                      e.currentTarget.style.transform = "scale(1)";
                    }}
                  >
                    <i className="fas fa-laptop-code me-2"></i>
                    Learn MEAN
                  </button>
                </div>
              </div>
            </div>

           
            <div className="col-lg-4 col-md-6">
              <div className="card tech-card border-0 shadow-lg"
                  style={{
                    backgroundColor: "#111",
                    borderTop: "4px solid #00D8FF",
                    transition: "all 0.4s ease",
                    overflow: "hidden"
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = "translateY(-10px)";
                    e.currentTarget.style.boxShadow = "0 15px 30px rgba(0, 216, 255, 0.2)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = "translateY(0)";
                    e.currentTarget.style.boxShadow = "0 5px 15px rgba(0,0,0,0.3)";
                  }}>
                <div className="card-body text-center p-4">
                  <h4 className="text-white fw-bold mb-3">React Native</h4>
                  <p className="text-light opacity-75 mb-4">
                    Build native mobile apps for iOS & Android using React
                  </p>
                  
                  <div className="d-flex flex-wrap justify-content-center gap-2 mb-4">
                    <span className="badge bg-dark text-white px-3 py-2">
                      <i className="fab fa-react me-1"></i> React Native
                    </span>
                    <span className="badge bg-dark text-white px-3 py-2">
                      <i className="fab fa-apple me-1"></i> iOS
                    </span>
                    <span className="badge bg-dark text-white px-3 py-2">
                      <i className="fab fa-android me-1"></i> Android
                    </span>
                  </div>
                  
                  <button 
                    className="btn btn-lg w-100 rounded-pill fw-bold"
                    onClick={() => navigate("/tech-details/react-native")}
                    style={{
                      backgroundColor: "#00D8FF",
                      color: "#000",
                      border: "none",
                      transition: "all 0.3s ease"
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = "#00C4E8";
                      e.currentTarget.style.transform = "scale(1.05)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = "#00D8FF";
                      e.currentTarget.style.transform = "scale(1)";
                    }}
                  >
                    <i className="fas fa-mobile-alt me-2"></i>
                    Learn Mobile Dev
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="text-center mt-5 pt-4">
            <div className="d-inline-block p-4 rounded" style={{backgroundColor: "rgba(255,255,255,0.05)"}}>
              <p className="text-light mb-3">
                <i className="fas fa-graduation-cap me-2" style={{color: "#00d4ff"}}></i>
                Start your journey today and become a full-stack developer
              </p>
              <p className="text-light opacity-75 small">
                Comprehensive tutorials | Hands-on projects | Expert guidance
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}