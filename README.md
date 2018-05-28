# Cloud config toolkit

Cloud config toolkit facilitates the deployment of any type configuration files.

## Features

* Store any type of configuration file on a remote storage by version and namespace
* Management of computed configuration that requires transformations in order to be used by the application (e.g. fill with defaults).

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

5) Get the exported configuration file from remote storage:

```bash
cct export --dest computedConfig.json --version <version> [--namespace=<namespace>]
```

Note: available when `config.export` is specified.

6) Get the exported configuration file from the configuration file:

```bash
cct export config.json --dest computedConfig.json
```

7) Use custom commands to manage configuration with custom logic:

```bash
cct commandName --param1 value1 --param2 value2
```

Note: available when `config.export` is specified.

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
}
```

### `config.storage` (required)

`storage` property value must be an object that conforms to `Storage` interface.  
Its purpose is to save configuration content on a storage.

```
interface Storage {
  async function createItem(content, name, namespace)
  async function getItemContent(name, namespace)
  async function itemExists(name, namespace)
  async function getItemNames(namespace, offset, limit)
}
```

### `config.validation` (required)

`validation` property value must be an object that conforms to `Validation` interface.  
Its purpose is to validate the configuration against some schema or validation rules.  

```
interface Validation {
  function isValid(content)
  function getValidationErrors(content)
}
```

### `config.export` (optional)

`export` property value must be an object that conforms to `Export` interface.  
Use this property to modify the original configuration file, e.g. fill with default values.

```
interface Export {
  function getExportedContent(content)
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

`commands` is an object with methods that describe custom additional commands.
Choose any command name other than `push`, `download`, `ls` and `export`.

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