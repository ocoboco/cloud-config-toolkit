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
    const path = `/namespaces/${namespace}/${name}`;
    await this.bucket.uploadFileToPath(path, content);
  }

  async getItemContent() {

  }

  async itemExists() {

  }

  async getItemNames() {
    
  }
}

module.exports = Storage;