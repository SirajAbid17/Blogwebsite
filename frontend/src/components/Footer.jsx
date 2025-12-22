import React from 'react';
import { FaEnvelope, FaGithub, FaLinkedin, FaTwitter, FaHeart, FaCode, FaReact, FaNodeJs, FaDatabase } from 'react-icons/fa';

export default function Footer() {
  return (
    <footer className="footer text-white" style={{ backgroundColor: '#0E1428', borderTop: '2px solid #1F2936' }}>
      <div className="container pt-5 pb-4">
        <div className="row g-4">
        
          <div className="col-lg-4 col-md-6 mb-4">
            <h4 className="fw-bold mb-3 d-flex align-items-center" style={{ color: '#7f5af0' }}>
              <FaCode className="me-2 fs-3" />
              <span className="me-1">SK</span>
              <span>Coder</span>
            </h4>
            <p className="mb-3" style={{ color: '#adb5bd', lineHeight: '1.6' }}>
              A passionate coding blog sharing insights, tutorials, and resources about web development, 
              programming, and modern tech stacks. Empowering developers worldwide.
            </p>
            <div className="d-flex gap-3 mt-3">
              <a 
                href="https://github.com" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-white fs-5 p-2 rounded-circle"
                style={{ 
                  backgroundColor: '#1F2936',
                  width: '42px',
                  height: '42px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  transition: 'all 0.3s ease'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = '#7f5af0';
                  e.currentTarget.style.transform = 'translateY(-3px)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = '#1F2936';
                  e.currentTarget.style.transform = 'translateY(0)';
                }}
              >
                <FaGithub />
              </a>
              <a 
                href="https://linkedin.com" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-white fs-5 p-2 rounded-circle"
                style={{ 
                  backgroundColor: '#1F2936',
                  width: '42px',
                  height: '42px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  transition: 'all 0.3s ease'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = '#0077b5';
                  e.currentTarget.style.transform = 'translateY(-3px)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = '#1F2936';
                  e.currentTarget.style.transform = 'translateY(0)';
                }}
              >
                <FaLinkedin />
              </a>
              <a 
                href="https://twitter.com" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-white fs-5 p-2 rounded-circle"
                style={{ 
                  backgroundColor: '#1F2936',
                  width: '42px',
                  height: '42px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  transition: 'all 0.3s ease'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = '#1DA1F2';
                  e.currentTarget.style.transform = 'translateY(-3px)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = '#1F2936';
                  e.currentTarget.style.transform = 'translateY(0)';
                }}
              >
                <FaTwitter />
              </a>
            </div>
          </div>

       
<div className="col-lg-3 col-md-6 mb-4">
  <h5 className="fw-bold mb-3" style={{ color: '#00c6ff' }}>
    About This Blog
  </h5>

  <p style={{ color: '#adb5bd', lineHeight: '1.7', fontSize: '0.95rem' }}>
  SKCoder Blog helps developers learn, grow, and stay updated with modern web technologies.
From beginner tutorials to advanced MERN stack concepts, we focus on real-world coding skills.

  </p>

  
</div>

       
          <div className="col-lg-2 col-md-6 mb-4">
            <h5 className="fw-bold mb-3" style={{ color: '#00c6ff' }}>Quick Links</h5>
            <ul className="list-unstyled">
              <li className="mb-2">
                <a 
                  href="/" 
                  className="text-decoration-none d-block py-1 px-2 rounded"
                  style={{ 
                    color: '#adb5bd',
                    transition: 'all 0.3s ease'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.color = '#fff';
                    e.currentTarget.style.backgroundColor = 'rgba(127, 90, 240, 0.1)';
                    e.currentTarget.style.paddingLeft = '15px';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.color = '#adb5bd';
                    e.currentTarget.style.backgroundColor = 'transparent';
                    e.currentTarget.style.paddingLeft = '8px';
                  }}
                >
                  Home
                </a>
              </li>
              <li className="mb-2">
                <a 
                  href="/blogs" 
                  className="text-decoration-none d-block py-1 px-2 rounded"
                  style={{ 
                    color: '#adb5bd',
                    transition: 'all 0.3s ease'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.color = '#fff';
                    e.currentTarget.style.backgroundColor = 'rgba(127, 90, 240, 0.1)';
                    e.currentTarget.style.paddingLeft = '15px';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.color = '#adb5bd';
                    e.currentTarget.style.backgroundColor = 'transparent';
                    e.currentTarget.style.paddingLeft = '8px';
                  }}
                >
                  Blogs
                </a>
              </li>
              <li className="mb-2">
                <a 
                  href="/categories" 
                  className="text-decoration-none d-block py-1 px-2 rounded"
                  style={{ 
                    color: '#adb5bd',
                    transition: 'all 0.3s ease'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.color = '#fff';
                    e.currentTarget.style.backgroundColor = 'rgba(127, 90, 240, 0.1)';
                    e.currentTarget.style.paddingLeft = '15px';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.color = '#adb5bd';
                    e.currentTarget.style.backgroundColor = 'transparent';
                    e.currentTarget.style.paddingLeft = '8px';
                  }}
                >
                  Categories
                </a>
              </li>
              <li className="mb-2">
                <a 
                  href="/contact" 
                  className="text-decoration-none d-block py-1 px-2 rounded"
                  style={{ 
                    color: '#ff6f61',
                    transition: 'all 0.3s ease'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.color = '#ff3b2e';
                    e.currentTarget.style.backgroundColor = 'rgba(255, 111, 97, 0.1)';
                    e.currentTarget.style.paddingLeft = '15px';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.color = '#ff6f61';
                    e.currentTarget.style.backgroundColor = 'transparent';
                    e.currentTarget.style.paddingLeft = '8px';
                  }}
                >
                  Contact
                </a>
              </li>
            </ul>
          </div>



          <div className="col-lg-3 col-md-6 mb-4">
            <h5 className="fw-bold mb-3 d-flex align-items-center" style={{ color: '#00c6ff' }}>
              <FaEnvelope className="me-2" style={{ color: '#7f5af0' }} />
              Contact Us
            </h5>
            <p className="mb-3" style={{ color: '#adb5bd' }}>
              Have questions or suggestions? Feel free to reach out!
            </p>
            <div className="mb-4">
              <a 
                href="mailto:sirajabid641@gmail.com" 
                className="text-decoration-none d-flex align-items-center p-2 rounded"
                style={{ 
                  color: '#00c6ff',
                  backgroundColor: 'rgba(0, 198, 255, 0.05)',
                  transition: 'all 0.3s ease'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = 'rgba(0, 198, 255, 0.1)';
                  e.currentTarget.style.paddingLeft = '15px';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'rgba(0, 198, 255, 0.05)';
                  e.currentTarget.style.paddingLeft = '8px';
                }}
              >
                <FaEnvelope className="me-3 fs-4" />
                <span>sirajabid641@gmail.com</span>
              </a>
            </div>
            
           
          </div>
        </div>

       
        <hr style={{ 
          border: '0',
          height: '1px',
          background: 'linear-gradient(to right, transparent, #374151, transparent)',
          margin: '2rem 0'
        }} />

   
        <div className="row">
          <div className="col-12">
            <div className="text-center" style={{ color: '#6b7280' }}>
              <p className="mb-3" style={{ fontSize: '0.9rem' }}>
                © {new Date().getFullYear()} SKCoder Blog. All rights reserved.
              </p>
            
             
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes heartbeat {
          0%, 100% {
            transform: scale(1);
          }
          50% {
            transform: scale(1.1);
          }
        }
        
        .form-control:focus {
          background-color: #1F2936 !important;
          border-color: #7f5af0 !important;
          box-shadow: 0 0 0 0.2rem rgba(127, 90, 240, 0.25) !important;
          color: white !important;
          outline: none;
        }
        
        .form-control::placeholder {
          color: #6b7280;
        }
      `}</style>
    </footer>
  );
}