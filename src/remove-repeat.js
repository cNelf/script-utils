function removeRepeatV1(arr) {
  return [...new Set(arr)];
}

function removeRepeatV2(arr) {
  const map = {};
  const res = arr.slice(0);
  for (let i = 0; i < res.length; i++) {
    const value = res[i];
    if (!map[value]) {
      map[value] = true;
      continue;
    }
    res.splice(i--, 1);
  }
  return res;
}

module.exports = {
  removeRepeatV1,
  removeRepeatV2,
};
