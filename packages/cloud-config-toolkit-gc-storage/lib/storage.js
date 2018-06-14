const GoogleCloudStorage = require('@google-cloud/storage');

const Bucket = require('./bucket'); 

class Storage {
  constructor({ projectId, bucketName }) {
    this.googleCloudStorage = new GoogleCloudStorage({
      projectId
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
}

module.exports = Storage;