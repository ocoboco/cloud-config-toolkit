# Cloud config toolkit ajv

**Cloud config toolkit ajv** implements the [validator](https://github.com/ocoboco/cloud-config-toolkit#configvalidator-required) and [exporter](https://github.com/ocoboco/cloud-config-toolkit#configexporter-optional)
interfaces required by **Cloud config toolkit** using [Ajv](https://github.com/epoberezkin/ajv) schema validator.  

## Installation  

Install the package in the project:

```bash
npm install --save cloud-config-toolkit-ajv
```

Then use `Validator` and `Exporter` constructors in `cct.conf.js` file:

```javascript
// `cct.conf.js`
const { Validator, Exporter } = require('cloud-config-toolkit-ajv');

const schema = require('path-to-config/schema');
const keywords = require('path-to-config/keywords');

module.exports = {
  validator: new Validator({
    schema,
    keywords
  }),
  exporter: new Exporter({
    schema,
    keywords
  }),
  // ...
};
```

## Configuration

Both Validation and Modification`Storage` constructor accepts a configuration with properties:

* `schema` - [schema](http://json-schema.org/) to validate configuration JSON (see [Ajv](https://github.com/epoberezkin/ajv) for more details);
* `keywords` - an array of [custom keywords](https://github.com/epoberezkin/ajv#defining-custom-keywords) used by schema.

For more details check [Cloud config toolkit documentation](https://github.com/ocoboco/cloud-config-toolkit).  