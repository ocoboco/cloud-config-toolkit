const GoogleCloudStorage = require('@google-cloud/storage');

const Bucket = require('./bucket'); 

function getPath(name, namespace) {
  return `${namespace}/${name}`;
}

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
    const path = getPath(name, namespace);
    await this.bucket.uploadFile(path, content);
  }

  async getItemContent(name, namespace) {
    const path = getPath(name, namespace);
    return await this.bucket.getFileContent(path);
  }

  async itemExists(name, namespace) {
    const path = getPath(name, namespace);
    return await this.bucket.fileExists(path);
  }

  async getItemNames(namespace) {
    const path = getPath('', namespace);
    return await this.bucket.getFileNames(path);
  }
}

module.exports = Storage;