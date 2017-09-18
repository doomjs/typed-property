export interface IHeapArrayBuffer {
    allocatedHeap: number;
    pointer: number;
    dataView: DataView;
}

export interface IHeapMemoryContainer {
    heapMemory: HeapArrayBuffer;
    [prop:string]: any;
}

export class HeapArrayBuffer implements IHeapArrayBuffer {
    get byteLength(): number{
        return this.buffer.byteLength;
    }
    allocatedHeap: number;
    pointer: number;
    dataView: DataView;
    private buffer: ArrayBuffer;

    constructor(byteLength: number, source?: HeapArrayBuffer) {
        this.buffer = new ArrayBuffer(byteLength);
        if (source) {
            (new Uint8Array(this.buffer)).set(new Uint8Array(source.buffer));
            this.allocatedHeap = source.allocatedHeap;
            this.pointer = source.pointer;
        } else {
            this.allocatedHeap = 0;
            this.pointer = 0;
        }

        this.dataView = new DataView(this.buffer);
    }
}

export const DefaultMemorySize = 256;
function malloc(obj: IHeapMemoryContainer, size: number){
    if (!obj.heapMemory) {
        Object.defineProperty(obj, "heapMemory", {
            enumerable: false,
            writable: true,
            value: new HeapArrayBuffer(DefaultMemorySize)
        });
    }

    if (obj.heapMemory.allocatedHeap + size > obj.heapMemory.byteLength) {
        const tmp = obj.heapMemory;
        obj.heapMemory = new HeapArrayBuffer(tmp.byteLength + DefaultMemorySize, tmp);
    }

    obj.heapMemory.pointer = obj.heapMemory.allocatedHeap;
    obj.heapMemory.allocatedHeap += size;
}

function number(size: number, getter: string, setter: string, obj: IHeapMemoryContainer, prop: string, value?: number, littleEndian: boolean = false){
    malloc(obj, size);
    const heapPointer = obj.heapMemory.pointer;
    Object.defineProperty(obj, prop, {
        get: function(){
            return obj.heapMemory.dataView[getter](heapPointer, littleEndian);
        },
        set: function(value: number){
            obj.heapMemory.dataView[setter](heapPointer, value, littleEndian);
        }
    });
    if (typeof value == "number"){
        obj[prop] = value;
    }
}

export function uint8(obj: any, prop: string, value?: number){
    number(1, "getUint8", "setUint8", obj, prop, value);
}

export function int8(obj: any, prop: string, value?: number){
    number(1, "getInt8", "setInt8", obj, prop, value);
}

export function uint16(obj: any, prop: string, value?: number){
    number(2, "getUint16", "setUint16", obj, prop, value);
}

export function int16(obj: any, prop: string, value?: number){
    number(2, "getInt16", "setInt16", obj, prop, value);
}

export function uint32(obj: any, prop: string, value?: number){
    number(4, "getUint32", "setUint32", obj, prop, value);
}

export function int32(obj: any, prop: string, value?: number){
    number(4, "getInt32", "setInt32", obj, prop, value);
}

export function float32(obj: any, prop: string, value?: number){
    number(4, "getFloat32", "setFloat32", obj, prop, value);
}

export function float64(obj: any, prop: string, value?: number){
    number(8, "getFloat64", "setFloat64", obj, prop, value);
}

export function uint8LE(obj: any, prop: string, value?: number){
    number(1, "getUint8", "setUint8", obj, prop, value, true);
}

export function int8LE(obj: any, prop: string, value?: number){
    number(1, "getInt8", "setInt8", obj, prop, value, true);
}

export function uint16LE(obj: any, prop: string, value?: number){
    number(2, "getUint16", "setUint16", obj, prop, value, true);
}

export function int16LE(obj: any, prop: string, value?: number){
    number(2, "getInt16", "setInt16", obj, prop, value, true);
}

export function uint32LE(obj: any, prop: string, value?: number){
    number(4, "getUint32", "setUint32", obj, prop, value, true);
}

export function int32LE(obj: any, prop: string, value?: number){
    number(4, "getInt32", "setInt32", obj, prop, value, true);
}

export function float32LE(obj: any, prop: string, value?: number){
    number(4, "getFloat32", "setFloat32", obj, prop, value, true);
}

export function float64LE(obj: any, prop: string, value?: number){
    number(8, "getFloat64", "setFloat64", obj, prop, value, true);
}