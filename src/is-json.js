function isJSON(val) {
  if (typeof val === 'string') {
    try {
      const obj = JSON.parse(val);
      if (obj && typeof obj === 'object') {
        return true;
      }
      return false;
    } catch (e) {
      return false;
    }
  }
  return false;
}
