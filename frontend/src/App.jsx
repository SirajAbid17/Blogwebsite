import React, { useState } from 'react'
import { Route, Routes, useLocation } from 'react-router-dom'
import Home from './components/Home'
import Post from './components/Post'
import Login from './components/Login'
import Register from './components/Register'
import Profile from './components/Profile'
import User from './layout/User'
import Admin from './layout/Admin'
import Dashboard from './admin/Dashboard'
import Addpost from './admin/Addpost'

import './App.css'

import {Provider} from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import {Toaster} from 'react-hot-toast'
import { peristor, store } from './reduex/store'
import Blogs from './components/Blogs'
import TechDetails from './components/Codingdetail'
import Categories from './components/Categories'
import Contact from './components/Contact'



function AppContent() {
  const location = useLocation()
  const [showAuthModal, setShowAuthModal] = useState(false)
  const [authMode, setAuthMode] = useState('login')

  const isHomeRoute = location.pathname === '/'

  return (
    <>
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 4000,
          style: {
            background: '#363636',
            color: '#fff',
          },
          success: {
            duration: 3000,
            theme: {
              primary: '#4aed88',
            },
          },
        }}
      />
      
    
      {isHomeRoute && (
        <div className={`${showAuthModal ? 'blur-background' : ''}`}>
          <Routes>
            <Route path='/' element={<User />}>
              <Route index element={
                <Home 
                  setShowAuthModal={setShowAuthModal}
                  setAuthMode={setAuthMode}
                />
              }/>
              <Route path='post/:id' element={<Post/>}/>
              <Route path='profile/:id' element={<Profile/>}/>
            </Route>
          </Routes>
        </div>
      )}

      {!isHomeRoute && (
        <Routes>
          <Route path='/' element={<User />}>
            <Route index element={<Home />}/>
            <Route path='post/:id' element={<Post/>}/>
            <Route path='profile/:id' element={<Profile/>}/>
          </Route>
          
          <Route path='/dashboard' element={<Admin/>}>
            <Route index element={<Dashboard/>}/>
            <Route path='addpost' element={<Addpost/>}/> 
          
          </Route> 
          
          <Route path="/tech-details/:tech" element={<TechDetails />} />
          <Route path='/login' element={<Login isOpen={true} />}/>
          <Route path='/register' element={<Register isOpen={true} />}/>
          <Route path='/blogs' element={<Blogs/>}/>
            <Route path='/categories' element={<Categories/>}/>
           <Route path='/profile' element={<Profile/>}/>
           <Route path='/profile/:id' element={<Profile/>}/>
            <Route path='/contact' element={<Contact/>}/>
           

           
        </Routes>
      )}
    </>
  )
}

export default function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={peristor}> 
        <AppContent />
      </PersistGate>
    </Provider>
  )
}