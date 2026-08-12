/**
 * ItemRepository Interface (Contract)
 * Subclasses must implement all methods.
 */
class ItemRepositoryInterface {
  async getAll() {
    throw new Error("Method 'getAll()' must be implemented.");
  }

  async create(data) {
    throw new Error("Method 'create(data)' must be implemented.");
  }
}

module.exports = ItemRepositoryInterface;