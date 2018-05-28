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

5) Get the computed configuration file from remote storage:

```bash
cct compute --dest computedConfig.json --version <version> [--namespace=<namespace>]
```

Note: available when `config.compute` is specified.

6) Get the computed configuration file from the configuration file:

```bash
cct compute config.json --dest computedConfig.json
```

Note: available when `config.compute` is specified.

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
  compute: new Modification({
    schema: {
      // ...
    }
  }),
  env: new Env()
}
```

`config.storage` (obligatory) uses the following interface:

```
interface Storage {
  async function createItem(content, name, namespace)
  async function getItemContent(name, namespace)
  async function itemExists(name, namespace)
  async function getItemNames(namespace, offset, limit)
}
```

`config.validation` (obligatory) uses the following interface:

```
interface Validation {
  function isValid(content)
  function getValidationErrors(content)
}
```

`config.compute` (optional) uses the following interface:

```
interface Compute {
  function getComputedContent(content)
}
```

`config.env` (optional) uses the following interface:

```
interface Env {
  function getVariables()
}
```