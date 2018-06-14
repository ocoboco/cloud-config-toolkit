class StorageDelegate {
  constructor({ storage, serialize }) {
    this.storage = storage;
    this.serialize = serialize;
  }

  async push(configuration, version, namespace) {
    const serializedConfiguration = this.serialize(configuration);
    await this.storage.createItem(version, serializedConfiguration, namespace);
  }
}

module.exports = StorageDelegate;