const API_URL = process.env.NODE_ENV !== 'development'
  ? 
   'https://agro-plus-backend.onrender.com':process.env.REACT_APP_BASE_URL;
// const API_URL="http://localhost:4000"





export default API_URL;
