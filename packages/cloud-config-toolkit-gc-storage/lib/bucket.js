class Bucket {
  constructor({ bucketName, googleCloudStorage }) {
    this.googleCloudStorage = googleCloudStorage;
    this.bucket = this.googleCloudStorage.bucket(bucketName);
    this.bucketExists = false;
  }

  async ensureBucketExists() {
    if (this.bucketExists) {
      return;
    }
    const [exists] = await this.bucket.exists();
    if (!exists) {
      await this.bucket.create();
    }
    this.bucketExists = true;    
  }

  
}

module.exports = Bucket;