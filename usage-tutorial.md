# Cloud config toolkit usage tutorial

This tutorial guides on how to setup and configure Cloud config toolkit for a basic scenario: store and manage on Google Cloud Storage the configuration files of an application by different versions.  

## 1. Install Cloud config toolkit CLI tool

Run the following command to install the command-line interface (CLI) tool globally:

```
npm install -g cloud-config-toolkit-cli
```

Then, let's create a directory that holds the project files:

```bash
mkdir cct-demo
cd cct-demo
```

## 2. Create `cct.conf.js` configuration file

`cct.conf.js` is the file that [configures](https://github.com/ocoboco/cloud-config-toolkit#toolkit-config-cctconfjs) Cloud config toolkit. It specifies how the application configuration is stored, validated and exported.  

Let's export a skeleton object from `cct.conf.js`:

```javascript
// cct.conf.js

module.exports = {
  storage: null,
  validator: null,
  exporter: null,
  env: null,
  serialize: JSON.stringify,
  deserialize: JSON.parse
};
```

Each property in the above object has the meaning:

* `storage`: save configuration content on any type storage
* `validator`: validate the configuration against some schema or validation rules
* `exporter`: transform the original configuration file, e.g. fill with default values
* `env`: how to access environment variables
* `serialize`: a function that serializes the configuration object into a raw string representation
* `deserialize`: a function that deserializes a raw string representation into the configuration object

You must provide implementation for these properties. Let's continue doing this.  

## 3. Create `package.json` and list helper libraries

Let's create the `package.json` file and list the dependencies:

```json
{
  "name": "cct-demo",
  "version": "0.0.1",
  "description": "Cloud Config Toolkit Demo",
  "dependencies": {
    "cloud-config-toolkit": "0.0.2",
    "cloud-config-toolkit-ajv": "0.0.2",
    "cloud-config-toolkit-gc-storage": "0.0.3",
    "dotenv": "8.0.0"
  }
}
```

`cloud-config-toolkit` is the main module of Cloud config toolkit that glues all the functionality.  
`cloud-config-toolkit-ajv` is a wrapper module around JSON validation library `ajv`.    
`cloud-config-toolkit-gc-storage` takes care of storing the application configuration to Google Cloud Storage.  

To install the dependencies, run the command:

```bash
npm install
```

## 4. Configure Google Cloud Storage access

We're going to use Google Cloud Storage service to store the application configuration, specifically in a bucket named `CCT_DEMO`.  

To access the storage, follow [these authentication steps](https://cloud.google.com/docs/authentication/getting-started) and create a key file named `gc.conf.json` in the root directory of the project.  

As seen in the next section, `gc.conf.json` is used by `cloud-config-toolkit-gc-storage`.  

## 5. Create application configuration schema  

To validate application configuration, we're going to use [ajv](https://github.com/epoberezkin/ajv): a JSON schema validator.  

`cloud-config-toolkit-ajv` is a wrapper around `ajv`.  

Let's create a file `schema.js` with a JSON schema for a simple application configuration:

```javascript
// schema.js

module.exports = {
  location: {
    type: 'object',
    required: ['city', 'country'],
    properties: {
      city: {
        type: 'string'
      },
      country: {
        type: 'string'
      },
      continent: {
        type: 'string',
        default: 'Europe'
      }
    }
  }
};
```

According to the above JSON schema, the following application configuration is valid:

```json
{
  "location": {
    "city": "New York",
    "country": "USA",
    "continent": "North America"
  }
}
```

However, the following application configuration is invalid, because the required property `city` is missing:

```json
{
  "location": {
    "country": "Great Britain",
    "continent": "Europe"
  }
}
```

## 6. Use helper libraries in `cct.conf.js`  

Let's update `cct.conf.js` with the following implementation:

```javascript
// cct.conf.js

const { Validator, Exporter } = require('cloud-config-toolkit-ajv');
const Storage = require('cloud-config-toolkit-gc-storage');

const schema = require('./schema');

module.exports = {
  validator: new Validator({
    schema
  }),
  exporter: new Exporter({
    schema
  }),
  storage: new Storage({
    bucketName: 'CCT_DEMO',
    keyFilename: './gc.conf.json'
  }),
  serialize: JSON.stringify,
  deserialize: JSON.parse
};
```