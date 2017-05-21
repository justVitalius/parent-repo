var jsf = require('json-schema-faker');
var rq = require('./rq.json');
var _ = require('lodash');

console.log(rq);
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
console.log(sample);

// jsf.resolve(_.merge({}, rq, { properties: fakedRqProperties })).then(function(sample) {
  // console.log("==================\n");
  // console.log(sample);
// });


// var schema = {
//   type: 'object',
//   properties: {
//     user: {
//       type: 'object',
//       properties: {
//         id: {
//           "type": "integer",
//           "minimum": 600,
//           "maximum": 700,
//           "multipleOf": 7,
//           "exclusiveMinimum": true
//         },
//         name: {
//           type: 'string',
//           faker: 'name.findName'
//         },
//         email: {
//           type: 'string',
//           format: 'email',
//           faker: 'internet.email'
//         }
//       },
//       required: ['id', 'name', 'email']
//     }
//   },
//   required: ['user'],
//   definitions: {
//     positiveInt: {
//       type: 'integer',
//       minimum: 0,
//       exclusiveMinimum: true
//     }
//   }
// };

// var sample = jsf(schema);
// console.log(sample);

// jsf.resolve(schema).then(function(sample) {
//   // console.log(sample);
//   console.log(Object.keys(sample.user));
// });

// var schema = {
//   type: 'object',
//   properties: {
//     someValue: {
//       $ref: 'otherSchema'
//     }
//   }
// };

// var refs = [
//   {
//     id: 'otherSchema',
//     type: 'string'
//   }
// ];

// jsf.resolve(schema, refs).then(function(sample) {
//   console.log('===================================');
//   console.log(sample);
//   // "voluptatem"
// });