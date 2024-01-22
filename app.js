const express = require('express');
const app = express();
const port = 3000;

// Mock data for demonstration purposes
const data = Array.from({ length: 20 }, (_, index) => ({ id: index + 1, name: `Item ${index + 1}` }));

// Endpoint for fetching data with pagination
app.get('/api/data', (req, res) => {
  const pageSize = 5;
  const page = parseInt(req.query.page) || 1;
  const startIndex = (page - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const paginatedData = data.slice(startIndex, endIndex);

  // Calculate next page URL
  const nextPage = page * pageSize < data.length ? `/api/data?page=${page + 1}` : null;

  // Response with @odata.nextLink field
  const response = {
    data: paginatedData,
    'nextPage': `http://localhost:${port}`+nextPage,
  };

  res.json(response);
});

// Start the server
app.listen(port, () => {
  console.log(`Server is listening at http://localhost:${port}`);
});
