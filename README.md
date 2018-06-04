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

5) Get the exported configuration file from remote storage (available when `config.export` is specified):

```bash
cct export --dest exportedConfig.json --version <version> [--namespace=<namespace>]
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
  validation: new Validation(
    schema: {
      // ...
    }
  ),
  export: new Modification({
    schema: {
      // ...
    }
  }),
  env: new Env(),
  commands: {
    commandName(facade, params) {
      
    }
  }
};
```

### `config.storage` (required)

`storage` property value must be an object that conforms to `Storage` interface.  
Its purpose is to save configuration content on any type storage.

```
interface Storage {
  function createItem(content, name, namespace)
  function getItemContent(name, namespace)
  function itemExists(name, namespace)
  function getItemNames(namespace, offset, limit)
}
```

### `config.validation` (required)

`validation` property value must be an object that conforms to `Validation` interface.  
Its purpose is to validate the configuration against some schema or validation rules.  

```
interface Validation {
  function isValid(content)
  function getErrors(content)
}
```

### `config.export` (optional)

`export` property value must be an object that conforms to `Export` interface.  
Use this property to transform the original configuration file, e.g. fill with default values.

```
interface Export {
  function export(content)
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
  commandName1(facade, params) {
    // ...
  },
  commandName2(facade, params) {
    // ...
  }
}
```