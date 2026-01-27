import axiosInstance from './axiosConfig';

export const productAPI = {
  // Get all products with optional filters
  getAll: async (filters = {}) => {
    const params = new URLSearchParams();
    
    Object.entries(filters).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== '') {
        params.append(key, value);
      }
    });
    
    const queryString = params.toString();
    const url = queryString ? `/products?${queryString}` : '/products';
    
    const response = await axiosInstance.get(url);
    return response.data;
  },

  // Get product by ID
  getById: async (id) => {
    const response = await axiosInstance.get(`/products/${id}`);
    return response.data;
  },

  // Get product by slug
  getBySlug: async (slug) => {
    const response = await axiosInstance.get(`/products/slug/${slug}`);
    return response.data;
  },

  // Create new product
  create: async (productData, imageFile = null) => {
    const formData = new FormData();
    
    // Append all product data
    Object.entries(productData).forEach(([key, value]) => {
      if (Array.isArray(value)) {
        formData.append(key, JSON.stringify(value));
      } else if (value !== null && value !== undefined) {
        formData.append(key, value);
      }
    });
    
    // Append image if exists
    if (imageFile) {
      formData.append('image', imageFile);
    }
    
    const response = await axiosInstance.post('/products', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  },

  // Update product
  update: async (id, productData, imageFile = null) => {
    const formData = new FormData();
    
    Object.entries(productData).forEach(([key, value]) => {
      if (Array.isArray(value)) {
        formData.append(key, JSON.stringify(value));
      } else if (value !== null && value !== undefined) {
        formData.append(key, value);
      }
    });
    
    if (imageFile) {
      formData.append('image', imageFile);
    }
    
    const response = await axiosInstance.put(`/products/${id}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  },

  // Delete product
  delete: async (id) => {
    const response = await axiosInstance.delete(`/products/${id}`);
    return response.data;
  },

  // Get categories
  getCategories: async () => {
    const response = await axiosInstance.get('/products/categories');
    return response.data;
  },

  // Search products
  search: async (query) => {
    const response = await axiosInstance.get(`/products/search?q=${encodeURIComponent(query)}`);
    return response.data;
  },
};