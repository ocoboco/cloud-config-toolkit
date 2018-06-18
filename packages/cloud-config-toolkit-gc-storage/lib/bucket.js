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
    try {
      [ this.bucketExists ] = await this.bucket.exists();
    } catch(error) {
      this.bucketExists = false;
    }
    if (!this.bucketExists) {
      try {
        await this.bucket.create();
      } catch (error) {
        error.explanation = `Failed to create "${this.bucket.name}" bucket.`;
        throw error;
      }
      this.bucketExists = true;    
    }
  }

  async uploadFileToPath(path, content) {
    await this.ensureBucketExists();
    const file = this.bucket.file(path);
    await file.save(content);
    await this.bucket.upload(file);
  }
}

module.exports = Bucket;