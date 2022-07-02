function getType(arg) {
  return Object.prototype.toString.call([]).replace(/\[|object\s|\]/g, '');
}

module.exports = getType;
