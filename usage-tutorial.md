# Cloud config toolkit usage tutorial

This tutorial guides on how to setup and configure Cloud config toolkit for a basic scenario: store on remote storage the configuration files of an application by different versions.  

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

* `storage`: save configuration content on any type of storage
* `validator`: validate the configuration against some schema or validation rules
* `exporter`: transform the original configuration file, e.g. fill with default values
* `env`: how to access environment variables
* `serialize`: a function that serializes the configuration object into a raw string representation
* `deserialize`: a function that deserializes a raw string representation into the configuration object

You must provide the implementation for these properties. Let's continue doing this.  

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
`cloud-config-toolkit-gc-storage` takes care of storing the application configuration on Google Cloud Storage.  

To install the dependencies, run the command:

```bash
npm install
```

## 4. Configure Google Cloud Storage access

We're going to use Google Cloud Storage service to store the application configuration: into a bucket named `cct-demo-configs`.  

To setup the access to storage, follow [these authentication steps](https://cloud.google.com/docs/authentication/getting-started) and create a key file named `gc.conf.json` in the root directory of the project.  

`gc.conf.json` is used by `cloud-config-toolkit-gc-storage`, which is a facade around Google Cloud Storage.  

## 5. Create the application configuration schema  

To validate the application configuration, we're going to use [ajv](https://github.com/epoberezkin/ajv) JSON schema validator.  

`cloud-config-toolkit-ajv` is a facade around `ajv`.    

Let's create a file `schema.js` with a schema that validates a simple application configuration: a city location.  

```javascript
// schema.js

module.exports = {
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
};
```

According to this JSON schema, the following application configuration is valid:

```json
{
  "city": "New York",
  "country": "USA",
  "continent": "North America"
}
```

Contrary, the following application configuration is invalid, because the required property `city` is missing:

```json
{
  "country": "Great Britain",
  "continent": "Europe"
}
```

## 6. Use helper libraries in `cct.conf.js`  

Let's update `cct.conf.js` with the following implementation of validation and storage using the helper libraries `cloud-config-toolkit-ajv` and `cloud-config-toolkit-gc-storage`.  

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
    bucketName: 'cct-demo-configs',
    keyFilename: './gc.conf.json'
  }),
  serialize: JSON.stringify,
  deserialize: JSON.parse
};
```

`Validator` takes care of validating the configuration against the schema in `schema.js`.

`Exporter` makes transformations to configuration, e.g. filling with defaults. According to schema `continent` property is not obligatory and defaults to `'Europe'`.  

`Storage` class is instantiated with the bucket name `'cct-demo-configs'` (where the application configuration files are stored) and remote storage access key file `'./gc.conf.json'`.  

## 7. Validation of application configuration

Let's create a file `application-config.json` with this JSON content:  

```
{
  "city": "London",
  "continent": "Europe"
}
```

Using Cloud config toolkit, run the command to validate the application configuration against the schema:

```bash
cct validate application-config.json
```

Because the application config doesn't have the required property `country`, the validation command outputs an error:  

```json
[
  {
    "keyword": "required",
    "dataPath": "",
    "schemaPath": "#/required",
    "params": {
      "missingProperty": "country"
    },
    "message": "should have required property 'country'"
  }
]
```

To fix this validation error, let's update `application-config.json` by adding a `country` field:

```
{
  "city": "London",
  "country": "Great Britain",
  "continent": "Europe"
}
```

With these fixes, run the validation command again:

```
cct validate application-config.json
```

The command does not return any output, meaning that `application-config.json`  passed successfully the validation.  

## 8. Export application configuration

According to schema `continent` property is optional. If not specified, `continent` defaults to `'Europe'`.  

Let's remove `continent` property from `application-config.json` file:

```
{
  "city": "London",
  "country": "Great Britain"
}
```

Let's execute the validation command:

```
cct validate application-config.json
```

As expected, the command ran successfully, meaning that that `application-config.json` is valid.

Relying on defaults is convenient. Having the possibility to rely on schema defaults allows writing minimal application configuration files.  

However, if the consumer application would like to use `application-config.json`, it would not know what value `continent` field has. To solve this problem, let's use the export command:

```
cct export -d application-config-exported.json application-config.json
```

The export command uses `application-config.json` and the defaults from the schema, and generates `application-config-exported.json` that contains all the properties.  

Looking at `application-config-exported.json`, it now has all the properties and can be consumed by the application:

```json
{"city":"London","country":"Great Britain","continent":"Europe"}
```

## 9. Push and download application configuration

The real power of Cloud config toolkit comes when you want to store different configurations on remote storage. Doing so is pretty simple.  

Let's store the version `1.0.0` of `application-config.json` on Google Cloud Storage:

```
cct push -v 1.0.0 application-config.json
```

To list the versions pushed to storage, run the command:

```bash
cct ls
```

As expected, the list command outputs only one version:

```
1.0.0
```

You can push as many versions of the application configuration as you want. The only restriction is that versions are immutable.  

To download an application configuration version simply use the command:

```
cct download -v 1.0.0 -d application-config-v1.0.0.json
```

The file `application-config-v1.0.0.json` has the application configuration of version `1.0.0`.  


To download an application configuration already filled with defaults (aka exported), use the download export command:

```
cct download-export -v 1.0.0 -d application-config-exported-v1.0.0.json
```

The file `application-config-exported-v1.0.0.json` contains the exported application configuration of version `1.0.0`. This is the configuration ready to be consumed by your application.  

