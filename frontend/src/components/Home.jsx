import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux' 
import RecentPost from './RecentPost'
import Linedesign from './Lindesign'
import AuthModal from './AuthModal'

export default function Home({ setShowAuthModal, setAuthMode }) {
  const [modalOpen, setModalOpen] = useState(false)
  

  const user = useSelector((state) => state.auth.user)

  
  useEffect(() => {
   
    if (user) {
      setModalOpen(false)
      return
    }
    
    const timer = setTimeout(() => {
      setModalOpen(true)
    }, 1000) 
    
    return () => clearTimeout(timer)
  }, [user]) 

  const handleCloseModal = () => {
    setModalOpen(false)
  }

  return (
    <>
     
      {!user && (
        <AuthModal 
          isOpen={modalOpen}
          onClose={handleCloseModal}
          defaultMode="login"
        />
      )}

      <div className="hero-section bg-dark text-white py-5 position-relative overflow-hidden vbn">
        <div className="container mt-5 vb">
          <div className="row justify-content-center">
            <div className="col-12 col-lg-10 text-center">
              <h1 className="display-4 display-lg-3 fw-bold mb-4">
                WELCOME TO MY <span className="text-gradient">CODING BLOG</span>
              </h1>
              
              <p className="lead px-lg-5 mb-4">
                Explore knowledge and dive into the <strong className="text-warning">MERN</strong> & <strong className="text-info">MEAN</strong> stacks, sharpen your skills as a <strong className="text-success">Python Enthusiast</strong>, and master both frontend & backend development through clean, real-world examples.
              </p>
              
              <p className="fs-5">
                <em className="text-light">New articles every week — stay curious, stay coding! 🚀</em>
              </p>
              
              <div className="mt-4">
                <div className="scroll-down-icon">
                  <i className="fas fa-chevron-down fs-4"></i>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <Linedesign/>
      
      <div className="container-fluid p-3 p-md-5">
        <RecentPost />
      </div>
    </>
  )
}