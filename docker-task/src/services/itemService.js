class ItemService {
  constructor(itemRepository) {
    this.itemRepository = itemRepository;
  }

  async getItems() {
    return await this.itemRepository.getAll();
  }

  async createItem(title) {
    if (!title) {
      throw new Error('Title is required');
    }
    return await this.itemRepository.create({ title });
  }
}

module.exports = ItemService;