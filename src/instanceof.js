function myInstanceof(instance, constructor) {
  if (!instance || typeof instance !== 'object' || !constructor || !constructor.prototype) {
    return false;
  }
  while(instance = Object.getPrototypeOf(instance)) {
    if (instance === constructor.prototype) {
      return true;
    }
  }
  return false;
};

module.exports = myInstanceof;
