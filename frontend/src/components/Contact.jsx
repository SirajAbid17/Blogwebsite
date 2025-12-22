import React, { useState } from 'react';
import { 
  MdEmail, 
  MdPhone, 
  MdLocationOn, 
  MdAccessTime,
  MdCall,
  MdMailOutline,
  MdPlace
} from 'react-icons/md';
import { FaPaperPlane, FaMapMarkerAlt } from 'react-icons/fa';
import Navbar from './Navbar';
import Footer from './Footer';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });


  return (
    <>
      <Navbar />
      <div style={{
        minHeight: '100vh',
        backgroundColor: '#0E1428',
        paddingTop: '80px',
        paddingBottom: '60px',
        position: 'relative'
      }}>
       
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'radial-gradient(circle at 20% 50%, rgba(102, 126, 234, 0.1) 0%, transparent 50%)',
          pointerEvents: 'none'
        }} />
        
        <div style={{
          maxWidth: '1200px',
          margin: '0 auto',
          padding: '0 20px',
          position: 'relative'
        }}>
        
          <div style={{
            textAlign: 'center',
            marginBottom: '60px'
          }}>
            <h1 style={{
              fontSize: '3rem',
              fontWeight: '700',
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              marginBottom: '15px'
            }}>
              Get In Touch
            </h1>
            <p style={{
              fontSize: '1.1rem',
              color: '#94a3b8',
              maxWidth: '600px',
              margin: '0 auto',
              lineHeight: '1.6'
            }}>
              Have questions or want to work together? We'd love to hear from you.
              Send us a message and we'll respond as soon as possible.
            </p>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '50px',
            alignItems: 'start'
          }}>
            
            <div>
              <div style={{
                backgroundColor: '#1a1f2e',
                borderRadius: '20px',
                padding: '40px',
                border: '2px solid #2d3748',
                height: '100%'
              }}>
                <h2 style={{
                  color: '#fff',
                  fontSize: '1.8rem',
                  marginBottom: '30px',
                  fontWeight: '600'
                }}>
                  Contact Information
                </h2>

                <div style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '30px'
                }}>
                 
                  <div style={{
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: '20px'
                  }}>
                    <div style={{
                      width: '50px',
                      height: '50px',
                      borderRadius: '12px',
                      backgroundColor: 'rgba(102, 126, 234, 0.15)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0
                    }}>
                      <MdEmail style={{
                        fontSize: '1.5rem',
                        color: '#667eea'
                      }} />
                    </div>
                    <div>
                      <h3 style={{
                        color: '#fff',
                        fontSize: '1.1rem',
                        marginBottom: '5px',
                        fontWeight: '600'
                      }}>
                        Email
                      </h3>
                      <p style={{
                        color: '#94a3b8',
                        fontSize: '0.95rem',
                        marginBottom: '5px'
                      }}>
                       sirajabid641@gmail.com
                      </p>
                     
                    </div>
                  </div>

                
                  <div style={{
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: '20px'
                  }}>
                    <div style={{
                      width: '50px',
                      height: '50px',
                      borderRadius: '12px',
                      backgroundColor: 'rgba(102, 126, 234, 0.15)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0
                    }}>
                      <MdPhone style={{
                        fontSize: '1.5rem',
                        color: '#667eea'
                      }} />
                    </div>
                    <div>
                      <h3 style={{
                        color: '#fff',
                        fontSize: '1.1rem',
                        marginBottom: '5px',
                        fontWeight: '600'
                      }}>
                        Phone
                      </h3>
                      <p style={{
                        color: '#94a3b8',
                        fontSize: '0.95rem',
                        marginBottom: '5px'
                      }}>
                        +92 328 7303593
                      </p>
                    
                    </div>
                  </div>

                 
                  <div style={{
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: '20px'
                  }}>
                    <div style={{
                      width: '50px',
                      height: '50px',
                      borderRadius: '12px',
                      backgroundColor: 'rgba(102, 126, 234, 0.15)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0
                    }}>
                      <MdLocationOn style={{
                        fontSize: '1.5rem',
                        color: '#667eea'
                      }} />
                    </div>
                    <div>
                      <h3 style={{
                        color: '#fff',
                        fontSize: '1.1rem',
                        marginBottom: '5px',
                        fontWeight: '600'
                      }}>
                        Office Address
                      </h3>
                      <p style={{
                        color: '#94a3b8',
                        fontSize: '0.95rem',
                        lineHeight: '1.5'
                      }}>
                      Basti Amina Abad, near Ideal Science Academy & Ideal Degree College<br />
                        Kharian, Punjab 50700,<br />
                        Pakistan
                      </p>
                    </div>
                  </div>

                  <div style={{
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: '20px'
                  }}>
                    <div style={{
                      width: '50px',
                      height: '50px',
                      borderRadius: '12px',
                      backgroundColor: 'rgba(102, 126, 234, 0.15)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0
                    }}>
                      <MdAccessTime style={{
                        fontSize: '1.5rem',
                        color: '#667eea'
                      }} />
                    </div>
                    <div>
                      <h3 style={{
                        color: '#fff',
                        fontSize: '1.1rem',
                        marginBottom: '5px',
                        fontWeight: '600'
                      }}>
                        Working Hours
                      </h3>
                      <p style={{
                        color: '#94a3b8',
                        fontSize: '0.95rem',
                        lineHeight: '1.5'
                      }}>
                        Monday - Friday: 9:00 AM - 6:00 PM<br />
                        Saturday: 10:00 AM - 4:00 PM<br />
                        Sunday: Closed
                      </p>
                    </div>
                  </div>
                 <div style={{
  backgroundColor: 'rgba(26, 31, 46, 0.8)',
  borderRadius: '16px',
  padding: '4px',
  border: '2px solid #2d3748',
  margin: '1px 0',
  textAlign: 'center'
}}>
  
  
  <p style={{
    color: '#94a3b8',
   padding:"6px"
  }}>
   Blogs help full-stack and AI developers build authority, share valuable knowledge, and showcase real-world skills.
