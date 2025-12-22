import React from 'react';
import { FaHome, FaPlus, FaUsers, FaClipboardList } from 'react-icons/fa';
import { NavLink } from 'react-router-dom';

export default function Sidebar() {
  return (
    <div 
      className="sidebar  text-white vh-100 p-4 position-fixed top-0 start-0" 
      style={{ 
        width: '250px',
        backgroundColor:"#0E1428",
        zIndex: 1000,
        overflowY: 'auto'
      }}
    >
      <h4 className="text-center mb-5 fw-bold border-bottom pb-3 mto">Admin Panel</h4>

      <ul className="nav flex-column gap-3">
        <li className="nav-item">
          <NavLink
            to="/dashboard"
            className="nav-link text-white d-flex align-items-center gap-2"
            activeclassname="active"
          >
            <FaHome /> Dashboard
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink
            to="/dashboard/addpost"
            className="nav-link text-white d-flex align-items-center gap-2"
            activeclassname="active"
          >
            <FaPlus /> Add Post
          </NavLink>
        </li>
       
      </ul>
    </div>
  );
}