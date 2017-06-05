var payload = require('../payload');

var getSchema = require('../../submodule-repo/jsonable');
var schemaRq = getSchema('repcredentialcheck', 'testPage', 'stateName', 'rq');

var Ajv = require('ajv');
var ajv = new Ajv(); 
var validateRq = ajv.compile(schemaRq);

describe('repcredentialcheck -> testPage#stateName', () => {
    describe('Rq, client -> server', () => {
        describe('payload() генерирует запрос соответствующий schema json', () => {
            it('Передан полный набор корректных параметров', () => {
                const report = validateRq(
                    payload('1', '1', ['1', '2'])
                );
                expect(report).toEqual(true)
            }) 

            it('Передан обязательный набор параметров', () => {
                const report = validateRq(
                    payload('1', '1')
                );
                expect(report).toEqual(true)
            }) 

            it('Не переданы атрибуты', () => {
                const report = validateRq(
                    payload()
                );
                expect(report).toEqual(false)
            })

            it('Не передан первый атрибут', () => {   
                const report = validateRq(
                    payload(undefined, undefined, [1,2,3])
                );
                expect(report).toEqual(false)
            })

            it('Не передан второй атрибут', () => {   
                const report = validateRq(
                    payload('1', undefined, [1,2,3])
                );
                expect(report).toEqual(false)
            })

            it('Не передан массив в последним атрибутом', () => {   
                const report = validateRq(
                    payload('1', '1', '1')
                );
                expect(report).toEqual(false)
            })
        })
    })
})