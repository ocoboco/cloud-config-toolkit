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

8) Show all available commands:  

```
cct help
```

Show help for an individual command, e.g. `push`:  

```
cct push help
```

## Toolkit config `cct.conf.js`

In order to use Cloud config toolkit, create a configuration file `cct-config.js` in the root directory of the project.

```javascript
// `cct.conf.js`
const Storage = require('cloud-config-toolkit-gae-storage');
const Env = require('cloud-config-toolkit-env');
const { Validation, Modification } = require('cloud-config-toolkit-ajv');

module.exports = {
  storage: new Storage({
    bucketName: 'my-bucket-for-configs',
    keyFilename: './gc.conf.json'
  }),
  validator: new Validator(
    // ...
  ),
  exporter: new Exporter({
    // ...
  }),
  env: new Env(),
  commands: [{
    command: 'command2',
    describe: 'Command2 description',
    handler(argv, toolkit, commandHandlers) {
      // ...
    }
  }],
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
  function getVars()
}
```

### `config.commands` (optional)

`commands` is an array of custom commands definitions (as per [yargs command module definition][YARGS_COMMAND]). 

```javascript
commands: [
  {
    command: 'command1 <path>',
    describe: 'Command1 description',
    builder: {
      destination: {
        alias: 'd',
        describe: 'Download destination path',
        demandOption: true
      }
    },
    handler(argv, toolkit, commandHandlers) {
      // ...
    }
  }, {
    command: 'command2',
    describe: 'Command2 description',
    handler(argv, toolkit, commandHandlers) {
      // ...
    }
  }
]
```

`argv` parameter of `handler` contains the command line parameters.  

`toolkit` parameter of `handler` is a facade that gives access to push, download and other toolkit functions:

```
interface Toolkit {
  serialize(configuration)
  deserialize(string)

  validate(configuration)

  exportEnabled()
  export(configuration)

  push(configuration, version, namespace)

  download(version, namespace)

  getItemNames(namespace)
  itemExists(version, namespace)

  getEnvVars()
}
```

`commandHandlers` parameter of `handler` contains handlers for the default commands. Use this to compose more complex commands using default ones:  

```
{
  downloadExport({ version, namespace, destination })
  download({ version, namespace, destination })
  export({ path, destination })
  ls()
  push({ path, version, namespace })
  validation({ path })
}
```

[YARGS_COMMAND]: https://github.com/yargs/yargs/blob/master/docs/advanced.md#providing-a-command-module