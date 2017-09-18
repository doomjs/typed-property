# typed-property

Strongly typed property definer, uses ArrayBuffer as memory backend. Supports all strong number types from uin8 to float64.

## Supported property types

* uint8
* int8
* uint16
* int16
* uint32
* int32
* float32
* float64

And all types in little endian by using the *LE* postfix, like ```uint8LE```.

## Using as properties

You can use the library as you would use ```Object.defineProperty```. You have to define strongly typed properties on an *object*.

```javascript
const { TypedProperty } = require('typed-property');

function TypedClass(){
    // like Object.defineProperty(this, 'uint8', { get: ..., set: ... });
    TypedProperty.uint8(this, 'uint8');
}

const instance = new TypedClass();
instance.uint8 = -1;
console.log(instance.uint8); // 255
```

## Using as TypeScript decorators

If you use TypeScript, you can utilize the decorators from the library. Don't forget to decorate your class as ```@typed```.

```typescript
import { typed, uint8 } from 'typed-property';

@typed
class TypedClass{
    @uint8
    uint8: number
}

const instance = new TypedClass();
instance.uint8 = -1;
console.log(instance.uint8); // 255
```