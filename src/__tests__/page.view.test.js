import React from 'react';
import { render } from 'enzyme';
import faker from 'faker';
import View from '../page.view';
import converter from '../converter';

var jsf = require('json-schema-faker');
var getSchema = require('../../submodule-repo/jsonable');
var rq = getSchema('repcredentialcheck', 'testPage', 'stateName', 'rs');
var _ = require('lodash');

var fakerable = {
  fullName: {
    faker: 'name.findName'
  },
  corpClientName: {
    faker: 'name.findName'
  }
}

const fakedRqProperties = _.merge({}, rq.properties, fakerable);
const fakedData = jsf(
  _.merge({}, rq, { properties: fakedRqProperties })
);

describe('repcredentialcheck -> testPage#stateName', () => {
  describe('Rs, server -> client -> render view', () => {
    
    it ('render fullName', () => {  
      const convertedData = converter(fakedData);
      const wrapper = render(<View {...convertedData} />);
      expect(wrapper.text()).toContain(fakedData.fullName);
    })

    it ('render corpClientName', () => {
      const convertedData = converter(fakedData);
      const wrapper = render(<View {...convertedData} />);
      expect(wrapper.text()).toContain(fakedData.corpClientName);
    })
  
    it ('render procDocType as list', () => {
      fakedData.procDocType = [1,2,3,4,5].reduce( (arr, item) => {
        return arr.concat({
          id: faker.random.uuid(),
          name: faker.random.number(10)
        })
      }, []);
      const convertedData = converter(fakedData);
      const wrapper = render(<View {...convertedData} />);
      expect(fakedData.procDocType.length).toBeGreaterThan(0);
      fakedData.procDocType.map( ({name}) => {
        expect(wrapper.text()).toContain(name);
      })   
    })

    it ('render <empty string> if procDocType is null', () => {
      delete fakedData.procDocType;
      const convertedData = converter(fakedData);
      const wrapper = render(<View {...convertedData} />);
      expect(wrapper.text()).toContain('Список продуктов пуст');
    })
  
  });
});
