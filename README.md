# Cloud config toolkit

Cloud config toolkit facilitates the deployment of any type configuration files.

## Features



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

```
cct export config.json --dest computedConfig.json
```