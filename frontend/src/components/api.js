
const API_URL = ''

fetch(`${API_URL}/api/food`)
  .then(response => response.json())
  .then(data => console.log(data));
