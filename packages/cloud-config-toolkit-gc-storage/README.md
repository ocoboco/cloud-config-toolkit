# Cloud config toolkit gc storage

**Cloud config toolkit google cloud storage** implements the [storage interface](https://github.com/ocoboco/cloud-config-toolkit#configstorage-required) required by **Cloud config toolkit**.  

## Installation  

Install the package in the project:

```bash
npm install --save cloud-config-toolkit-gc-storage
```

Then use `Storage` constructor in `cct.conf.js` file:

```javascript
// `cct.conf.js`
const Storage = require('cloud-config-toolkit-gae-storage');

module.exports = {
  storage: new Storage({
    bucketName: 'my-bucket-for-configs',
    keyFilename: './gc.conf.json'
  }),
  // ...
};
```

## Configuration

`Storage` constructor accepts an object with following properties:

* `bucketName` - an unique bucket name where configuration files are going to be stored;
* `keyFilename` - the path to key file.

For more details check [main documentation](https://github.com/ocoboco/cloud-config-toolkit).  