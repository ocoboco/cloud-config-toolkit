class StorageDelegate {
  constructor({ storage, serialize }) {
    this.storage = storage;
    this.serialize = serialize;
  }

  push(configuration, version, namespace) {
    const serializedConfiguration = this.serialize(configuration);
    this.storage.createItem(version, serializedConfiguration, namespace);
  }

  itemExists(version, namespace) {
    return this.storage.itemExists(version, namespace);
  }

  getItemNames(namespace, offset, limit) {
    return this.storage.getItemNames(namespace, offset, limit);
  }
}

module.exports = StorageDelegate;