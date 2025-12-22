import axios from 'axios';

export const BaseUrl = 'http://localhost:5000'; 
const instance = axios.create({
  baseURL: BaseUrl,
  withCredentials: true,
  timeout: 10000, 
});


instance.interceptors.request.use(
  (config) => {

    const token = localStorage.getItem('token') || 
                  document.cookie.split('; ').find(row => row.startsWith('token='))?.split('=')[1];
    
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    
   
    if (config.data instanceof FormData) {
      delete config.headers['Content-Type'];
    }
    
    console.log('Request config:', {
      url: config.url,
      method: config.method,
      headers: config.headers,
      hasFile: config.data instanceof FormData
    });
    
    return config;
  },
  (error) => {
    console.error('Request interceptor error:', error);
    return Promise.reject(error);
  }
);


instance.interceptors.response.use(
  (response) => {
    console.log('Response received:', {
      status: response.status,
      url: response.config.url,
      data: response.data
    });
    return response;
  },
  (error) => {
    console.error('Response error:', {
      status: error.response?.status,
      message: error.message,
      url: error.config?.url,
      data: error.response?.data
    });
    
    if (error.response?.status === 401) {
      console.log('Unauthorized - redirecting to login');
      localStorage.removeItem('token');
      if (window.location.pathname !== '/login') {
        window.location.href = '/login';
      }
    }
    
   
    return Promise.reject({
      status: error.response?.status,
      message: error.response?.data?.message || error.message,
      data: error.response?.data
    });
  }
);


export const get = (url, params = {}) => {
  console.log('GET request:', url, params);
  return instance.get(url, { params });
};

export const post = (url, data) => {
  console.log('POST request:', url, 'Data type:', data?.constructor?.name);
  
 
  if (data instanceof FormData) {
    return instance.post(url, data, {
      
    });
  }
  

  return instance.post(url, data, {
    headers: {
      'Content-Type': 'application/json'
    }
  });
};

export const put = (url, data) => {
  console.log('PUT request:', url);
  
  if (data instanceof FormData) {
    return instance.put(url, data);
  }
  
  return instance.put(url, data, {
    headers: {
      'Content-Type': 'application/json'
    }
  });
};

export const del = (url) => {
  console.log('DELETE request:', url);
  return instance.delete(url);
};

export const patch = (url, data) => {
  console.log('PATCH request:', url);
  
  if (data instanceof FormData) {
    return instance.patch(url, data);
  }
  
  return instance.patch(url, data, {
    headers: {
      'Content-Type': 'application/json'
    }
  });
};

export const uploadFile = (url, formData, onProgress) => {
  console.log('File upload to:', url);
  console.log('FormData entries:');
  for (let pair of formData.entries()) {
    console.log(pair[0], pair[1]);
  }
  
  return instance.post(url, formData, {
    onUploadProgress: onProgress,
    
  });
};


export const dashboardApi = {
  getDashboardData: () => get('/dashboard'),
  getUsers: () => get('/dashboard/user'),
  deleteUser: (userId) => del(`/dashboard/deleteuser/${userId}`),
};


export const categoryApi = {
  getAllCategories: () => get('/categories'),
  getCategoriesWithStats: () => get('/categories/stats'),
  getPostsByCategory: (categoryName) => get(`/categories/posts/${categoryName}`),
  createCategory: (data) => {
    console.log('Creating category:', data);
    const formData = new FormData();
    formData.append('name', data.name);
    formData.append('description', data.description || '');
    if (data.image) formData.append('image', data.image);
    
    return instance.post('/categories/create', formData);
  },
  updateCategory: (id, data) => {
    const formData = new FormData();
    formData.append('name', data.name);
    formData.append('description', data.description || '');
    if (data.image) formData.append('image', data.image);
    if (data.isActive !== undefined) formData.append('isActive', data.isActive);
    
    return instance.put(`/categories/update/${id}`, formData);
  },
  deleteCategory: (id) => del(`/categories/delete/${id}`)
};


export const blogApi = {
  createPost: (data) => {
    console.log('Creating post with data:', data);
    const formData = new FormData();
    
  
    Object.keys(data).forEach(key => {
      if (data[key] !== undefined && data[key] !== null) {
        if (key === 'image' && data[key] instanceof File) {
          
          formData.append('profile', data[key]);
        } else {
          formData.append(key, data[key]);
        }
      }
    });
    
    
    console.log('Blog FormData contents:');
    for (let pair of formData.entries()) {
      console.log(pair[0], pair[1]);
    }
    
    return instance.post('/blog/create', formData);
  },
  
  getAllPosts: (params = {}) => get('/blog/showall', params),
  getPostById: (id) => get(`/public/singlepost/${id}`),
  getUserPosts: (userId) => get(`/blog/user/${userId}`),
  updatePost: (id, data) => {
    const formData = new FormData();
    Object.keys(data).forEach(key => {
      if (data[key] !== undefined && data[key] !== null) {
        if (key === 'image' && data[key] instanceof File) {
          formData.append('profile', data[key]);
        } else {
          formData.append(key, data[key]);
        }
      }
    });
    return instance.patch(`/blog/update/${id}`, formData);
  },
  deletePost: (id) => del(`/blog/delete/${id}`)
};

export const authApi = {
  register: (data) => {
    const formData = new FormData();
    formData.append('Fullname', data.Fullname || data.FullName || data.fullName);
    formData.append('email', data.email);
    formData.append('password', data.password);
    if (data.profile) formData.append('profile', data.profile);
    
    return instance.post('/auth/register', formData);
  },
  
  login: (data) => post('/auth/login', data),
  logout: () => post('/auth/logout'),
  
  getUserProfile: (id) => get(`/auth/user/${id}`),
  updateProfile: (id, data) => {
    if (data.profile instanceof File) {
      const formData = new FormData();
      formData.append('Fullname', data.Fullname || '');
      formData.append('email', data.email || '');
      formData.append('bio', data.bio || '');
      formData.append('profile', data.profile);
      return instance.put(`/auth/update/${id}`, formData);
    }
    return instance.put(`/auth/update/${id}`, data);
  }
};


export const commentApi = {
  addComment: (data) => post('/comments/addcomments', data),
  deleteComment: (id) => del(`/comments/delete/${id}`)
};


export const publicApi = {
  getSinglePost: (id) => get(`/public/singlepost/${id}`)
};


export const api = {
  dashboard: dashboardApi,
  category: categoryApi,
  blog: blogApi,
  auth: authApi,
  comment: commentApi,
  public: publicApi
};


export const checkServerStatus = async () => {
  try {
    const response = await instance.get('/');
    return { 
      status: 'online', 
      data: response.data,
      url: BaseUrl
    };
  } catch (error) {
    console.error('Server is offline or unreachable:', error);
    return { 
      status: 'offline', 
      error: error.message,
      url: BaseUrl
    };
  }
};