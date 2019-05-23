# Cloud config toolkit usage tutorial

This tutorial will guide you on how to setup and configure Cloud config toolkit for a basic scenario: store and manage the configuration files on Google Cloud Storage.

## 1. Install Cloud config toolkit CLI tool

Run the following command to install the command-line interface (CLI) tool globally:

```
npm install -g cloud-config-toolkit-cli
```

Then, let's create a directory that holds the project files:

```
mkdir my-project
cd my-project
```

## 2. Create `cct.conf.js` configuration file

`cct.conf.js` is the [config file](https://github.com/ocoboco/cloud-config-toolkit#toolkit-config-cctconfjs) of the Cloud config toolkit. This file specifies how the application configuration is stored, validated and exported.  

Let's put the following dummy content into `cct.conf.js`:

```
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

## 3. Create `package.json` and list helper libraries