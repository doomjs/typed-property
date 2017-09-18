import { expect } from 'chai';
import { typed, uint8, int8, uint16, int16, uint32, int32, float32, float64, uint8LE, int8LE, uint16LE, int16LE, uint32LE, int32LE, float32LE, float64LE } from './';

@typed
class TypedClass{
    args: any[];
    constructor(...args: any[]){
        this.args = args;
    }

    @uint8
    uint8: number

    @int8
    int8: number

    @uint16
    uint16: number

    @int16
    int16: number

    @uint32
    uint32: number

    @int32
    int32: number

    @float32
    float32: number

    @float64
    float64: number

    @uint8LE
    uint8LE: number

    @int8LE
    int8LE: number

    @uint16LE
    uint16LE: number

    @int16LE
    int16LE: number

    @uint32LE
    uint32LE: number

    @int32LE
    int32LE: number

    @float32LE
    float32LE: number

    @float64LE
    float64LE: number
}

describe('typedmem decorators', () => {
    function test(type: string, input: number, output: number){
        it(`should be ${type}`, () => {
            let instance = new TypedClass(1, 2, 3);
            expect(instance.args).to.deep.equal([1, 2, 3]);
            instance[type] = input;
            expect(instance[type]).to.equal(output);
        });
    }

    test('uint8', 257, 1);
    test('int8', 129, -127);
    test('uint16', 65537, 1);
    test('int16', 32769, -32767);
    test('uint32', Math.pow(2, 32) + 1, 1);
    test('int32', Math.pow(2, 32) - Math.pow(2, 32) / 2 + 1, (Math.pow(2, 32) / 2) - Math.pow(2, 32) + 1);
    test('float32', Math.PI, new Float32Array([Math.PI])[0]);
    test('float64', Math.PI, Math.PI);

    test('uint8LE', 257, 1);
    test('int8LE', 129, -127);
    test('uint16LE', 65537, 1);
    test('int16LE', 32769, -32767);
    test('uint32LE', Math.pow(2, 32) + 1, 1);
    test('int32LE', Math.pow(2, 32) - Math.pow(2, 32) / 2 + 1, (Math.pow(2, 32) / 2) - Math.pow(2, 32) + 1);
    test('float32LE', Math.PI, new Float32Array([Math.PI])[0]);
    test('float64LE', Math.PI, Math.PI);
});
