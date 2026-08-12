const express = require('express');
const ItemController = require('../controllers/itemController');

function createItemRouter(itemService) {
  const router = express.Router();
  const itemController = new ItemController(itemService);

  router.get('/', itemController.getAllItems);
  router.post('/', itemController.createItem);

  return router;
}

module.exports = createItemRouter;