const R = require('ramda');

const extractFileNames = R.pipe(
  R.head,
  R.map(
    R.pipe(
      R.prop('name'),
      R.split('/'),
      R.last
    )
  ),
);

class Bucket {
  constructor({ bucketName, googleCloudStorage }) {
    this.googleCloudStorage = googleCloudStorage;
    this.bucket = this.googleCloudStorage.bucket(bucketName);
    this.exists = false;
  }

  async ensureBucketExists() {
    if (this.exists) {
      return;
    }
    this.exists = await this.bucketExists();
    if (!this.exists) {
      this.createBucket();
      this.exists = true;    
    }
  }

  async bucketExists() {
    let exists;
    try {
      [ exists ] = await this.bucket.exists();
    } catch(error) {
      exists = false;
    }
    return exists;
  }

  async createBucket() {
    try {
      await this.bucket.create();
    } catch (error) {
      error.explanation = `Failed to create "${this.bucket.name}" bucket.`;
      throw error;
    }
  }

  async uploadFile(path, content) {
    await this.ensureBucketExists();
    try {
      const file = this.bucket.file(path);
      await file.save(content);
    } catch (error) {
      error.explanation = `Failed to upload "${path}" file to "${this.bucket.name}" bucket.`;
      throw error;
    }
  }

  async fileExists(path) {
    await this.ensureBucketExists();
    let exists = false;
    try {
      const file = this.bucket.file(path);
      [ exists ] = await file.exists();
    } catch (error) {
      error.explanation = `Failed to check existence of "${path}" file inside "${this.bucket.name}" bucket.`;
      throw error;
    }
    return exists;
  }

  async getFileNames(path) {
    try {
      return extractFileNames(await this.bucket.getFiles({
        prefix: path,
        maxResults: 10000
      }));
    } catch (error) {
      error.explanation = `Failed to list files of "${path}" inside "${this.bucket.name}" bucket.`;
      throw error;
    }
  }
}

module.exports = Bucket;