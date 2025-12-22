import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';


export default function Preview() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [category, setCategory] = useState('');
  const [image, setImage] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
   
    const previewTitle = sessionStorage.getItem('previewTitle');
    const previewContent = sessionStorage.getItem('previewContent');
    const previewCategory = sessionStorage.getItem('previewCategory');
    const previewImage = sessionStorage.getItem('previewImage');

    if (!previewTitle && !previewContent) {
      navigate('/dashboard/addpost');
      return;
    }

    setTitle(previewTitle || '');
    setContent(previewContent || '');
    setCategory(previewCategory || '');
    setImage(previewImage || '');

 
    return () => {
      sessionStorage.removeItem('previewTitle');
      sessionStorage.removeItem('previewContent');
      sessionStorage.removeItem('previewCategory');
      sessionStorage.removeItem('previewImage');
    };
  }, [navigate]);

  return (
    <div className="preview-page">
      <div className="preview-container">
        <div className="preview-header">
          <button onClick={() => window.close()} className="close-btn">
            Close Preview
          </button>
        </div>
        <div className="preview-content">
          {image && (
            <div className="preview-image">
              <img src={image} alt="Preview" />
            </div>
          )}
          <h1 className="preview-title">{title}</h1>
          {category && (
            <div className="preview-category">
              <span className="badge">{category}</span>
            </div>
          )}
          <div 
            className="preview-body" 
            dangerouslySetInnerHTML={{ __html: content }}
          />
        </div>
      </div>
    </div>
  );
}