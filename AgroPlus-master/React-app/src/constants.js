const API_URL = process.env.NODE_ENV !== 'development'
  ? 
   'https://agro-plus-backend.onrender.com':process.env.REACT_APP_BASE_URL;

console.log(process.env, "API_URL");

export default API_URL;
