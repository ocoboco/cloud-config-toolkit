# Cloud config toolkit

Cloud config toolkit facilitates deployment, validation and transformation of configuration files.  

## Features

* Save your configuration file on remote *storage* by version and namespace
* *Validate* the configuration file
* Custom *transformations* of configuration file (e.g. fill with defaults)
* Extend the toolkit with your *own commands*
* *Not coupled* with anything particular: implement storage and validation interfaces with your favorite libraries.

## Commands

Cloud config toolkit provides the following set of commands.

1) Validate the configuration file:

```bash
cct validate config.json
```

2) Push a new version to remote storage:

```bash
cct push config.json --version <version> [--namespace=<namespace>]
```

3) Download the configuration file from remote storage:

```bash
cct download --dest config.json --version <version> [--namespace=<namespace>]
```

4) List available versions on remote storage:

```bash
cct ls [--namespace=<namespace>]
```

5) Download the exported configuration file from remote storage (available when `config.export` is specified):

```bash
cct download-export --dest exportedConfig.json --version <version> [--namespace=<namespace>]
```

6) Get the exported configuration file from the configuration file (available when `config.export` is specified):

```bash
cct export config.json --dest exportedConfig.json
```

7) User defined commands to manage configuration with custom logic (available when `config.commands` is specified):

```bash
cct commandName --param1 value1 --param2 value2
```

## Toolkit config `cct-config.js`

In order to use Cloud config toolkit, create a configuration file `cct-config.js` in the root directory of the project.

```javascript
// `cct-config.js`
const GaeStorage = require('cloud-config-toolkit-gae-storage');
const Env = require('cloud-config-toolkit-env');
const { Validation, Modification } = require('cloud-config-toolkit-ajv');

module.exports = {
  storage: new GaeStorage({
    key: 'key'
  }),
  validator: new Validator(
    // ...
  ),
  exporter: new Exporter({
    // ...
  }),
  env: new Env(),
  commands: {
    commandName(facade, params) {
      
    }
  },
  serialize: JSON.stringify,
  deserialize: JSON.parse
};
```

### `config.storage` (required)

`storage` property value must be an object that conforms to `Storage` interface.  
Its purpose is to save configuration content on any type storage.

```
interface Storage {
  function createItem(name, content, namespace)
  function getItemContent(name, namespace)
  function itemExists(name, namespace)
  function getItemNames(namespace)
}
```

### `config.validator` (required)

`validator` property value must be an object that conforms to `Validator` interface.  
Its purpose is to validate the configuration against some schema or validation rules.  

```
interface Validator {
  function isValid(configuration)
  function getErrors(configuration)
}
```

### `config.serialize` (required, defaults to `JSON.stringify`)

`serialize` is a function that serializes the configuration object into a raw string representation.  

```
function serialize(configuration)
```

### `config.deserialize` (required, defaults to `JSON.parse`)

`deserialize` is a function that deserializes a raw string representation into the configuration object.  

```
function deserialize(string)
```

### `config.exporter` (optional)

`exporter` property value must be an object that conforms to `Exporter` interface.  
Use this property to transform the original configuration file, e.g. fill with default values.

```
interface Exporter {
  function export(configuration)
}
```

### `config.env` (optional)

`env` property value must be an object that conforms to `Env` interface.  
Use this property to specify how to access environment variables.  

```
interface Env {
  function getVariables()
}
```

### `config.commands` (optional)

`commands` is an object which methods implement custom commands.  
Any command name can be used, other than `push`, `download`, `ls` and `export`.  

```javascript
commands: {
  commandName1(toolkit, cliParams) {
    // ...
  },
  commandName2(toolkit, cliParams) {
    // ...
  }
}
```

`toolkit` parameter is a facade that gives access to push, download and other toolkit functions.

```
interface Toolkit {
  validate(configuration)
  serialize(configuration) {
  deserialize(string)
  push(configuration, version, namespace)
  itemExists(version, namespace)
  getItemNames(namespace)
  download(version, namespace)
  export(configuration)
  exportEnabled()
}
```