class ItemController {
  constructor(itemService) {
    this.itemService = itemService;
  }

  getAllItems = async (req, res) => {
    try {
      const items = await this.itemService.getItems();
      res.json(items);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

  createItem = async (req, res) => {
    try {
      const { title } = req.body;
      const newItem = await this.itemService.createItem(title);
      res.status(201).json(newItem);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };
}

module.exports = ItemController;