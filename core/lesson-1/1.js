// function createBitGetter(array) {
//   array.get = function(indexArray, indexBit) {
//     return Number((this[indexArray] & ( 1 << indexBit)) !== 0);
//   }
  
//   return array;
// }

function createBitGetterAccessor(array) {
  function isInvalidArray(indexArray) {
    if ((array.length - 1) < indexArray) {
      throw new Error('Длина массива меньше чем указанный индекс');
    }
    if (indexArray < 0) {
      throw new Error('Индекс не может быть меньше 0');
    }
  }
  
  function isInvalidIndexBit(indexBit) {
    if (indexBit > 7) {
      throw new Error('Длина элемента массива не должна превышать 7');
    }
  }

  function isInvalidSetValue(value) {
    if (value !== 0 || value !== 1) {
      throw new Error('Устанавливаемое значение может быть равно или 1, или 2');
    }
  }

  function setBit(indexArray, indexBit) {
    return array[indexArray] |= 1 << indexBit;
  }

  function resetBit(indexArray, indexBit) {
    return array[indexArray] &= ~(1 << indexBit);
  }

  return {
    get(indexArray, indexBit) {
      isInvalidArray(indexArray);
      isInvalidIndexBit(indexBit);

      return Number((array[indexArray] & ( 1 << indexBit)) !== 0);
    },
    set(indexArray, indexBit, value) {
      isInvalidArray(indexArray);
      isInvalidIndexBit(indexBit);
      isInvalidSetValue(value);

      if (value === 1) {
        setBit(indexArray, indexBit);
      }

      if (value === 0) {
        resetBit(indexArray, indexBit);
      }
    }
  }
}

const bitGetter = createBitGetterAccessor(new Uint8Array([0b1110, 0b1101, 0b1]));

// Второй параметр это порядок бита "справа-налево"
console.log(bitGetter.get(0, 1)); // 1
console.log(bitGetter.get(1, 1)); // 0
console.log(bitGetter.get(2, 0)); // 1

// console.log(bitGetter.get(4, 0)); // Error
// console.log(bitGetter.get(2, 9)); // Error

const bitAccessor = createBitGetterAccessor(new Uint8Array([0b1110, 0b1101]));

// Второй параметр это порядок бита "справа-налево"
console.log(bitAccessor.set(0, 1, 0)); // 
console.log(bitAccessor.get(0, 1));    // 0
console.log(bitAccessor.set(1, 1, 1)); // 
console.log(bitAccessor.get(1, 1));    // 1