class StorageDelegate {
  constructor({ storage, serialize }) {
    this.storage = storage;
    this.serialize = serialize;
  }

  async push(configuration, version, namespace) {
    const serializedConfiguration = this.serialize(configuration);
    await this.storage.createItem(version, serializedConfiguration, namespace);
  }

  async itemExists(version, namespace) {
    return await this.storage.itemExists(version, namespace);
  }
}

module.exports = StorageDelegate;