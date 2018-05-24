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

5) (When computed configuration is enabled) Get the computed configuration file from remote storage : 

```bash
cct export --dest computedConfig.json --version <version> [--namespace=<namespace>]
```

6) (When computed configuration is enabled) Get the computed configuration file from the configuration file:

```bash
cct export config.json --dest computedConfig.json
```

## Toolkit config `cct-config.js`

In order to use Cloud config toolkit, create a configuration file `cct-config.js` in the root directory of the project.

```javascript
// `cct-config.js`
const GaeStorage = require('cloud-config-toolkit-gae-storage');
const Env = require('cloud-config-toolkit-env');

module.exports = {
  storage: GaeStorage,
  env: Env,
  compute(storageFacade, env) {
    const namespace = 'BACKUPS';
    const latestVersion = await facade.fetchVersion(LATEST);
     // ...
    await facade.export(latestVersion, 'dest/config.json');
  }
}
```