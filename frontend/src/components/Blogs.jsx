import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { BaseUrl, get } from "../services/EndPoint";
import Footer from "./Footer";
import Navbar from "./Navbar";

export default function Blogs() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const res = await get("/blog/showall");
        setPosts(res?.data?.posts || []);
      } catch (e) {
        setError("Failed to load blogs. Please try again later.");
      } finally {
        setLoading(false);
      }
    })();
  }, []);

 

  const featured = posts[0];
  const staffPicks = posts.slice(1, 4);
  const gridPosts = posts.slice(4);



  return (
    <div style={{ backgroundColor: "#0E1428" }}>
      <Navbar/>
      <div className="container py-5 mt-5">
      
        <div className="text-center mb-5">
          <h1 className="fw-bold display-5 text-dark mb-2 text-white">Our Blog</h1>
          <p className="text-white">
            Practical tutorials, developer stories, and insights to help you grow.
          </p>
        </div>

      
        {featured && (
          <div className="row g-4 mb-5 align-items-stretch">
          
            <div className="col-lg-8">
              <div
                className="card border-0 overflow-hidden h-100"
                style={{
                  borderRadius: "24px",
                  height: "480px",
                  boxShadow: "0 10px 30px rgba(0,0,0,0.06)",
                  backgroundColor: "#212529"
                }}
              >
             
                <div style={{ height: "220px", overflow: "hidden" }}>
                  <img
                    src={`${BaseUrl}/images/${featured.image}`}
                    alt={featured.title}
                    className="w-100 h-100"
                    style={{ objectFit: "cover" }}
                  />
                </div>

               
                <div
                  className="card-body p-4 d-flex flex-column"
                  style={{
                    backgroundColor: "#212529",
                    borderTop: "1px solid #fff",
                    color: "#fff",
                  }}
                >
               
                  <div className="d-flex justify-content-between align-items-center mb-2">
                    <span
                      className="small fw-semibold text-uppercase"
                      style={{
                        letterSpacing: "0.08em",
                        color: "#cbd5e1",
                      }}
                    >
                      Featured Article
                    </span>
                    <span
                      className="small"
                      style={{
                        color: "#94a3b8",
                        backgroundColor: "rgba(148, 163, 184, 0.1)",
                        padding: "4px 10px",
                        borderRadius: "12px",
                      }}
                    >
                      blog
                    </span>
                  </div>

                  <h2
                    className="fw-bold mt-2 fs-4"
                    style={{ color: "#ffffff" }}
                  >
                    {featured.title}
                  </h2>

                  <p
                    className="mt-2 flex-grow-1 small"
                    style={{
                      color: "#d1d5db",
                      display: "-webkit-box",
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: "vertical",
                      overflow: "hidden",
                    }}
                  >
                    {featured.description}
                  </p>

                  <div className="d-flex justify-content-between align-items-center mt-2">
                    <button
                      className="btn fw-semibold px-4"
                      style={{
                        border: "1px solid #fff",
                        color: "#fff",
                        background: "transparent",
                      }}
                      onClick={() => navigate(`/post/${featured._id}`)}
                    >
                      Read Story →
                    </button>
                    
                  
                    <div className="d-flex gap-3">
                      <span className="small text-muted">
                        {new Date(featured.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

           
            <div className="col-lg-4">
              <div
                className="card border-0 h-100 p-4"
                style={{
                  borderRadius: "20px",
                  backgroundColor: "#212529",
                  boxShadow: "0 12px 30px rgba(0,0,0,0.4)",
                }}
              >
                <h5
                  className="fw-bold mb-2"
                  style={{ color: "#ffffff" }}
                >
                  Recommended for You
                </h5>

                <p
                  className="small mb-4"
                  style={{ color: "#adb5bd" }}
                >
                  High-value articles every developer should read.
                </p>

             
                {staffPicks.map((post) => (
                  <div
                    key={post._id}
                    className="mb-3 p-3 rounded"
                    style={{
                      backgroundColor: "#1c1f23",
                      cursor: "pointer",
                      border: "1px solid rgba(255,255,255,0.08)",
                      transition: "all 0.25s ease",
                    }}
                    onClick={() => navigate(`/post/${post._id}`)}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = "#262a30";
                      e.currentTarget.style.borderColor = "rgba(255,255,255,0.18)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = "#1c1f23";
                      e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)";
                    }}
                  >
                    <div className="d-flex justify-content-between align-items-start">
                      <span
                        className="small fw-semibold"
                        style={{ color: "#6ea8fe" }}
                      >
                        Learn • Build • Grow
                      </span>
                      <span
                        className="small"
                        style={{
                          color: "#94a3b8",
                          fontSize: "0.75rem",
                        }}
                      >
                        blog
                      </span>
                    </div>

                    <h6
                      className="fw-semibold mt-1 mb-2"
                      style={{
                        color: "#f8f9fa",
                        display: "-webkit-box",
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: "vertical",
                        overflow: "hidden",
                      }}
                    >
                      {post.title}
                    </h6>
                    
                   
                    <div className="d-flex justify-content-between mt-2">
                      <span className="small" style={{ color: "#6c757d" }}>
                        {new Date(post.createdAt).toLocaleDateString('en-US', { 
                          month: 'short', 
                          day: 'numeric' 
                        })}
                      </span>
                     
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

     
        <div className="row g-4">
          {gridPosts.map((post) => (
            <div className="col-md-4" key={post._id}>
              <div
                className="card h-100 border-0"
                style={{
                  borderRadius: "18px",
                  boxShadow: "0 8px 20px rgba(0,0,0,0.05)",
                  transition: "transform 0.3s ease",
                  backgroundColor: "#1c1f23",
                  cursor: "pointer",
                  border: "1px solid rgba(255,255,255,0.08)",
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.transform = "translateY(-4px)")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.transform = "translateY(0)")
                }
              >
                <div style={{ position: "relative" }}>
                  <img
                    src={`${BaseUrl}/images/${post.image}`}
                    alt={post.title}
                    className="card-img-top"
                    style={{ 
                      height: "200px", 
                      objectFit: "cover",
                      borderTopLeftRadius: "18px",
                      borderTopRightRadius: "18px"
                    }}
                    onError={(e) =>
                      (e.target.src =
                        "https://images.unsplash.com/photo-1555066931-4365d14bab8c")
                    }
                  />
                  
                
                  <div
                    style={{
                      position: "absolute",
                      top: "12px",
                      right: "12px",
                      backgroundColor: "rgba(0, 0, 0, 0.7)",
                      color: "white",
                      padding: "4px 10px",
                      borderRadius: "12px",
                      fontSize: "0.75rem",
                      fontWeight: "500",
                    }}
                  >
                   blog
                  </div>
                </div>

                <div className="card-body">
                  <div className="d-flex justify-content-between align-items-center mb-2">
                    <span className="text-primary small fw-semibold text-uppercase">
                      Blog
                    </span>
                    <span className="small text-muted">
                      {new Date(post.createdAt).toLocaleDateString('en-US', { 
                        month: 'short', 
                        day: 'numeric' 
                      })}
                    </span>
                  </div>
                  
                  <h6 className="fw-bold mt-2 text-white">{post.title}</h6>
                  <p
                    className="small mt-2"
                    style={{
                      color: "rgba(255,255,255,0.7)",
                      display: "-webkit-box",
                      WebkitLineClamp: 3,
                      WebkitBoxOrient: "vertical",
                      overflow: "hidden",
                    }}
                  >
                    {post.description}
                  </p>
                  
                  <div className="d-flex justify-content-between align-items-center mt-3">
                    <button
                      className="btn btn-sm fw-semibold"
                      style={{
                        backgroundColor: "#000",
                        color: "#fff",
                        border: "1px solid #fff",
                      }}
                      onClick={() => navigate(`/post/${post._id}`)}
                    >
                      Read More →
                    </button>
                    
                    
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <Footer/>
    </div>
  );
}