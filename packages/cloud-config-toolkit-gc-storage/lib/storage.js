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
}

module.exports = Storage;