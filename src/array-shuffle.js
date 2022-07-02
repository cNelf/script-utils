// Fisher-Yates 洗牌算法
function arrayShuffle(arr) {
  const cloneArray = (source) => {
    let index = -1;
    const length = source.length;
    const array = new Array(length);
    while(++index < length) {
      array[index] = source[index];
    }
    return array;
  }

  const getRandom = (min, max) => {
    return min + Math.floor(Math.random() * (max - min + 1));
  }

  let index = -1;
  const array = cloneArray(arr);
  const length = array.length;
  const lastIndex = length - 1;

  while(++index < length) {
    const randomIndex = getRandom(index, lastIndex);
    const value = array[randomIndex];
    array[randomIndex] = array[index];
    array[index] = value;
  }

  return array;
}

module.exports = shuffle;
