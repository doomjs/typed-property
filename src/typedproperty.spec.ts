import { expect } from 'chai';
import { TypedProperty } from './';
import { IHeapMemoryContainer } from './typedproperty';

describe('typedmem', () => {
    let obj = {};
    function test(type: string, defaultValue: number, input: number, output: number){
        it(`should be ${type}`, () => {
            TypedProperty[type](obj, type, defaultValue);
            expect(obj[type]).to.equal(typeof defaultValue == 'number' ? defaultValue : 0);
            obj[type] = input;
            expect(obj[type]).to.equal(output);
        });
    }

    test('uint8', 42, 257, 1);
    test('int8', null, 129, -127);
    test('uint16', 42, 65537, 1);
    test('int16', null, 32769, -32767);
    test('uint32', 42, Math.pow(2, 32) + 1, 1);
    test('int32', null, Math.pow(2, 32) - Math.pow(2, 32) / 2 + 1, (Math.pow(2, 32) / 2) - Math.pow(2, 32) + 1);
    test('float32', 1, Math.PI, new Float32Array([Math.PI])[0]);
    test('float64', null, Math.PI, Math.PI);

    test('uint8LE', 42, 257, 1);
    test('int8LE', null, 129, -127);
    test('uint16LE', 42, 65537, 1);
    test('int16LE', null, 32769, -32767);
    test('uint32LE', 42, Math.pow(2, 32) + 1, 1);
    test('int32LE', null, Math.pow(2, 32) - Math.pow(2, 32) / 2 + 1, (Math.pow(2, 32) / 2) - Math.pow(2, 32) + 1);
    test('float32LE', 1, Math.PI, new Float32Array([Math.PI])[0]);
    test('float64LE', null, Math.PI, Math.PI);

    it('should extend heap', () => {
        for (let i = 0; i < TypedProperty.DefaultMemorySize; i++){
            TypedProperty.float64(obj, `tmp_float64_${i}`, 0);
        }
        expect((<IHeapMemoryContainer>obj).heapMemory.allocatedHeap).to.be.greaterThan(TypedProperty.DefaultMemorySize);
    });
});