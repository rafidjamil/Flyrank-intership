const express = require('express');
require('dotenv').config();

// Layer Swap Demonstration:
// Badla sirf Repository implementation hai, Service aur Controller unchanged hain.
const PostgresItemRepository = require('./repositories/postgresItemRepository');
const ItemService = require('./services/itemService');
const createItemRouter = require('./routes/itemRoutes');

const app = express();
app.use(express.json());

// Dependency Injection
const itemRepo = new PostgresItemRepository();
const itemService = new ItemService(itemRepo);

app.use('/items', createItemRouter(itemService));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});