They strengthen digital presence, attract opportunities, and create trust with learners, clients, and employers.
 Regular blogging enhances your institution's online presence, showcases expertise.
  </p>
</div>
                </div>
              </div>
            </div>
          <div style={{
            backgroundColor: '#1a1f2e',
            borderRadius: '20px',
            overflow: 'hidden',
            border: '2px solid #2d3748'
          }}>
            <div style={{
              padding: '30px 40px',
              borderBottom: '2px solid #2d3748'
            }}>
              <h2 style={{
                color: '#fff',
                fontSize: '1.8rem',
                fontWeight: '600'
              }}>
                Visit Our Location
              </h2>
              <p style={{
                color: '#94a3b8',
                fontSize: '0.95rem',
                marginTop: '10px'
              }}>
Basti Amina Abad, near Ideal Science Academy & Ideal Degree College, Kharian, Punjab
              </p>
            </div>
            
           
            <div style={{
              height: '450px',
              backgroundColor: '#0E1428',
              position: 'relative',
              overflow: 'hidden'
            }}>
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3452.9802249039103!2d71.18138437390715!3d30.066101317547258!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x393ad7f9b41ec373%3A0x66c11abdddd2132b!2sIdeal%20Science%20Academy%20%26%20Ideal%20Degree%20College!5e0!3m2!1sen!2s!4v1766116060665!5m2!1sen!2s"
                width="100%"
                height="100%"
                style={{
                  border: 0,
                  filter: 'invert(90%) hue-rotate(180deg) contrast(85%)'
                }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Basti Amina Abad, near Ideal Science Academy & Ideal Degree College"
              />
              
             
              <div style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                pointerEvents: 'none',
                background: 'linear-gradient(45deg, rgba(26, 31, 46, 0.1) 0%, transparent 50%)'
              }} />
            </div>

          
            <div style={{
              padding: '20px 40px',
              backgroundColor: 'rgba(26, 31, 46, 0.8)',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              flexWrap: 'wrap',
              gap: '15px'
            }}>
              <div>
                <p style={{
                  color: '#fff',
                  fontSize: '1rem',
                  fontWeight: '600',
                  marginBottom: '5px'
                }}>
                 Basti Amina Abad, near Ideal Science Academy & Ideal Degree College
                </p>
                <p style={{
                  color: '#94a3b8',
                  fontSize: '0.9rem'
                }}>
                  Kharian, Punjab 50700, Pakistan
                </p>
              </div>
              <a
                href="https://maps.google.com/?q=Ideal+Science+Academy+%26+Ideal+Degree+College,Kharian,Punjab"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  padding: '10px 24px',
                  backgroundColor: 'rgba(102, 126, 234, 0.1)',
                  color: '#667eea',
                  border: '2px solid #667eea',
                  borderRadius: '50px',
                  fontSize: '0.9rem',
                  fontWeight: '600',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  textDecoration: 'none',
                  display: 'inline-block',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = 'rgba(102, 126, 234, 0.2)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'rgba(102, 126, 234, 0.1)';
                }}
              >
                <FaMapMarkerAlt />
                Open in Google Maps
              </a>
            </div>
          </div>
           
          </div>

        

         
          <div style={{
            marginTop: '50px',
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
            gap: '25px'
          }}>
            <div style={{
              backgroundColor: 'rgba(102, 126, 234, 0.05)',
              border: '2px solid rgba(102, 126, 234, 0.2)',
              borderRadius: '16px',
              padding: '25px',
              textAlign: 'center'
            }}>
              <div style={{
                fontSize: '2.5rem',
                color: '#667eea',
                marginBottom: '15px',
                display: 'flex',
                justifyContent: 'center'
              }}>
                <MdCall style={{ fontSize: '2.5rem' }} />
              </div>
              <h3 style={{
                color: '#fff',
                fontSize: '1.1rem',
                marginBottom: '10px',
                fontWeight: '600'
              }}>
                Call Us
              </h3>
              <p style={{
                color: '#94a3b8',
                fontSize: '0.95rem'
              }}>
                Available during working hours
              </p>
            </div>

            <div style={{
              backgroundColor: 'rgba(102, 126, 234, 0.05)',
              border: '2px solid rgba(102, 126, 234, 0.2)',
              borderRadius: '16px',
              padding: '25px',
              textAlign: 'center'
            }}>
              <div style={{
                fontSize: '2.5rem',
                color: '#667eea',
                marginBottom: '15px',
                display: 'flex',
                justifyContent: 'center'
              }}>
                <MdMailOutline style={{ fontSize: '2.5rem' }} />
              </div>
              <h3 style={{
                color: '#fff',
                fontSize: '1.1rem',
                marginBottom: '10px',
                fontWeight: '600'
              }}>
                Email Us
              </h3>
              <p style={{
                color: '#94a3b8',
                fontSize: '0.95rem'
              }}>
                Response within 24 hours
              </p>
            </div>

            <div style={{
              backgroundColor: 'rgba(102, 126, 234, 0.05)',
              border: '2px solid rgba(102, 126, 234, 0.2)',
              borderRadius: '16px',
              padding: '25px',
              textAlign: 'center'
            }}>
              <div style={{
                fontSize: '2.5rem',
                color: '#667eea',
                marginBottom: '15px',
                display: 'flex',
                justifyContent: 'center'
              }}>
                <MdPlace style={{ fontSize: '2.5rem' }} />
              </div>
              <h3 style={{
                color: '#fff',
                fontSize: '1.1rem',
                marginBottom: '10px',
                fontWeight: '600'
              }}>
                Visit Us
              </h3>
              <p style={{
                color: '#94a3b8',
                fontSize: '0.95rem'
              }}>
                Walk-ins welcome
              </p>
            </div>
          </div>
        </div>
      </div>
      <Footer />

      <style>
        {`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
          
          /* Map iframe styling */
          iframe {
            filter: invert(90%) hue-rotate(180deg) contrast(85%) !important;
          }
        `}
      </style>
    </>
  );
}