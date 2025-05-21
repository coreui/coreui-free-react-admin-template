// API base URL
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api';

// Helper function for HTTP requests
const fetchWithAuth = async (endpoint, options = {}) => {
  // Get the token from localStorage
  const token = localStorage.getItem('token');
  
  // Set default headers
  const headers = {
    'Content-Type': 'application/json',
    ...(token && { Authorization: `Bearer ${token}` }),
    ...options.headers,
  };

  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    ...options,
    headers,
  });

  // Handle unauthorized error
  if (response.status === 401) {
    localStorage.removeItem('token');
    window.location.href = '/login';
    throw new Error('Unauthorized');
  }

  // Parse JSON response
  const data = await response.json();
  
  // Handle API errors
  if (!response.ok) {
    throw new Error(data.message || 'API request failed');
  }

  return data;
};

// Event API endpoints
export const eventApi = {
  // Get all events with pagination
  getEvents: (page = 1, limit = 10, filters = {}) => {
    const queryParams = new URLSearchParams({
      page,
      limit,
      ...filters,
    });
    return fetchWithAuth(`/events?${queryParams}`);
  },

  // Get a single event by ID
  getEvent: (id) => fetchWithAuth(`/events/${id}`),

  // Create a new event
  createEvent: (eventData) => fetchWithAuth('/events', {
    method: 'POST',
    body: JSON.stringify(eventData),
  }),

  // Update an event
  updateEvent: (id, eventData) => fetchWithAuth(`/events/${id}`, {
    method: 'PUT',
    body: JSON.stringify(eventData),
  }),

  // Delete an event
  deleteEvent: (id) => fetchWithAuth(`/events/${id}`, {
    method: 'DELETE',
  }),

  // Get event categories
  getCategories: () => fetchWithAuth('/events/categories'),

  // Create a new category
  createCategory: (categoryData) => fetchWithAuth('/events/categories', {
    method: 'POST',
    body: JSON.stringify(categoryData),
  }),

  // Update a category
  updateCategory: (id, categoryData) => fetchWithAuth(`/events/categories/${id}`, {
    method: 'PUT',
    body: JSON.stringify(categoryData),
  }),

  // Delete a category
  deleteCategory: (id) => fetchWithAuth(`/events/categories/${id}`, {
    method: 'DELETE',
  }),
  
  // Get event statistics
  getEventStatistics: (eventId, startDate, endDate) => {
    const queryParams = new URLSearchParams();
    if (startDate) queryParams.append('startDate', startDate);
    if (endDate) queryParams.append('endDate', endDate);
    
    return fetchWithAuth(`/events/${eventId}/statistics?${queryParams}`);
  },
  
  // Export event statistics as CSV
  exportEventStatistics: (eventId, format = 'csv', startDate, endDate) => {
    const queryParams = new URLSearchParams({
      format,
    });
    if (startDate) queryParams.append('startDate', startDate);
    if (endDate) queryParams.append('endDate', endDate);
    
    return fetchWithAuth(`/events/${eventId}/export?${queryParams}`);
  },

  // Get event participation statistics
  getEventParticipationStatistics: (page = 1, searchTerm = '', filters = {}) => {
    const queryParams = new URLSearchParams({
      page, 
      limit: 10
    });
    if (searchTerm) queryParams.append('search', searchTerm);
    
    // Add any other filters
    for (const [key, value] of Object.entries(filters)) {
      if (value) queryParams.append(key, value);
    }
    
    return fetchWithAuth(`/events/participation/statistics?${queryParams}`);
  },
};

// Ticket API endpoints
export const ticketApi = {
  // Get all tickets with pagination
  getTickets: (page = 1, limit = 10, filters = {}) => {
    const queryParams = new URLSearchParams({
      page,
      limit,
      ...filters,
    });
    return fetchWithAuth(`/tickets?${queryParams}`);
  },

  // Get a single ticket by ID
  getTicket: (id) => fetchWithAuth(`/tickets/${id}`),

  // Create a new ticket
  createTicket: (ticketData) => fetchWithAuth('/tickets', {
    method: 'POST',
    body: JSON.stringify(ticketData),
  }),

  // Update a ticket
  updateTicket: (id, ticketData) => fetchWithAuth(`/tickets/${id}`, {
    method: 'PUT',
    body: JSON.stringify(ticketData),
  }),

  // Delete a ticket
  deleteTicket: (id) => fetchWithAuth(`/tickets/${id}`, {
    method: 'DELETE',
  }),

  // Get ticket types
  getTicketTypes: () => fetchWithAuth('/tickets/types'),

  // Create a new ticket type
  createTicketType: (typeData) => fetchWithAuth('/tickets/types', {
    method: 'POST',
    body: JSON.stringify(typeData),
  }),

  // Update a ticket type
  updateTicketType: (id, typeData) => fetchWithAuth(`/tickets/types/${id}`, {
    method: 'PUT',
    body: JSON.stringify(typeData),
  }),

  // Delete a ticket type
  deleteTicketType: (id) => fetchWithAuth(`/tickets/types/${id}`, {
    method: 'DELETE',
  }),
};

// User API endpoints
export const userApi = {
  // Get all users with pagination
  getUsers: (page = 1, limit = 10, filters = {}) => {
    const queryParams = new URLSearchParams({
      page,
      limit,
      ...filters,
    });
    return fetchWithAuth(`/users?${queryParams}`);
  },

  // Get a single user by ID
  getUser: (id) => fetchWithAuth(`/users/${id}`),

  // Create a new user
  createUser: (userData) => fetchWithAuth('/users', {
    method: 'POST',
    body: JSON.stringify(userData),
  }),

  // Update a user
  updateUser: (id, userData) => fetchWithAuth(`/users/${id}`, {
    method: 'PUT',
    body: JSON.stringify(userData),
  }),

  // Delete a user
  deleteUser: (id) => fetchWithAuth(`/users/${id}`, {
    method: 'DELETE',
  }),

  // Get user roles/permissions
  getPermissions: () => fetchWithAuth('/users/permissions'),

  // Update user role/permission
  updatePermission: (userId, permissionData) => fetchWithAuth(`/users/${userId}/permissions`, {
    method: 'PUT',
    body: JSON.stringify(permissionData),
  }),
};

// Authentication API endpoints
export const authApi = {
  // Login
  login: (credentials) => fetchWithAuth('/auth/login', {
    method: 'POST',
    body: JSON.stringify(credentials),
  }),

  // Register
  register: (userData) => fetchWithAuth('/auth/register', {
    method: 'POST',
    body: JSON.stringify(userData),
  }),

  // Logout
  logout: () => {
    localStorage.removeItem('token');
  },

  // Check if user is authenticated
  isAuthenticated: () => !!localStorage.getItem('token'),
};

export default {
  event: eventApi,
  ticket: ticketApi,
  user: userApi,
  auth: authApi,
};