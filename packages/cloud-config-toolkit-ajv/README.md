# Cloud config toolkit ajv

**Cloud config toolkit ajv** implements the [validator](https://github.com/ocoboco/cloud-config-toolkit#configvalidator-required) and [exporter](https://github.com/ocoboco/cloud-config-toolkit#configexporter-optional)
interfaces required by **Cloud config toolkit**. It uses [Ajv](https://github.com/epoberezkin/ajv) schema validator.  

## Installation  

Install the package in the project:

```bash
npm install --save cloud-config-toolkit-ajv
```

Then use `Validator` and `Exporter` constructors in `cct.conf.js`:

```javascript
// `cct.conf.js`
const { Validator, Exporter } = require('cloud-config-toolkit-ajv');

const schema = {
  "type": "object",
  "properties": {
    "foo": { "type": "string" },
    "bar": { "type": "integer" },
    "baz": {
      "range": [2, 4], 
      "exclusiveRange": true,
      "type": "integer"
    }
  }
};
const keywords = [{
  name: 'range',
  definition: {
    type: 'number',
    compile: function (sch, parentSchema) {
      const min = sch[0];
      const max = sch[1];

      return parentSchema.exclusiveRange === true
        ? function (data) { return data > min && data < max; }
        : function (data) { return data >= min && data <= max; }
    }
  }
}];

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

Both `Validator` and `Exporter` constructors accept a configuration object with properties:

* `schema` - [schema](http://json-schema.org/) to validate JSON (see [Ajv](https://github.com/epoberezkin/ajv) for more details);
* `keywords` - an array of [custom keywords](https://github.com/epoberezkin/ajv#defining-custom-keywords) used by schema.

For more details check [Cloud config toolkit documentation](https://github.com/ocoboco/cloud-config-toolkit).  