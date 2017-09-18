import 'reflect-metadata';
import * as TypedMem from './typedproperty';

const TypeDefKey = 'typedproperty:typedef';

export function typed<T extends { new(...args:any[]):{} }>(constructor:T) {
    return class extends constructor {
        constructor(...args:any[]){
            super(...args);
            const typeDef = Reflect.getOwnMetadata(TypeDefKey, constructor.prototype);
            for (let prop in typeDef){
                TypedMem[typeDef[prop]](this, prop);
            }
        }
    }
}

function factory(type: string){
    return function(target: any, property: string){
        const typeDef = Reflect.getOwnMetadata(TypeDefKey, target) || {};
        typeDef[property] = type;
        Reflect.defineMetadata(TypeDefKey, typeDef, target);
    };
}

export const uint8 = factory('uint8');
export const int8 = factory('int8');
export const uint16 = factory('uint16');
export const int16 = factory('int16');
export const uint32 = factory('uint32');
export const int32 = factory('int32');
export const float32 = factory('float32');
export const float64 = factory('float64');
export const uint8LE = factory('uint8LE');
export const int8LE = factory('int8LE');
export const uint16LE = factory('uint16LE');
export const int16LE = factory('int16LE');
export const uint32LE = factory('uint32LE');
export const int32LE = factory('int32LE');
export const float32LE = factory('float32LE');
export const float64LE = factory('float64LE');