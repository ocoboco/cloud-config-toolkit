const GoogleCloudStorage = require('@google-cloud/storage');

const Bucket = require('./bucket'); 

class Storage {
  constructor({ projectId, bucketName, keyFilename }) {
    this.googleCloudStorage = new GoogleCloudStorage({
      projectId,
      keyFilename
    });
    this.bucket = new Bucket({
      googleCloudStorage: this.googleCloudStorage,
      bucketName
    });
  }

  async createItem(name, content, namespace) {
    const path = this.getPath(name, namespace);
    await this.bucket.uploadFile(path, content);
  }

  async getItemContent(name, namespace) {
    
  }

  async itemExists(name, namespace) {
    const path = this.getPath(name, namespace);
    return await this.bucket.fileExists(path);
  }

  async getItemNames(offset, limit, namespace) {
    
  }

  getPath(name, namespace) {
    return `/namespaces/${namespace}/${name}.json`;
  }
}

module.exports = Storage;