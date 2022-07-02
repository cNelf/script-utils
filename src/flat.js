function flat(arr) {
  return arr.reduce((prev, cur) => {
    return Array.isArray(cur) ? prev.concat(flat(cur)) : prev.concat([cur]);
  }, []);
}

module.exports = flat;
