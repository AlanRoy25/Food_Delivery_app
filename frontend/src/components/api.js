
const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:4000'

fetch(`${API_URL}/api/food`)
  .then(response => response.json())
  .then(data => console.log(data));
