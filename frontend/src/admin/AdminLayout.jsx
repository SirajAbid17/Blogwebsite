import React, { useState, useEffect } from 'react';

import './AdminLayout.css'; 
import Sidebar from '../components/Sidebar';

export default function AdminLayout({ children }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  return (
    <div className="admin-layout">
      
      <button 
        className="mobile-menu-toggle" 
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
      >
        <i className="bi bi-list"></i>
      </button>

    
      {isSidebarOpen && (
        <div 
          className="sidebar-overlay" 
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

    
      <aside className={`admin-sidebar ${isSidebarOpen ? 'open' : ''}`}>
        <Sidebar />
      </aside>

   
      <main className={`admin-main-content ${!isSidebarOpen ? 'full-width' : ''}`}>
        <div className="content-wrapper">
          {children}
        </div>
      </main>
    </div>
  );
}