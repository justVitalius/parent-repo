var jsf = require('json-schema-faker');
var rq = require('./rq.json');
var _ = require('lodash');

console.log(JSON.stringify(rq, null, 2));
console.log("==================\n");

var fakerable = {
  fullName: {
    faker: 'name.findName'
  },
  corpClientName: {
    faker: 'name.findName'
  }
}

var fakedRqProperties = _.merge({}, rq.properties, fakerable);
console.log(fakedRqProperties);
console.log("==================\n");

var sample = jsf(
  _.merge({}, rq, { properties: fakedRqProperties })
);
console.log(JSON.stringify(sample, null, 2));


var Ajv = require('ajv');
var ajv = new Ajv(); // options can be passed, e.g. {allErrors: true}
var validate = ajv.compile(rq);
var report = validate(sample);

console.log('=============================');
console.log(report);