const keywords = [{
  name: 'range',
  definition: {
    type: 'number',
    compile(sch, parentSchema) {
      const min = sch[0];
      const max = sch[1];
      if (parentSchema.exclusiveRange === true) {
        return function (data) { return data > min && data < max; };
      }
      return function (data) { return data >= min && data <= max; };
    }
  }
}];

module.exports = keywords;