class InMemoryItemRepository {
  constructor() {
    this.items = [];
    this.currentId = 1;
  }

  async getAll() {
    return this.items;
  }

  async create(data) {
    const item = { id: this.currentId++, title: data.title, created_at: new Date() };
    this.items.push(item);
    return item;
  }
}

module.exports = InMemoryItemRepository;