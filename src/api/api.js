import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { cibWindows } from '@coreui/icons';

const API_BASE_URL = 'http://10.10.7.83:8000/';



// Create an Axios instance
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Function to get tokens from storage (localStorage/sessionStorage)
const getTokens = () => ({
  access: localStorage.getItem('access_token'),
  refresh: localStorage.getItem('refresh_token'),
});

// Function to save tokens to storage
const saveTokens = ({ access, refresh }) => {
  localStorage.setItem('access_token', access);
  localStorage.setItem('refresh_token', refresh);
};

// Function to remove tokens from storage
const clearTokens = () => {
  localStorage.removeItem('access_token');
  localStorage.removeItem('refresh_token');
};

// Add a request interceptor
api.interceptors.request.use(
  (config) => {
    const { access } = getTokens();
    if (access) {
      // If the access token is found, set it in the Authorization header
      config.headers.Authorization = `Bearer ${access}`;
    } else {
      // If no access token is found, redirect to login
      window.location.href = '#/login';
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Add a response interceptor
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // Check if error is due to an expired access token
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true; // Prevent retry loop
      const { refresh } = getTokens();

      if (refresh) {
        try {
          // Attempt to refresh the access token
          const response = await axios.post(`${API_BASE_URL}api/token/refresh/`, { refresh });
          const { access } = response.data;
          saveTokens({ access, refresh }); // Update tokens in storage

          // Retry the original request with the new access token
          originalRequest.headers.Authorization = `Bearer ${access}`;
          return api(originalRequest);
        } catch (refreshError) {
          clearTokens(); // Clear tokens if refresh fails
          return Promise.reject(refreshError);
        }
      }
    }

    return Promise.reject(error);
  }
);




const useFetchOne = (model, id) => {
    const [data, setData] = useState(null); // Start with null for better clarity
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true); // Ensure loading is reset if dependencies change
            try {
                const url = `api/v1/RestAPI/?model_name=${model}&id=${id}`;
                const response = await api.get(url);

                if (!response.ok) {
                    throw new Error(`Failed to fetch ${model} with ID ${id}: ${response.statusText}`);
                }

                const result = await response.json();
                setData(result);
            } catch (err) {
                setError(err.message || 'An unexpected error occurred');
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [model, id]);

    return { data, loading, error };
};

const useTableData = (model, skipKeys = [], patternsToModify = []) => {
    const [tableData, setTableData] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {


              const default_page_size = 5;

               const response = await api.get('api/v1/RestAPI/?model_name=' + model + '&page_size=' + default_page_size);
                
               const data = response.data.results;

               const total_items = response.data.count;
               const total_pages = response.data.count;
               const current_page = response.data.current_page;
               const next_url = response.data.next; //can be null
               const prev_url = response.data.previous; //can be null


               //console.log(response.data);

                const processedData = {
                    columns: Object.keys(data[0])
                        .filter((key) => !skipKeys.includes(key))
                        .map((key) => ({
                            key,
                            label: patternsToModify
                                .reduce((modifiedKey, { pattern, replacement }) => {
                                    return modifiedKey.replace(pattern, replacement);
                                }, key)
                                .replace(/_/g, ' ')
                                .replace(/\b\w/g, (char) => char.toUpperCase()),
                            _props: { scope: 'col' },
                        })),
                    items: data.map((item) => {
                        const row = { _cellProps: { id: { scope: 'row' } } };
                        Object.keys(item)
                            .filter((key) => !skipKeys.includes(key))
                            .forEach((key) => {
                                let value = item[key];
                                const datePattern = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(?:\.\d+)?[+-]\d{2}:\d{2}$/;
                                if (typeof value === 'string' && datePattern.test(value)) {
                                    value = new Date(value).toLocaleString();
                                }
                                row[key] = value;
                            });
                        return row;
                    }),
                };

                setTableData(processedData);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    return { tableData, loading, error };
};





const useTablePaginatedData = (model, skipKeys = [], patternsToModify = [], defaultPageSize = 5) => {
  const [tableData, setTableData] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [pagination, setPagination] = useState({
      currentPage: 1,
      pageSize: defaultPageSize,
      totalItems: 0,
      totalPages: 0,
  });


  useEffect(() => {
      const fetchData = async () => {
          setLoading(true);
          try {
              const response = await api.get(
                  `api/v1/RestAPI/?model_name=${model}&page_size=${pagination.pageSize}&page=${pagination.currentPage}`
              );

              const data = response.data.results;
              //console.log(data);

              setTableData({
                  columns: Object.keys(data[0])
                      .filter((key) => !skipKeys.includes(key))
                      .map((key) => ({
                          key,
                          label: patternsToModify
                              .reduce((modifiedKey, { pattern, replacement }) => {
                                  return modifiedKey.replace(pattern, replacement);
                              }, key)
                              .replace(/_/g, ' ')
                              .replace(/\b\w/g, (char) => char.toUpperCase()),
                          _props: { scope: 'col' },
                      })),
                  items: data.map((item) => {
                      const row = { _cellProps: { id: { scope: 'row' } } };
                      Object.keys(item)
                          .filter((key) => !skipKeys.includes(key))
                          .forEach((key) => {
                              let value = item[key];
                              const datePattern = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(?:\.\d+)?[+-]\d{2}:\d{2}$/;
                              if (typeof value === 'string' && datePattern.test(value)) {
                                  value = new Date(value).toLocaleString();
                              }
                              row[key] = value;
                          });
                      return row;
                  }),
              });

              setPagination({
                  ...pagination,
                  totalItems: response.data.count,
                  totalPages: Math.ceil(response.data.count / pagination.pageSize),
              });
          } catch (err) {
              setError(err.message);
          } finally {
              setLoading(false);
          }
      };

      fetchData();
  }, [model, pagination.currentPage, pagination.pageSize]);

  return { tableData, loading, error, pagination, setPagination };
};


export {
    useTableData,
    useTablePaginatedData,
    useFetchOne,
    API_BASE_URL,
    api,
    saveTokens,
    getTokens,
    clearTokens,
} 
