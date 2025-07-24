export const API_CONFIG = {
  BASE_URL: 'http://localhost:8080',
  TIMEOUT: 10000,
  RETRY_ATTEMPTS: 3,
} as const;

export const API_ENDPOINTS = {
  CUSTOMERS: '/api/customers',
  BOOKS: '/api/books',
  ORDERS: '/api/orders',
} as const; 